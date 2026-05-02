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
];

export default NAV_GROUPS;
