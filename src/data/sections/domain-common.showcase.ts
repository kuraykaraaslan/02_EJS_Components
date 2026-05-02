import type { ShowcaseItem } from '../../types';
import * as fs from 'fs';
import * as path from 'path';
import { buildDomainCommonAuthData } from './domain-common-auth.showcase';
import { buildDomainCommonUserData } from './domain-common-user.showcase';

const languageSwitcherSource = fs.readFileSync(path.join(process.cwd(), 'modules/domain/common/i18n/LanguageSwitcher.ejs'), 'utf-8');
const notFoundPageSource     = fs.readFileSync(path.join(process.cwd(), 'modules/domain/common/NotFoundPage.ejs'), 'utf-8');

// ─── LanguageSwitcher preview helper ─────────────────────────────────────────

function langSwitcherEl(value: string) {
  const langs = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'tr', label: '🇹🇷 Türkçe' },
    { value: 'de', label: '🇩🇪 Deutsch' },
    { value: 'fr', label: '🇫🇷 Français' },
    { value: 'ar', label: '🇸🇦 العربية' },
  ];
  const options = langs.map(l =>
    `<option value="${l.value}"${l.value === value ? ' selected' : ''}>${l.label}</option>`
  ).join('');
  return `<div class="relative inline-flex items-center gap-1">
  <i class="fa-solid fa-globe text-text-secondary text-sm" aria-hidden="true"></i>
  <select aria-label="Select language"
    class="appearance-none rounded-md border border-border bg-surface text-text-primary text-sm px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-text-tertiary transition-colors cursor-pointer">
    ${options}
  </select>
  <i class="fa-solid fa-chevron-down text-xs text-text-disabled pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" aria-hidden="true"></i>
</div>`;
}

// ─── NotFoundPage preview (miniaturized) ──────────────────────────────────────

const notFoundPreview = `<div class="flex flex-col items-center justify-center py-10 px-4 bg-surface-base w-full text-center">
  <div class="select-none text-7xl font-black leading-none tabular-nums"
    style="background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:.15"
    aria-hidden="true">404</div>
  <div class="flex h-14 w-14 -mt-6 mb-4 items-center justify-center rounded-xl"
    style="background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%)">
    <i class="fa-solid fa-magnifying-glass text-white text-lg" aria-hidden="true"></i>
  </div>
  <h1 class="text-lg font-bold text-text-primary">Page Not Found</h1>
  <p class="mt-2 max-w-xs text-text-secondary text-sm">The page you're looking for has been removed, moved, or never existed.</p>
  <div class="mt-6 flex flex-wrap items-center justify-center gap-2">
    <a href="#" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
      style="background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%)">
      <i class="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i>Go Home
    </a>
    <button type="button" class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-text-primary border border-border hover:bg-surface-overlay">
      Go Back
    </button>
  </div>
</div>`;

// ─── Builder ──────────────────────────────────────────────────────────────────

export function buildDomainCommonData(): ShowcaseItem[] {
  return [
    ...buildDomainCommonAuthData(),
    ...buildDomainCommonUserData(),

    // ── LanguageSwitcher ──────────────────────────────────────────────────────
    {
      id: 'language-switcher',
      title: 'LanguageSwitcher',
      category: 'Domain',
      abbr: 'Ls',
      description: 'Native select ile dil seçici. en/tr/de/fr/ar varsayılan diller; autoSubmit ile form aracılığıyla otomatik gönderi.',
      filePath: 'modules/domain/common/i18n/LanguageSwitcher.ejs',
      sourceCode: languageSwitcherSource,
      variants: [
        {
          title: 'Default (English)',
          previewHtml: `<div class="p-4">${langSwitcherEl('en')}</div>`,
          code: `<%- include('modules/domain/common/i18n/LanguageSwitcher', {
  value: currentLang,
  name: 'language'
}) %>`,
        },
        {
          title: 'Turkish selected',
          previewHtml: `<div class="p-4">${langSwitcherEl('tr')}</div>`,
          code: `<%- include('modules/domain/common/i18n/LanguageSwitcher', {
  value: 'tr'
}) %>`,
        },
        {
          title: 'Auto-submit on change',
          previewHtml: `<div class="p-4"><form action="/set-language" method="post">${langSwitcherEl('en')}</form></div>`,
          code: `<form action="/set-language" method="post">
  <%- include('modules/domain/common/i18n/LanguageSwitcher', {
    value: currentLang,
    autoSubmit: true
  }) %>
</form>`,
        },
      ],
    },

    // ── NotFoundPage ──────────────────────────────────────────────────────────
    {
      id: 'not-found-page',
      title: 'NotFoundPage',
      category: 'Domain',
      abbr: 'Nf',
      description: 'Tam sayfa 404 bileşeni. Gradient 404 yazısı, ikon, başlık, açıklama ve "Go Home" / "Go Back" butonları.',
      filePath: 'modules/domain/common/NotFoundPage.ejs',
      sourceCode: notFoundPageSource,
      variants: [
        {
          title: 'Default',
          previewHtml: notFoundPreview,
          code: `<%- include('modules/domain/common/NotFoundPage') %>`,
          layout: 'stack',
        },
        {
          title: 'Custom title & description',
          previewHtml: notFoundPreview,
          code: `<%- include('modules/domain/common/NotFoundPage', {
  title: 'Nothing here yet',
  description: 'This section is under construction. Check back soon.',
  homeLabel: 'Return home',
  backLabel: 'Previous page'
}) %>`,
          layout: 'stack',
        },
      ],
    },
  ];
}
