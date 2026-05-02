import type { ShowcaseItem } from '../../types';
import { buildOrganismContentData }  from './ui-organism-content.showcase';
import { buildOrganismNavData }      from './ui-organism-nav.showcase';
import { buildOrganismOverlayData }  from './ui-organism-overlay.showcase';
import { buildOrganismDataData }     from './ui-organism-data.showcase';

export function buildOrganismsData(): ShowcaseItem[] {
  return [
    ...buildOrganismContentData(),
    ...buildOrganismNavData(),
    ...buildOrganismOverlayData(),
    ...buildOrganismDataData(),
  ];
}
