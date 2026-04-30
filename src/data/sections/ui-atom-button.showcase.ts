import type { ShowcaseItem } from '../../types';
import * as fs from 'fs';
import * as path from 'path';

const sourceCode = fs.readFileSync(path.join(process.cwd(), 'modules/ui/Button.ejs'), 'utf-8');

const base = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed';
const pad  = 'px-4 py-2 text-sm';
const wrap = (inner: string) => `<div class="flex items-center justify-center p-4">${inner}</div>`;
const btn  = (cls: string, label: string, extra = '') =>
  `<button type="button" ${extra} class="${base} ${cls} ${pad}">${label}</button>`;

export function buildButtonData(): ShowcaseItem[] {
  return [
    {
      id: 'button',
      title: 'Button',
      category: 'Atom',
      abbr: 'Bt',
      description: 'Temel interaktif element. 5 görsel stil (variant) ve 5 boyut (size) destekler. disabled durumu yerleşiktir.',
      filePath: 'modules/ui/Button.ejs',
      sourceCode,
      variants: [
        {
          title: 'Primary',
          previewHtml: wrap(btn('bg-primary text-primary-fg hover:bg-primary-hover', 'Primary')),
          code: `<%- include('modules/ui/Button', { children: 'Primary' }) %>`,
        },
        {
          title: 'Secondary',
          previewHtml: wrap(btn('bg-secondary text-secondary-fg hover:bg-secondary-hover', 'Secondary')),
          code: `<%- include('modules/ui/Button', { variant: 'secondary', children: 'Secondary' }) %>`,
        },
        {
          title: 'Ghost',
          previewHtml: wrap(btn('bg-transparent text-text-primary hover:bg-surface-overlay', 'Ghost')),
          code: `<%- include('modules/ui/Button', { variant: 'ghost', children: 'Ghost' }) %>`,
        },
        {
          title: 'Danger',
          previewHtml: wrap(btn('bg-error text-text-inverse hover:opacity-90', 'Danger')),
          code: `<%- include('modules/ui/Button', { variant: 'danger', children: 'Danger' }) %>`,
        },
        {
          title: 'Outline',
          previewHtml: wrap(btn('border border-border text-text-primary hover:bg-surface-overlay', 'Outline')),
          code: `<%- include('modules/ui/Button', { variant: 'outline', children: 'Outline' }) %>`,
        },
        {
          title: 'Disabled',
          previewHtml: wrap(btn('bg-primary text-primary-fg', 'Disabled', 'disabled')),
          code: `<%- include('modules/ui/Button', { disabled: true, children: 'Disabled' }) %>`,
        },
        {
          title: 'Sizes',
          previewHtml: `<div class="flex flex-wrap items-center justify-center gap-2 p-4">
  <button type="button" class="${base} bg-primary text-primary-fg hover:bg-primary-hover px-2 py-1 text-xs">XS</button>
  <button type="button" class="${base} bg-primary text-primary-fg hover:bg-primary-hover px-3 py-1.5 text-sm">SM</button>
  <button type="button" class="${base} bg-primary text-primary-fg hover:bg-primary-hover px-4 py-2 text-sm">MD</button>
  <button type="button" class="${base} bg-primary text-primary-fg hover:bg-primary-hover px-5 py-2.5 text-base">LG</button>
  <button type="button" class="${base} bg-primary text-primary-fg hover:bg-primary-hover px-6 py-3 text-lg">XL</button>
</div>`,
          code: `<%- include('modules/ui/Button', { size: 'xs', children: 'XS' }) %>
<%- include('modules/ui/Button', { size: 'sm', children: 'SM' }) %>
<%- include('modules/ui/Button', { size: 'md', children: 'MD' }) %>
<%- include('modules/ui/Button', { size: 'lg', children: 'LG' }) %>
<%- include('modules/ui/Button', { size: 'xl', children: 'XL' }) %>`,
        },
        {
          title: 'Icon left / right',
          previewHtml: `<div class="flex flex-wrap items-center justify-center gap-2 p-4">
  <button type="button" class="${base} bg-primary text-primary-fg hover:bg-primary-hover ${pad}">
    <span aria-hidden="true" class="shrink-0"><i class="fa-solid fa-download"></i></span>Download
  </button>
  <button type="button" class="${base} border border-border text-text-primary hover:bg-surface-overlay ${pad}">
    Next<span aria-hidden="true" class="shrink-0"><i class="fa-solid fa-arrow-right"></i></span>
  </button>
  <button type="button" class="${base} bg-secondary text-secondary-fg hover:bg-secondary-hover ${pad}">
    <span aria-hidden="true" class="shrink-0"><i class="fa-solid fa-envelope"></i></span>Send<span aria-hidden="true" class="shrink-0"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>
  </button>
</div>`,
          code: `<%- include('modules/ui/Button', { iconLeft: '<i class="fa-solid fa-download"></i>', children: 'Download' }) %>
<%- include('modules/ui/Button', { variant: 'outline', iconRight: '<i class="fa-solid fa-arrow-right"></i>', children: 'Next' }) %>`,
        },
        {
          title: 'Full width',
          layout: 'stack' as const,
          previewHtml: `<div class="w-full space-y-2 p-4">
  <button type="button" class="${base} bg-primary text-primary-fg hover:bg-primary-hover ${pad} w-full">Full-width primary</button>
  <button type="button" class="${base} border border-border text-text-primary hover:bg-surface-overlay ${pad} w-full">Full-width outline</button>
</div>`,
          code: `<%- include('modules/ui/Button', { fullWidth: true, children: 'Full-width primary' }) %>
<%- include('modules/ui/Button', { variant: 'outline', fullWidth: true, children: 'Full-width outline' }) %>`,
        },
      ],
    },
  ];
}
