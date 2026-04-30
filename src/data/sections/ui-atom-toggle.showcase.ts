import type { ShowcaseItem } from '../../types';
import * as fs from 'fs';
import * as path from 'path';

const sourceCode = fs.readFileSync(path.join(process.cwd(), 'modules/ui/Toggle.ejs'), 'utf-8');

function toggle(opts: {
  checked?: boolean;
  disabled?: boolean;
  trackW?: string;
  trackH?: string;
  thumbW?: string;
  thumbH?: string;
  thumbTx?: string;
  label: string;
  desc?: string;
}) {
  const {
    checked = false, disabled = false,
    trackW = 'w-9', trackH = 'h-5',
    thumbW = 'w-3.5', thumbH = 'h-3.5',
    thumbTx = checked ? 'translate-x-4' : 'translate-x-0',
    label, desc,
  } = opts;
  const trackColor = checked ? 'bg-primary' : 'bg-surface-sunken border border-border';
  const cursor = disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';
  return `<label class="flex items-start gap-3 ${cursor}">
  <div class="relative shrink-0 mt-0.5">
    <input type="checkbox" role="switch" aria-checked="${checked}" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} class="sr-only" />
    <div class="rounded-full transition-colors duration-200 ${trackH} ${trackW} ${trackColor}"></div>
    <div class="absolute top-0.5 left-0.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${thumbH} ${thumbW} ${thumbTx}"></div>
  </div>
  <div>
    <span class="text-sm font-medium text-text-primary">${label}</span>
    ${desc ? `<p class="text-xs text-text-secondary mt-0.5">${desc}</p>` : ''}
  </div>
</label>`;
}

export function buildToggleData(): ShowcaseItem[] {
  return [
    {
      id: 'toggle',
      title: 'Toggle',
      category: 'Atom',
      abbr: 'Tg',
      description: 'Boolean ayarlar için sürgü kontrolü. Label, opsiyonel description ve 3 boyut destekler.',
      filePath: 'modules/ui/Toggle.ejs',
      sourceCode,
      variants: [
        {
          title: 'Checked',
          previewHtml: `<div class="flex justify-center p-4">${toggle({ checked: true, label: 'Notifications enabled' })}</div>`,
          code: `<%- include('modules/ui/Toggle', { id: 'notif', label: 'Notifications enabled', checked: true }) %>`,
        },
        {
          title: 'Unchecked',
          previewHtml: `<div class="flex justify-center p-4">${toggle({ checked: false, label: 'Dark mode' })}</div>`,
          code: `<%- include('modules/ui/Toggle', { id: 'dark', label: 'Dark mode' }) %>`,
        },
        {
          title: 'With description',
          previewHtml: `<div class="flex justify-center p-4">${toggle({ checked: true, label: 'Auto-save', desc: 'Saves your work every 30 seconds' })}</div>`,
          code: `<%- include('modules/ui/Toggle', { id: 'save', label: 'Auto-save', description: 'Saves your work every 30 seconds', checked: true }) %>`,
        },
        {
          title: 'Disabled',
          previewHtml: `<div class="flex flex-col justify-center gap-3 p-4">
  ${toggle({ checked: true,  disabled: true, label: 'Enabled (disabled)' })}
  ${toggle({ checked: false, disabled: true, label: 'Disabled option' })}
</div>`,
          code: `<%- include('modules/ui/Toggle', { id: 'a', label: 'Enabled (disabled)', checked: true,  disabled: true }) %>
<%- include('modules/ui/Toggle', { id: 'b', label: 'Disabled option',     checked: false, disabled: true }) %>`,
        },
        {
          title: 'Sizes',
          previewHtml: `<div class="flex flex-col justify-center gap-3 p-4">
  ${toggle({ checked: true, trackH: 'h-4', trackW: 'w-7', thumbH: 'h-3',   thumbW: 'w-3',   thumbTx: 'translate-x-3.5', label: 'Small' })}
  ${toggle({ checked: true, trackH: 'h-5', trackW: 'w-9', thumbH: 'h-3.5', thumbW: 'w-3.5', thumbTx: 'translate-x-4',   label: 'Medium' })}
  ${toggle({ checked: true, trackH: 'h-6', trackW: 'w-11',thumbH: 'h-4',   thumbW: 'w-4',   thumbTx: 'translate-x-5',   label: 'Large' })}
</div>`,
          code: `<%- include('modules/ui/Toggle', { id: 'sm', label: 'Small',  size: 'sm', checked: true }) %>
<%- include('modules/ui/Toggle', { id: 'md', label: 'Medium', size: 'md', checked: true }) %>
<%- include('modules/ui/Toggle', { id: 'lg', label: 'Large',  size: 'lg', checked: true }) %>`,
        },
      ],
    },
  ];
}
