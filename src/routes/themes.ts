import { Router } from 'express';
import commonRouter  from './themes/common';
import modemRouter   from './themes/modem';
import apiDocRouter  from './themes/api-doc';

const router = Router();

router.use('/common',  commonRouter);
router.use('/modem',   modemRouter);
router.use('/api-doc', apiDocRouter);

router.get('/', (_req, res) => {
  res.redirect('/theme/common');
});

export default router;
