#!/usr/bin/env bash
# audit-raw-output.sh — Verify no unescaped EJS output outside the approved allowlist.
# Approved: include(...), JSON.stringify(...), body, previewHtml, sourceCode, variant.code,
#           locals.extraHead, locals.extraScripts
#
# Usage:
#   bash scripts/audit-raw-output.sh          # runs the audit
#   bash -n scripts/audit-raw-output.sh       # syntax-check only
#
# Exit codes:
#   0 — all raw <%- %> usages are on the allowlist
#   1 — one or more violations found (unapproved raw output)
set -euo pipefail

cd "$(dirname "$0")/.."

RAW_PATTERN='<%-'
SCAN_DIRS=()
[ -d views ]   && SCAN_DIRS+=(views)
[ -d modules ] && SCAN_DIRS+=(modules)

if [ ${#SCAN_DIRS[@]} -eq 0 ]; then
  echo "No directories to scan (views/ and modules/ not found)."
  exit 0
fi

# Collect every line containing a raw EJS tag.
all_raw=$(grep -rn "$RAW_PATTERN" "${SCAN_DIRS[@]}" 2>/dev/null || true)

if [ -z "$all_raw" ]; then
  echo "audit-raw-output: PASS — no <%- %> tags found."
  exit 0
fi

# Filter out lines that contain an approved pattern.
# Each grep -v removes one category of approved usage.
violations=$(
  printf '%s\n' "$all_raw" \
    | grep -v 'include('           \
    | grep -v 'JSON\.stringify('   \
    | grep -v '<%-[[:space:]]*body[[:space:]]*%>' \
    | grep -v 'previewHtml'        \
    | grep -v 'sourceCode'         \
    | grep -v 'variant\.code'      \
    | grep -v 'locals\.extraHead'  \
    | grep -v 'locals\.extraScripts' \
  || true
)

if [ -z "$violations" ]; then
  echo "audit-raw-output: PASS — all <%- %> usages are on the approved allowlist."
  exit 0
else
  echo "audit-raw-output: FAIL — unapproved raw EJS output detected."
  echo ""
  echo "Each line below contains a <%- %> tag that is NOT covered by the allowlist."
  echo "Approved patterns: include(), JSON.stringify(), body, previewHtml,"
  echo "  sourceCode, variant.code, locals.extraHead, locals.extraScripts"
  echo ""
  printf '%s\n' "$violations"
  echo ""
  echo "Fix: either replace <%- %> with <%= %> (HTML-escaped) or add the"
  echo "  expression to the allowlist in scripts/audit-raw-output.sh with"
  echo "  a written justification explaining why raw output is safe here."
  exit 1
fi
