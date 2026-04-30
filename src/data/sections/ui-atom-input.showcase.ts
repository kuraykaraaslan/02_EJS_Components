import type { ShowcaseItem } from '../../types';
import * as fs from 'fs';
import * as path from 'path';

const sourceCode = fs.readFileSync(path.join(process.cwd(), 'modules/ui/Input.ejs'), 'utf-8');

const inputBase = 'block w-full rounded-md border px-3 py-2 text-sm transition-colors text-text-primary placeholder:text-text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed';
const defaultBorder = 'border-border bg-surface-base';
const errorBorder   = 'border-error ring-1 ring-error bg-error-subtle';
const successBorder = 'border-success ring-1 ring-success bg-success-subtle';

function field(opts: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hint?: string;
  error?: string;
  success?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  isPassword?: boolean;
  extraClass?: string;
}) {
  const { id, label, type = 'text', placeholder = '', required, disabled, readOnly, hint, error, success, prefixIcon, suffixIcon, isPassword, extraClass = '' } = opts;
  const borderClass = error ? errorBorder : success ? successBorder : defaultBorder;
  const pl = prefixIcon ? ' pl-9' : '';
  const pr = (suffixIcon || isPassword) ? ' pr-9' : '';
  return `<div class="space-y-1 ${extraClass}">
  <label for="${id}" class="block text-sm font-medium text-text-primary">
    ${label}
    ${required ? `<span class="text-error ml-1" aria-hidden="true">*</span>` : ''}
    ${readOnly ? `<span class="ml-2 text-xs font-normal text-text-disabled">(read-only)</span>` : ''}
  </label>
  <div class="relative">
    ${prefixIcon ? `<span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled pointer-events-none"><i class="${prefixIcon}" aria-hidden="true"></i></span>` : ''}
    <input id="${id}" type="${type}" placeholder="${placeholder}" ${required ? 'required' : ''} ${disabled ? 'disabled' : ''} ${readOnly ? 'readonly' : ''} aria-invalid="${!!error}" class="${inputBase} ${borderClass}${pl}${pr} ${disabled ? 'disabled:bg-surface-sunken' : ''} ${readOnly ? 'read-only:bg-surface-sunken read-only:cursor-default' : ''}" />
    ${isPassword ? `<button type="button" aria-label="Show password" class="absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled hover:text-text-primary transition-colors focus-visible:outline-none text-sm"><i class="fa-solid fa-eye" aria-hidden="true"></i></button>` : ''}
    ${suffixIcon && !isPassword ? `<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled pointer-events-none"><i class="${suffixIcon}" aria-hidden="true"></i></span>` : ''}
  </div>
  ${hint && !error && !success ? `<p class="text-xs text-text-secondary">${hint}</p>` : ''}
  ${error ? `<p class="text-xs text-error" role="alert">${error}</p>` : ''}
  ${success && !error ? `<p class="text-xs text-success-fg">${success}</p>` : ''}
</div>`;
}

export function buildInputData(): ShowcaseItem[] {
  return [
    {
      id: 'input',
      title: 'Input',
      category: 'Atom',
      abbr: 'In',
      description: 'Metin giriş alanı. Label, hint, error, success, prefix/suffix icon ve password toggle desteği.',
      filePath: 'modules/ui/Input.ejs',
      sourceCode,
      variants: [
        {
          title: 'Default',
          previewHtml: `<div class="flex justify-center p-4 max-w-sm mx-auto w-full">${field({ id: 'i-def', label: 'Email address', placeholder: 'you@example.com' })}</div>`,
          code: `<%- include('modules/ui/Input', { id: 'email', label: 'Email address', placeholder: 'you@example.com' }) %>`,
        },
        {
          title: 'Required',
          previewHtml: `<div class="flex justify-center p-4 max-w-sm mx-auto w-full">${field({ id: 'i-req', label: 'Full name', required: true, placeholder: 'Jane Doe' })}</div>`,
          code: `<%- include('modules/ui/Input', { id: 'name', label: 'Full name', required: true, placeholder: 'Jane Doe' }) %>`,
        },
        {
          title: 'With hint',
          previewHtml: `<div class="flex justify-center p-4 max-w-sm mx-auto w-full">${field({ id: 'i-hint', label: 'Username', placeholder: 'john_doe', hint: 'Letters, numbers and underscores only' })}</div>`,
          code: `<%- include('modules/ui/Input', { id: 'user', label: 'Username', hint: 'Letters, numbers and underscores only' }) %>`,
        },
        {
          title: 'Error state',
          previewHtml: `<div class="flex justify-center p-4 max-w-sm mx-auto w-full">${field({ id: 'i-err', label: 'Email address', placeholder: 'you@example.com', error: 'Enter a valid email address' })}</div>`,
          code: `<%- include('modules/ui/Input', { id: 'email', label: 'Email address', error: 'Enter a valid email address' }) %>`,
        },
        {
          title: 'Success state',
          previewHtml: `<div class="flex justify-center p-4 max-w-sm mx-auto w-full">${field({ id: 'i-ok', label: 'Username', placeholder: 'john_doe', success: 'Username is available' })}</div>`,
          code: `<%- include('modules/ui/Input', { id: 'user', label: 'Username', success: 'Username is available' }) %>`,
        },
        {
          title: 'Disabled',
          previewHtml: `<div class="flex justify-center p-4 max-w-sm mx-auto w-full">${field({ id: 'i-dis', label: 'Account ID', placeholder: 'acc-00123', disabled: true })}</div>`,
          code: `<%- include('modules/ui/Input', { id: 'acc', label: 'Account ID', disabled: true }) %>`,
        },
        {
          title: 'Read-only',
          previewHtml: `<div class="flex justify-center p-4 max-w-sm mx-auto w-full">${field({ id: 'i-ro', label: 'API key', placeholder: 'sk-••••••••••••••••', readOnly: true })}</div>`,
          code: `<%- include('modules/ui/Input', { id: 'key', label: 'API key', readOnly: true, value: 'sk-••••••••••••••••' }) %>`,
        },
        {
          title: 'Password',
          previewHtml: `<div class="flex justify-center p-4 max-w-sm mx-auto w-full">${field({ id: 'i-pw', label: 'Password', type: 'password', placeholder: '••••••••', isPassword: true })}</div>`,
          code: `<%- include('modules/ui/Input', { id: 'pw', label: 'Password', type: 'password', placeholder: '••••••••' }) %>`,
        },
        {
          title: 'Prefix icon',
          previewHtml: `<div class="flex justify-center p-4 max-w-sm mx-auto w-full">${field({ id: 'i-ico', label: 'Search', placeholder: 'Search…', prefixIcon: 'fa-solid fa-magnifying-glass' })}</div>`,
          code: `<%- include('modules/ui/Input', { id: 'search', label: 'Search', prefixIcon: 'fa-solid fa-magnifying-glass', placeholder: 'Search…' }) %>`,
        },
      ],
    },
  ];
}
