import type { ShowcaseItem } from '../../types';
import { buildMoleculeTextData }      from './ui-molecule-text.showcase';
import { buildMoleculeSelectionData } from './ui-molecule-selection.showcase';
import { buildMoleculePickersData }   from './ui-molecule-pickers.showcase';

export function buildMoleculesData(): ShowcaseItem[] {
  return [
    ...buildMoleculeTextData(),
    ...buildMoleculeSelectionData(),
    ...buildMoleculePickersData(),
  ];
}
