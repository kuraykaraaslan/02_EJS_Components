import type { ShowcaseItem } from '../types';
import { buildAtomsData }        from './sections/ui-atoms.showcase';
import { buildMoleculesData }    from './sections/ui-molecules.showcase';
import { buildOrganismsData }    from './sections/ui-organisms.showcase';
import { buildDomainCommonData } from './sections/domain-common.showcase';

export const SHOWCASE_DATA: ShowcaseItem[] = [
  ...buildAtomsData(),
  ...buildMoleculesData(),
  ...buildOrganismsData(),
  ...buildDomainCommonData(),
];

export const SHOWCASE_DATA_MAP: Record<string, ShowcaseItem> = Object.fromEntries(
  SHOWCASE_DATA.map((c) => [c.id, c]),
);
