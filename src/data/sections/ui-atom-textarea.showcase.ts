import type { ShowcaseItem } from '../../types';
import * as fs from 'fs';
import * as path from 'path';

const sourceCode = fs.readFileSync(path.join(process.cwd(), 'modules/ui/Textarea.ejs'), 'utf-8');

const taBase = 'block w-full rounded-md border px-3 py-2 text-sm transition-colors resize-y text-text-primary placeholder:text-text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:border-border-focus disabled:opacity-50 disabled:cursor-not-allowed';

function area(opts: {
  id: string;
  label: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
  error?: string;
  value?: string;
}) {
  const { id, label, rows = 3, placeholder = '', required, disabled, hint, error, value = '' } = opts;
  const borderClass = error ? 'border-error ring-1 ring-error bg-error-subtle' : disabled ? 'border-border bg-surface-sunken' : 'border-border bg-surface-base';
  return `<div class="space-y-1">
  <label for="${id}" class="block text-sm font-medium text-text-primary">
    ${label}
    ${required ? `<span class="text-error ml-1" aria-hidden="true">*</span>` : ''}
  </label>
  <textarea id="${id}" rows="${rows}" placeholder="${placeholder}" ${required ? 'required' : ''} ${disabled ? 'disabled' : ''} aria-invalid="${!!error}" class="${taBase} ${borderClass}">${value}</textarea>
  ${hint && !error ? `<p class="text-xs text-text-secondary">${hint}</p>` : ''}
  ${error ? `<p class="text-xs text-error" role="alert">${error}</p>` : ''}
</div>`;
}

export function buildTextareaData(): ShowcaseItem[] {
  return [
    {
      id: 'textarea',
      title: 'Textarea',
      category: 'Atom',
      abbr: 'Ta',
      description: 'Çok satırlı metin giriş alanı. Label, hint, error ve disabled durumları yerleşiktir.',
      filePath: 'modules/ui/Textarea.ejs',
      sourceCode,
      variants: [
        {
          title: 'Default',
          previewHtml: `<div class="p-4 max-w-sm mx-auto w-full">${area({ id: 'ta-def', label: 'Message', placeholder: 'Enter your message…' })}</div>`,
          code: `<%- include('modules/ui/Textarea', { id: 'msg', label: 'Message', placeholder: 'Enter your message…' }) %>`,
        },
        {
          title: 'Required',
          previewHtml: `<div class="p-4 max-w-sm mx-auto w-full">${area({ id: 'ta-req', label: 'Description', required: true, placeholder: 'Required…' })}</div>`,
          code: `<%- include('modules/ui/Textarea', { id: 'desc', label: 'Description', required: true }) %>`,
        },
        {
          title: 'With hint',
          previewHtml: `<div class="p-4 max-w-sm mx-auto w-full">${area({ id: 'ta-hint', label: 'Bio', placeholder: 'Tell us about yourself', hint: 'Max 500 characters' })}</div>`,
          code: `<%- include('modules/ui/Textarea', { id: 'bio', label: 'Bio', hint: 'Max 500 characters', placeholder: 'Tell us about yourself' }) %>`,
        },
        {
          title: 'Error state',
          previewHtml: `<div class="p-4 max-w-sm mx-auto w-full">${area({ id: 'ta-err', label: 'Notes', error: 'This field is required' })}</div>`,
          code: `<%- include('modules/ui/Textarea', { id: 'notes', label: 'Notes', error: 'This field is required' }) %>`,
        },
        {
          title: 'Disabled',
          previewHtml: `<div class="p-4 max-w-sm mx-auto w-full">${area({ id: 'ta-dis', label: 'Read-only notes', disabled: true, value: 'This field cannot be edited.' })}</div>`,
          code: `<%- include('modules/ui/Textarea', { id: 'ro', label: 'Read-only notes', disabled: true, value: 'This field cannot be edited.' }) %>`,
        },
        {
          title: 'Custom rows',
          previewHtml: `<div class="p-4 max-w-sm mx-auto w-full">${area({ id: 'ta-rows', label: 'Long-form content', rows: 6, placeholder: '6 rows tall…' })}</div>`,
          code: `<%- include('modules/ui/Textarea', { id: 'long', label: 'Long-form content', rows: 6 }) %>`,
        },
      ],
    },
  ];
}
