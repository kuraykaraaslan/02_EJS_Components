import { Router, Request, Response } from 'express';
import { SAMPLE_SPEC } from '../../data/api-doc.data';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.render('theme/api-doc/index', {
    layout: 'layouts/blank',
    title:  `${SAMPLE_SPEC.info.title} ${SAMPLE_SPEC.info.version}`,
    spec:   SAMPLE_SPEC,
  });
});

export default router;
