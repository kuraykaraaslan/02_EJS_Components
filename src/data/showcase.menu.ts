import type { ShowcaseNavGroup } from '../types';

const NAV_GROUPS: ShowcaseNavGroup[] = [
  {
    label: 'Atoms',
    collapsible: true,
    items: [
      { id: 'button',       title: 'Button',      category: 'Atom', abbr: 'Bt' },
      { id: 'button-group', title: 'ButtonGroup', category: 'Atom', abbr: 'BG' },
      { id: 'badge',        title: 'Badge',        category: 'Atom', abbr: 'Bg' },
      { id: 'avatar',       title: 'Avatar',       category: 'Atom', abbr: 'Av' },
      { id: 'spinner',      title: 'Spinner',      category: 'Atom', abbr: 'Sp' },
      { id: 'toggle',       title: 'Toggle',       category: 'Atom', abbr: 'Tg' },
      { id: 'checkbox',     title: 'Checkbox',     category: 'Atom', abbr: 'Cb' },
      { id: 'input',        title: 'Input',        category: 'Atom', abbr: 'In' },
      { id: 'textarea',     title: 'Textarea',     category: 'Atom', abbr: 'Ta' },
    ],
  },
  {
    label: 'Molecules',
    collapsible: true,
    items: [
      { id: 'search-bar',     title: 'SearchBar',     category: 'Molecule', abbr: 'Sb' },
      { id: 'select',         title: 'Select',         category: 'Molecule', abbr: 'Sl' },
      { id: 'radio-group',    title: 'RadioGroup',     category: 'Molecule', abbr: 'Rg' },
      { id: 'checkbox-group', title: 'CheckboxGroup',  category: 'Molecule', abbr: 'Cg' },
      { id: 'date-picker',    title: 'DatePicker',     category: 'Molecule', abbr: 'Dp' },
      { id: 'file-input',     title: 'FileInput',      category: 'Molecule', abbr: 'Fi' },
    ],
  },
  {
    label: 'Organisms',
    collapsible: true,
    items: [
      { id: 'card',         title: 'Card',         category: 'Organism', abbr: 'Cd' },
      { id: 'alert-banner', title: 'AlertBanner',  category: 'Organism', abbr: 'Al' },
      { id: 'toast',        title: 'Toast',        category: 'Organism', abbr: 'Ts' },
      { id: 'modal',        title: 'Modal',        category: 'Organism', abbr: 'Md' },
      { id: 'drawer',       title: 'Drawer',       category: 'Organism', abbr: 'Dr' },
      { id: 'pagination',   title: 'Pagination',   category: 'Organism', abbr: 'Pg' },
      { id: 'tab-group',    title: 'TabGroup',     category: 'Organism', abbr: 'Tb' },
      { id: 'breadcrumb',   title: 'Breadcrumb',   category: 'Organism', abbr: 'Bc' },
      { id: 'stepper',      title: 'Stepper',      category: 'Organism', abbr: 'Sr' },
      { id: 'table',        title: 'Table',        category: 'Organism', abbr: 'Tl' },
    ],
  },
  {
    label: 'Domain · Common',
    collapsible: true,
    items: [
      { id: 'login-form',            title: 'LoginForm',           category: 'Domain', abbr: 'Lf' },
      { id: 'register-form',         title: 'RegisterForm',        category: 'Domain', abbr: 'Rf' },
      { id: 'forgot-password-form',  title: 'ForgotPasswordForm',  category: 'Domain', abbr: 'Fp' },
      { id: 'change-password-form',  title: 'ChangePasswordForm',  category: 'Domain', abbr: 'Cp' },
      { id: 'oauth-buttons',         title: 'OAuthButtons',        category: 'Domain', abbr: 'Ob' },
      { id: 'session-expired-banner',title: 'SessionExpiredBanner',category: 'Domain', abbr: 'Se' },
      { id: 'user-avatar',           title: 'UserAvatar',          category: 'Domain', abbr: 'Ua' },
      { id: 'user-menu',             title: 'UserMenu',            category: 'Domain', abbr: 'Um' },
      { id: 'user-role-badge',       title: 'UserRoleBadge',       category: 'Domain', abbr: 'Ur' },
      { id: 'user-status-badge',     title: 'UserStatusBadge',     category: 'Domain', abbr: 'Us' },
      { id: 'user-profile-form',     title: 'UserProfileForm',     category: 'Domain', abbr: 'Up' },
      { id: 'user-preferences-form', title: 'UserPreferencesForm', category: 'Domain', abbr: 'Ue' },
      { id: 'language-switcher',     title: 'LanguageSwitcher',    category: 'Domain', abbr: 'Ls' },
      { id: 'not-found-page',        title: 'NotFoundPage',        category: 'Domain', abbr: 'Nf' },
    ],
  },
];

export default NAV_GROUPS;
