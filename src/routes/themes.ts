import { Router } from 'express';

const router = Router();

// Theme routes are registered here as themes are created.
// Example:
// import landingRouter from './themes/landing';
// router.use('/landing', landingRouter);

router.get('/', (req, res) => {
  res.redirect('/');
});

export default router;
