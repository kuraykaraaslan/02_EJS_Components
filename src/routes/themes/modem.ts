import { Router, Request, Response } from 'express';
import { modemState } from '../../data/modem.data';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.render('theme/modem/index', {
    layout: 'layouts/blank',
    title:  'Dashboard — Modem Theme',
    state:  modemState,
  });
});

router.get('/network', (_req: Request, res: Response) => {
  res.render('theme/modem/network', {
    layout: 'layouts/blank',
    title:  'Network — Modem Theme',
    state:  modemState,
  });
});

router.get('/wifi', (_req: Request, res: Response) => {
  res.render('theme/modem/wifi', {
    layout: 'layouts/blank',
    title:  'Wi-Fi — Modem Theme',
    state:  modemState,
  });
});

router.get('/devices', (req: Request, res: Response) => {
  res.render('theme/modem/devices', {
    layout:  'layouts/blank',
    title:   'Devices — Modem Theme',
    state:   modemState,
    filter:  (req.query.filter as string) || 'ALL',
  });
});

router.get('/firewall', (_req: Request, res: Response) => {
  res.render('theme/modem/firewall', {
    layout: 'layouts/blank',
    title:  'Firewall — Modem Theme',
    state:  modemState,
  });
});

router.get('/advanced', (_req: Request, res: Response) => {
  res.render('theme/modem/advanced', {
    layout: 'layouts/blank',
    title:  'Advanced — Modem Theme',
    state:  modemState,
  });
});

router.get('/system', (req: Request, res: Response) => {
  res.render('theme/modem/system', {
    layout:    'layouts/blank',
    title:     'System — Modem Theme',
    state:     modemState,
    logFilter: (req.query.logFilter as string) || 'ALL',
  });
});

export default router;
