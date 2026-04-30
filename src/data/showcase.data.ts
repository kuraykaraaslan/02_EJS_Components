import type { ShowcaseItem } from '../types';
import { buildAtomsData } from './sections/ui-atoms.showcase';

export const SHOWCASE_DATA: ShowcaseItem[] = [
  ...buildAtomsData(),
];

export const SHOWCASE_DATA_MAP: Record<string, ShowcaseItem> = Object.fromEntries(
  SHOWCASE_DATA.map((c) => [c.id, c]),
);
