import type { ShowcaseItem } from '../../types';
import { buildAppShellData }   from './app-shell.showcase';
import { buildAppNavData }     from './app-nav.showcase';
import { buildAppUserData }    from './app-user.showcase';
import { buildAppFormData }    from './app-form.showcase';
import { buildAppContentData } from './app-content.showcase';

export function buildAppPatternsData(): ShowcaseItem[] {
  return [
    ...buildAppShellData(),
    ...buildAppNavData(),
    ...buildAppUserData(),
    ...buildAppFormData(),
    ...buildAppContentData(),
  ];
}
