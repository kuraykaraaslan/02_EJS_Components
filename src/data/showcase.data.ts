import type { ShowcaseItem } from '../types';

// Component/theme data populated here as items are created.
export const SHOWCASE_DATA: ShowcaseItem[] = [];

export const SHOWCASE_DATA_MAP: Record<string, ShowcaseItem> = Object.fromEntries(
  SHOWCASE_DATA.map((c) => [c.id, c]),
);
