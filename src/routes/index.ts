import { Router } from 'express';
import NAV_GROUPS from '../data/showcase.menu';
import { SHOWCASE_DATA_MAP } from '../data/showcase.data';

const router = Router();

router.get('/', (req, res) => {
  const selectedId = typeof req.query.id === 'string' ? req.query.id : null;
  const selected = selectedId ? (SHOWCASE_DATA_MAP[selectedId] ?? null) : null;

  const navGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      active: item.id === selectedId,
    })),
  }));

  res.render('showcase/index', {
    layout: false,
    title: selected ? `${selected.title} — EJS Components` : 'EJS Components',
    navGroups,
    selectedId,
    selected,
  });
});

export default router;
