import { Router } from 'express';
import commonRouter from './themes/common';
import modemRouter  from './themes/modem';

const router = Router();

router.use('/common', commonRouter);
router.use('/modem',  modemRouter);

router.get('/', (_req, res) => {
  res.redirect('/theme/common');
});

export default router;
