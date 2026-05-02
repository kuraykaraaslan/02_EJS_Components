import type { ShowcaseItem } from '../../types';
import * as fs from 'fs';
import * as path from 'path';

const tableSource = fs.readFileSync(path.join(process.cwd(), 'modules/ui/Table.ejs'), 'utf-8');

// ─── Table ────────────────────────────────────────────────────────────────────

interface Column { key: string; header: string; align?: 'left' | 'center' | 'right' }
interface Row    { [key: string]: string }

function tableEl(opts: {
  columns: Column[];
  rows: Row[];
  emptyMessage?: string;
}) {
  const alignClass: Record<string, string> = { left: 'text-left', center: 'text-center', right: 'text-right' };

  const ths = opts.columns.map(col =>
    `<th scope="col" class="px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider ${alignClass[col.align || 'left']}">${col.header}</th>`
  ).join('\n        ');

  let body: string;
  if (opts.rows.length === 0) {
    body = `<tr><td colspan="${opts.columns.length}" class="px-4 py-8 text-center text-text-secondary">${opts.emptyMessage || 'No results found.'}</td></tr>`;
  } else {
    body = opts.rows.map(row => {
      const tds = opts.columns.map(col => {
        const val = row[col.key] ?? '';
        return `<td class="px-4 py-3 text-text-primary${col.align ? ' ' + alignClass[col.align] : ''}">${val}</td>`;
      }).join('\n          ');
      return `<tr class="hover:bg-surface-overlay transition-colors">\n          ${tds}\n        </tr>`;
    }).join('\n        ');
  }

  return `<div class="w-full overflow-x-auto rounded-lg border border-border">
  <table class="w-full text-sm">
    <thead class="bg-surface-sunken border-b border-border">
      <tr>
        ${ths}
      </tr>
    </thead>
    <tbody class="divide-y divide-border bg-surface-base">
        ${body}
    </tbody>
  </table>
</div>`;
}

const wrapFull = (inner: string) => `<div class="p-4 w-full">${inner}</div>`;

export function buildOrganismDataData(): ShowcaseItem[] {
  return [
    {
      id: 'table',
      title: 'Table',
      category: 'Organism',
      abbr: 'Tl',
      description: 'Semantik HTML tablosu. thead/tbody, sütun hizalaması ve boş durum mesajı desteği.',
      filePath: 'modules/ui/Table.ejs',
      sourceCode: tableSource,
      variants: [
        {
          title: 'Default',
          previewHtml: wrapFull(tableEl({
            columns: [
              { key: 'name',   header: 'Name' },
              { key: 'role',   header: 'Role' },
              { key: 'status', header: 'Status', align: 'center' },
              { key: 'joined', header: 'Joined',  align: 'right' },
            ],
            rows: [
              { name: 'Alice Johnson', role: 'Admin',     status: 'Active',   joined: 'Jan 2024' },
              { name: 'Bob Smith',     role: 'Editor',    status: 'Active',   joined: 'Mar 2024' },
              { name: 'Carol White',   role: 'Viewer',    status: 'Inactive', joined: 'Jun 2024' },
              { name: 'Dan Brown',     role: 'Editor',    status: 'Pending',  joined: 'Sep 2024' },
            ],
          })),
          code: `<%- include('modules/ui/Table', {
  columns: [
    { key: 'name',   header: 'Name' },
    { key: 'role',   header: 'Role' },
    { key: 'status', header: 'Status', align: 'center' },
    { key: 'joined', header: 'Joined',  align: 'right' },
  ],
  rows: [
    { name: 'Alice Johnson', role: 'Admin',  status: 'Active',   joined: 'Jan 2024' },
    { name: 'Bob Smith',     role: 'Editor', status: 'Active',   joined: 'Mar 2024' },
    { name: 'Carol White',   role: 'Viewer', status: 'Inactive', joined: 'Jun 2024' },
  ]
}) %>`,
          layout: 'stack',
        },
        {
          title: 'Compact — 2 columns',
          previewHtml: wrapFull(tableEl({
            columns: [
              { key: 'key',   header: 'Setting' },
              { key: 'value', header: 'Value', align: 'right' },
            ],
            rows: [
              { key: 'Max upload size', value: '10 MB' },
              { key: 'Session timeout', value: '30 min' },
              { key: 'API rate limit',  value: '1 000 / hr' },
              { key: 'Cache TTL',       value: '5 min' },
            ],
          })),
          code: `<%- include('modules/ui/Table', {
  columns: [
    { key: 'key',   header: 'Setting' },
    { key: 'value', header: 'Value', align: 'right' },
  ],
  rows: [
    { key: 'Max upload size', value: '10 MB' },
    { key: 'Session timeout', value: '30 min' },
  ]
}) %>`,
          layout: 'stack',
        },
        {
          title: 'Empty state',
          previewHtml: wrapFull(tableEl({
            columns: [
              { key: 'name',   header: 'Name' },
              { key: 'email',  header: 'Email' },
              { key: 'status', header: 'Status' },
            ],
            rows: [],
            emptyMessage: 'No users found. Invite someone to get started.',
          })),
          code: `<%- include('modules/ui/Table', {
  columns: [...],
  rows: [],
  emptyMessage: 'No users found. Invite someone to get started.'
}) %>`,
          layout: 'stack',
        },
      ],
    },
  ];
}
