import type { ShowcaseItem } from '../../types';
import * as fs from 'fs';
import * as path from 'path';

const sourceCode = fs.readFileSync(path.join(process.cwd(), 'modules/ui/Checkbox.ejs'), 'utf-8');

const inputBase = 'mt-0.5 h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-border-focus';

function checkbox(opts: {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  hint?: string;
  error?: string;
  extraInputClass?: string;
}) {
  const { id, label, checked = false, disabled = false, hint, error, extraInputClass = '' } = opts;
  const labelColor = disabled ? 'text-text-disabled' : 'text-text-primary';
  return `<div class="flex items-start gap-3">
  <input id="${id}" type="checkbox" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} aria-invalid="${!!error}" class="${inputBase} ${extraInputClass} ${disabled ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}" />
  <div>
    <label for="${id}" class="text-sm font-medium ${labelColor}">${label}</label>
    ${hint && !error ? `<p class="text-xs text-text-secondary mt-0.5">${hint}</p>` : ''}
    ${error ? `<p class="text-xs text-error mt-0.5" role="alert">${error}</p>` : ''}
  </div>
</div>`;
}

export function buildCheckboxData(): ShowcaseItem[] {
  return [
    {
      id: 'checkbox',
      title: 'Checkbox',
      category: 'Atom',
      abbr: 'Cb',
      description: 'Tekil boolean seçim kontrolü. Hint, error ve disabled durumları yerleşiktir.',
      filePath: 'modules/ui/Checkbox.ejs',
      sourceCode,
      variants: [
        {
          title: 'Default',
          previewHtml: `<div class="flex justify-center p-4">${checkbox({ id: 'cb-default', label: 'Accept terms' })}</div>`,
          code: `<%- include('modules/ui/Checkbox', { id: 'cb', label: 'Accept terms' }) %>`,
        },
        {
          title: 'Checked',
          previewHtml: `<div class="flex justify-center p-4">${checkbox({ id: 'cb-checked', label: 'Remember me', checked: true })}</div>`,
          code: `<%- include('modules/ui/Checkbox', { id: 'cb', label: 'Remember me', checked: true }) %>`,
        },
        {
          title: 'With hint',
          previewHtml: `<div class="flex justify-center p-4">${checkbox({ id: 'cb-hint', label: 'Subscribe to newsletter', hint: 'We send at most one email per week' })}</div>`,
          code: `<%- include('modules/ui/Checkbox', { id: 'cb', label: 'Subscribe to newsletter', hint: 'We send at most one email per week' }) %>`,
        },
        {
          title: 'Error state',
          previewHtml: `<div class="flex justify-center p-4">${checkbox({ id: 'cb-err', label: 'Accept terms', error: 'You must accept the terms', extraInputClass: 'border-error' })}</div>`,
          code: `<%- include('modules/ui/Checkbox', { id: 'cb', label: 'Accept terms', error: 'You must accept the terms' }) %>`,
        },
        {
          title: 'Disabled',
          previewHtml: `<div class="flex flex-col justify-center gap-3 p-4">
  ${checkbox({ id: 'cb-dis1', label: 'Option A (disabled)', disabled: true })}
  ${checkbox({ id: 'cb-dis2', label: 'Option B (disabled, checked)', checked: true, disabled: true })}
</div>`,
          code: `<%- include('modules/ui/Checkbox', { id: 'cb1', label: 'Option A', disabled: true }) %>
<%- include('modules/ui/Checkbox', { id: 'cb2', label: 'Option B', checked: true, disabled: true }) %>`,
        },
      ],
    },
  ];
}
