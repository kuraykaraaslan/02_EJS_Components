import { Router } from 'express';
import commonRouter from './themes/common';

const router = Router();

router.use('/common', commonRouter);

router.get('/', (_req, res) => {
  res.redirect('/theme/common');
});

export default router;
