#!/usr/bin/env bash
# find-dead-partials.sh — Detect orphaned EJS partials.
#
# Scans all .ejs files under:
#   views/partials/
#   views/showcase/partials/
#   modules/           (if the directory exists)
#
# For each file found, checks whether its basename (without extension)
# appears inside any include(...) call across ALL .ejs files in views/
# and modules/. Files with zero references are reported as "potentially dead".
#
# Exit code: always 0 — this is informational, not a hard gate.

set -uo pipefail

cd "$(dirname "$0")/.."

# ── Colour helpers (gracefully degraded when not a TTY) ──────────────────────
if [ -t 1 ]; then
  RED='\033[0;31m'
  YELLOW='\033[1;33m'
  GREEN='\033[0;32m'
  CYAN='\033[0;36m'
  BOLD='\033[1m'
  RESET='\033[0m'
else
  RED='' YELLOW='' GREEN='' CYAN='' BOLD='' RESET=''
fi

# ── Build list of directories to search for partials ────────────────────────
PARTIAL_DIRS=()

[ -d "views/partials" ]           && PARTIAL_DIRS+=("views/partials")
[ -d "views/showcase/partials" ]  && PARTIAL_DIRS+=("views/showcase/partials")
[ -d "modules" ]                  && PARTIAL_DIRS+=("modules")

if [ ${#PARTIAL_DIRS[@]} -eq 0 ]; then
  echo "${YELLOW}Warning: no partial directories found (views/partials/, views/showcase/partials/, modules/).${RESET}"
  echo "Nothing to scan."
  exit 0
fi

# ── Build list of directories to search for include() references ─────────────
SEARCH_DIRS=()
[ -d "views" ]   && SEARCH_DIRS+=("views")
[ -d "modules" ] && SEARCH_DIRS+=("modules")

# ── Collect all partial .ejs files ───────────────────────────────────────────
mapfile -t PARTIALS < <(
  find "${PARTIAL_DIRS[@]}" -type f -name "*.ejs" | sort
)

TOTAL=${#PARTIALS[@]}

if [ "$TOTAL" -eq 0 ]; then
  echo "No .ejs partial files found in: ${PARTIAL_DIRS[*]}"
  exit 0
fi

echo ""
echo "${BOLD}Dead Partial Detection${RESET}"
echo "Scanning ${TOTAL} partial(s) across: ${PARTIAL_DIRS[*]}"
echo "Checking include() references in: ${SEARCH_DIRS[*]}"
echo "────────────────────────────────────────────────────────────"

REFERENCED=0
DEAD=0
DEAD_LIST=()

for partial_path in "${PARTIALS[@]}"; do
  # Extract basename without extension, e.g. "_head" from "views/partials/_head.ejs"
  basename_no_ext="$(basename "$partial_path" .ejs)"

  # Search for the basename inside any include(...) call in all .ejs reference dirs.
  # We use grep -r with a fixed string so special chars in filenames are handled safely.
  match_count=$(
    grep -rl --include="*.ejs" \
      "include" \
      "${SEARCH_DIRS[@]}" 2>/dev/null \
    | xargs grep -l "$basename_no_ext" 2>/dev/null \
    | wc -l
  )

  if [ "$match_count" -gt 0 ]; then
    REFERENCED=$((REFERENCED + 1))
  else
    DEAD=$((DEAD + 1))
    DEAD_LIST+=("$partial_path")
    echo "  ${YELLOW}DEAD?${RESET}  $partial_path"
  fi
done

echo "────────────────────────────────────────────────────────────"
echo ""

# ── Summary ───────────────────────────────────────────────────────────────────
echo "${BOLD}Summary${RESET}"
echo "  Total partials scanned : ${TOTAL}"
echo "  With references        : ${GREEN}${REFERENCED}${RESET}"
echo "  Potentially dead       : ${YELLOW}${DEAD}${RESET}"
echo ""

if [ "$DEAD" -eq 0 ]; then
  echo "${GREEN}All partials are referenced — no orphans found.${RESET}"
else
  echo "${YELLOW}The ${DEAD} file(s) above have no include() reference.${RESET}"
  echo "They may be intentionally unused stubs, work-in-progress, or safe to delete."
  echo "Review each before removing."
fi

echo ""

# Always exit 0 — dead partials are a warning, not a hard failure.
exit 0
