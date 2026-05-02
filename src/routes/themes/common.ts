import { Router, Request, Response } from 'express';

const router = Router();

/* ─── Demo data ─── */

const DEMO_USER = {
  name:           'John Doe',
  username:       'johndoe',
  email:          'john.doe@example.com',
  phone:          '+90 555 123 45 67',
  biography:      'Full-stack developer passionate about design systems and component-driven development.',
  profilePicture: null,
  role:           'AUTHOR',
  status:         'ACTIVE',
};

const DEFAULT_PREFERENCES = {
  theme:              'SYSTEM',
  language:           'en',
  emailNotifications: true,
  pushNotifications:  false,
  newsletter:         true,
  timezone:           'Europe/Istanbul',
};

const DEFAULT_ADDRESSES = [
  {
    fullName:     'John Doe',
    phone:        '+90 555 123 45 67',
    addressLine1: 'Atatürk Caddesi No:42 Daire:5',
    addressLine2: 'Levent Mah.',
    city:         'Istanbul',
    state:        'Istanbul',
    postalCode:   '34330',
    country:      'Turkey',
    countryCode:  'TR',
  },
  {
    fullName:     'John Doe',
    phone:        '+90 555 987 65 43',
    addressLine1: 'Kızılay Meydanı Sk. No:8',
    addressLine2: null,
    city:         'Ankara',
    state:        'Ankara',
    postalCode:   '06420',
    country:      'Turkey',
    countryCode:  'TR',
  },
];

const DEFAULT_CARDS = [
  { cardId: 'card-1', last4: '4242', brand: 'VISA',       cardholderName: 'JOHN DOE', expiryMonth: '08', expiryYear: '27', isDefault: true },
  { cardId: 'card-2', last4: '5555', brand: 'MASTERCARD', cardholderName: 'JOHN DOE', expiryMonth: '12', expiryYear: '26' },
  { cardId: 'card-3', last4: '3782', brand: 'AMEX',       cardholderName: 'JOHN DOE', expiryMonth: '03', expiryYear: '28' },
];

const DEFAULT_CART = {
  cartId: 'cart-demo-001',
  items: [
    { cartItemId: 'ci-1', productId: 'prod-1', name: 'Pro Plan — Annual',    description: 'Full access to all features, priority support', image: null, variant: 'Billing: Yearly', price: 999.90,  currency: 'TRY', quantity: 1, maxQuantity: 1 },
    { cartItemId: 'ci-2', productId: 'prod-2', name: 'Design System Add-on', description: 'Component library + Figma kit',                 image: null, variant: null,             price: 150.00,  currency: 'TRY', quantity: 2, maxQuantity: 5 },
    { cartItemId: 'ci-3', productId: 'prod-3', name: 'Priority Support',     description: '12-month dedicated support package',             image: null, variant: null,             price: 130.00,  currency: 'TRY', quantity: 1, maxQuantity: 1 },
  ],
  totals: { subtotal: 1429.90, discountTotal: 130.00, taxTotal: 208.78, serviceFee: 29.99, shippingTotal: 0, total: 1538.67, currency: 'TRY' },
};

const DEMO_ORDERS = [
  { paymentId: 'pay-001', provider: 'Stripe',  providerPaymentId: 'pi_3NxA1',   method: 'CREDIT_CARD', status: 'PAID',     amount: 1538.67, currency: 'TRY' },
  { paymentId: 'pay-002', provider: 'Stripe',  providerPaymentId: 'pi_3NwB2',   method: 'CREDIT_CARD', status: 'REFUNDED', amount: 299.90,  currency: 'TRY' },
  { paymentId: 'pay-003', provider: 'PayPal',  providerPaymentId: 'PAYID-MXY123',method: 'WALLET',      status: 'PAID',     amount: 89.00,   currency: 'TRY' },
  { paymentId: 'pay-004', provider: 'Stripe',  providerPaymentId: 'pi_3NvC3',   method: 'CREDIT_CARD', status: 'FAILED',   amount: 450.00,  currency: 'TRY' },
  { paymentId: 'pay-005', provider: 'Stripe',  providerPaymentId: 'pi_3NuD4',   method: 'DEBIT_CARD',  status: 'PENDING',  amount: 750.00,  currency: 'TRY' },
];

const ORDER_TOTALS = { subtotal: 1299.90, discountTotal: 130.00, taxTotal: 208.78, serviceFee: 29.99, shippingTotal: 0, total: 1408.67, currency: 'TRY' };

/* ─── Mutable demo state (single-user, resets on server restart) ─── */

let demoUser        = { ...DEMO_USER };
let demoPreferences = { ...DEFAULT_PREFERENCES };
let demoAddresses   = DEFAULT_ADDRESSES.map((a) => ({ ...a }));
let demoCards       = DEFAULT_CARDS.map((c) => ({ ...c }));
let demoCart        = { ...DEFAULT_CART, items: DEFAULT_CART.items.map((i) => ({ ...i })), totals: { ...DEFAULT_CART.totals } };
let cartCoupon: string | undefined;

function recalcCart() {
  const subtotal = demoCart.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = cartCoupon ? Math.round(subtotal * 0.1) : 0;
  const tax      = Math.round((subtotal - discount) * 0.18 * 100) / 100;
  const service  = demoCart.totals.serviceFee;
  demoCart.totals = { ...demoCart.totals, subtotal, discountTotal: discount, taxTotal: tax, total: subtotal - discount + tax + service };
}

/* ══════════════════════════════════════════════════════════════
   Index
══════════════════════════════════════════════════════════════ */

router.get('/', (_req: Request, res: Response) => {
  res.render('theme/common/index', { layout: 'layouts/blank', title: 'Common Theme' });
});

/* ══════════════════════════════════════════════════════════════
   Auth
══════════════════════════════════════════════════════════════ */

router.get('/auth/login', (req: Request, res: Response) => {
  res.render('theme/common/auth/login', {
    layout:      'layouts/blank',
    title:       'Login — Common Theme',
    showExpired: !req.query.noexpired,
    successMsg:  req.query.success ? `Signed in as ${req.query.email || 'you'}` : '',
    error:       req.query.error   || '',
  });
});

router.post('/auth/login', (req: Request, res: Response) => {
  const { provider, email } = req.body;
  if (provider) return res.redirect('/theme/common/auth/login?success=1&email=' + encodeURIComponent(provider + '@oauth.demo'));
  if (!email)   return res.redirect('/theme/common/auth/login?error=Email+is+required');
  res.redirect('/theme/common/auth/login?success=1&email=' + encodeURIComponent(email));
});

router.get('/auth/register', (req: Request, res: Response) => {
  res.render('theme/common/auth/register', {
    layout:       'layouts/blank',
    title:        'Register — Common Theme',
    successEmail: req.query.success || '',
    error:        req.query.error   || '',
  });
});

router.post('/auth/register', (req: Request, res: Response) => {
  const { provider, email, password, confirmPassword } = req.body;
  if (provider) return res.redirect('/theme/common/auth/register?success=' + encodeURIComponent(provider + '@oauth.demo'));
  if (!email)   return res.redirect('/theme/common/auth/register?error=Email+is+required');
  if (!password || password.length < 8) return res.redirect('/theme/common/auth/register?error=Password+too+short');
  if (password !== confirmPassword)     return res.redirect('/theme/common/auth/register?error=Passwords+do+not+match');
  res.redirect('/theme/common/auth/register?success=' + encodeURIComponent(email));
});

router.get('/auth/forgot-password', (req: Request, res: Response) => {
  res.render('theme/common/auth/forgot-password', {
    layout:     'layouts/blank',
    title:      'Forgot Password — Common Theme',
    sent:       !!req.query.sent,
    emailValue: req.query.email || '',
  });
});

router.post('/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  res.redirect('/theme/common/auth/forgot-password?sent=1&email=' + encodeURIComponent(email || ''));
});

router.get('/auth/reset-password', (req: Request, res: Response) => {
  res.render('theme/common/auth/reset-password', {
    layout:  'layouts/blank',
    title:   'Reset Password — Common Theme',
    success: !!req.query.success,
    error:   req.query.error || '',
  });
});

router.post('/auth/reset-password', (req: Request, res: Response) => {
  const { newPassword, confirmPassword } = req.body;
  if (!newPassword || newPassword.length < 8) return res.redirect('/theme/common/auth/reset-password?error=Password+too+short');
  if (newPassword !== confirmPassword)        return res.redirect("/theme/common/auth/reset-password?error=Passwords+don't+match");
  res.redirect('/theme/common/auth/reset-password?success=1');
});

router.get('/auth/verify-email', (req: Request, res: Response) => {
  res.render('theme/common/auth/verify-email', {
    layout:   'layouts/blank',
    title:    'Verify Email — Common Theme',
    verified: !!req.query.verified,
  });
});

router.get('/auth/two-factor', (req: Request, res: Response) => {
  res.render('theme/common/auth/two-factor', {
    layout:  'layouts/blank',
    title:   'Two-Factor Auth — Common Theme',
    success: !!req.query.success,
  });
});

/* ══════════════════════════════════════════════════════════════
   Cart
══════════════════════════════════════════════════════════════ */

router.get('/cart', (_req: Request, res: Response) => {
  res.render('theme/common/cart/index', {
    layout:        'layouts/blank',
    title:         'Cart — Common Theme',
    cart:          demoCart,
    appliedCoupon: cartCoupon,
  });
});

router.post('/cart/quantity', (req: Request, res: Response) => {
  const { cartItemId, qty } = req.body;
  const item = demoCart.items.find((i) => i.cartItemId === cartItemId);
  if (item) {
    const newQty = Math.max(1, Math.min(item.maxQuantity, parseInt(qty as string) || 1));
    item.quantity = newQty;
    recalcCart();
  }
  res.redirect('/theme/common/cart');
});

router.post('/cart/remove', (req: Request, res: Response) => {
  const { cartItemId } = req.body;
  demoCart.items = demoCart.items.filter((i) => i.cartItemId !== cartItemId);
  recalcCart();
  res.redirect('/theme/common/cart');
});

router.post('/cart/coupon', (req: Request, res: Response) => {
  const { couponCode } = req.body;
  if ((couponCode as string)?.toUpperCase() === 'SAVE10') {
    cartCoupon = 'SAVE10';
    recalcCart();
    res.redirect('/theme/common/cart');
  } else {
    res.redirect('/theme/common/cart?couponError=' + encodeURIComponent('Invalid coupon. Try SAVE10.'));
  }
});

router.post('/cart/coupon/remove', (_req: Request, res: Response) => {
  cartCoupon = undefined;
  recalcCart();
  res.redirect('/theme/common/cart');
});

/* ══════════════════════════════════════════════════════════════
   Payment
══════════════════════════════════════════════════════════════ */

router.get('/payment', (_req: Request, res: Response) => {
  res.render('theme/common/payment/index', {
    layout:      'layouts/blank',
    title:       'Payment Components — Common Theme',
    orderTotals: ORDER_TOTALS,
    savedCards:  demoCards,
    demoPayment: { paymentId: 'pay_demo_001', provider: 'Stripe', providerPaymentId: 'pi_3NxYz2EwLHMpEt9Q1aB2c3D4', method: 'CREDIT_CARD', status: 'PAID', amount: ORDER_TOTALS.total, currency: ORDER_TOTALS.currency },
  });
});

router.get('/payment/checkout', (_req: Request, res: Response) => {
  res.render('theme/common/payment/checkout', {
    layout:      'layouts/blank',
    title:       'Checkout — Common Theme',
    addresses:   demoAddresses,
    cards:       demoCards,
    demoCart,
    orderTotals: ORDER_TOTALS,
  });
});

/* ══════════════════════════════════════════════════════════════
   Not Found
══════════════════════════════════════════════════════════════ */

router.get('/not-found', (_req: Request, res: Response) => {
  res.render('theme/common/not-found', { layout: 'layouts/blank', title: '404 — Common Theme' });
});

/* ══════════════════════════════════════════════════════════════
   Account
══════════════════════════════════════════════════════════════ */

function accountContext() {
  return {
    name:           demoUser.name,
    email:          demoUser.email,
    username:       demoUser.username,
    biography:      demoUser.biography,
    profilePicture: demoUser.profilePicture,
    role:           demoUser.role,
    status:         demoUser.status,
  };
}

/* Profile */
router.get('/account/profile', (req: Request, res: Response) => {
  res.render('theme/common/account/profile', {
    layout:  'layouts/blank',
    title:   'Profile — Common Theme',
    user:    accountContext(),
    saved:   !!req.query.saved,
    editing: !!req.query.edit,
  });
});

router.post('/account/profile', (req: Request, res: Response) => {
  const { name, username, biography, profilePicture } = req.body;
  demoUser = { ...demoUser, name: name || demoUser.name, username: username || demoUser.username, biography: biography || demoUser.biography, profilePicture: profilePicture || demoUser.profilePicture };
  res.redirect('/theme/common/account/profile?saved=1');
});

/* Settings */
router.get('/account/settings', (req: Request, res: Response) => {
  res.render('theme/common/account/settings', {
    layout:      'layouts/blank',
    title:       'Settings — Common Theme',
    user:        accountContext(),
    preferences: demoPreferences,
    prefSaved:   !!req.query.prefSaved,
    pwSaved:     !!req.query.pwSaved,
    pwError:     !!req.query.pwError,
  });
});

router.post('/account/settings/preferences', (req: Request, res: Response) => {
  demoPreferences = {
    theme:              req.body.theme              || demoPreferences.theme,
    language:           req.body.language           || demoPreferences.language,
    emailNotifications: req.body.emailNotifications === '1',
    pushNotifications:  req.body.pushNotifications  === '1',
    newsletter:         req.body.newsletter         === '1',
    timezone:           demoPreferences.timezone,
  };
  res.redirect('/theme/common/account/settings?prefSaved=1');
});

router.post('/account/settings/password', (req: Request, res: Response) => {
  const { currentPassword } = req.body;
  if (currentPassword === 'wrong') return res.redirect('/theme/common/account/settings?pwError=1');
  res.redirect('/theme/common/account/settings?pwSaved=1');
});

/* Addresses */
router.get('/account/addresses', (req: Request, res: Response) => {
  res.render('theme/common/account/addresses', {
    layout:    'layouts/blank',
    title:     'Addresses — Common Theme',
    user:      accountContext(),
    addresses: demoAddresses,
    mode:      (req.query.mode as string) || 'list',
    editIdx:   req.query.idx !== undefined ? parseInt(req.query.idx as string) : -1,
    flash:     req.query.flash || '',
  });
});

router.post('/account/addresses/new', (req: Request, res: Response) => {
  const addr = {
    fullName: req.body.fullName, phone: req.body.phone,
    addressLine1: req.body.addressLine1, addressLine2: req.body.addressLine2 || null,
    city: req.body.city, state: req.body.state, postalCode: req.body.postalCode,
    country: req.body.country, countryCode: req.body.countryCode,
  };
  demoAddresses.push(addr);
  res.redirect('/theme/common/account/addresses?flash=Address+added.');
});

router.post('/account/addresses/:idx', (req: Request, res: Response) => {
  const idx = parseInt(req.params.idx as string);
  if (idx >= 0 && idx < demoAddresses.length) {
    demoAddresses[idx] = {
      fullName: req.body.fullName, phone: req.body.phone,
      addressLine1: req.body.addressLine1, addressLine2: req.body.addressLine2 || null,
      city: req.body.city, state: req.body.state, postalCode: req.body.postalCode,
      country: req.body.country, countryCode: req.body.countryCode,
    };
  }
  res.redirect('/theme/common/account/addresses?flash=Address+updated.');
});

router.post('/account/addresses/:idx/delete', (req: Request, res: Response) => {
  const idx = parseInt(req.params.idx as string);
  if (idx >= 0 && idx < demoAddresses.length) demoAddresses.splice(idx, 1);
  res.redirect('/theme/common/account/addresses?flash=Address+removed.');
});

/* Payment methods */
router.get('/account/payment-methods', (req: Request, res: Response) => {
  res.render('theme/common/account/payment-methods', {
    layout: 'layouts/blank',
    title:  'Payment Methods — Common Theme',
    user:   accountContext(),
    cards:  demoCards,
    adding: !!req.query.adding,
    flash:  req.query.flash || '',
  });
});

router.post('/account/payment-methods/new', (req: Request, res: Response) => {
  const expiry = (req.body.expiry || '').split('/');
  const newCard = {
    cardId:         'card-' + Date.now(),
    last4:          (req.body.cardNumber || '').replace(/\s/g, '').slice(-4),
    brand:          'VISA' as const,
    cardholderName: req.body.cardholderName || 'CARD HOLDER',
    expiryMonth:    expiry[0]?.trim() || '12',
    expiryYear:     expiry[1]?.trim() || '99',
  };
  demoCards.push(newCard);
  res.redirect('/theme/common/account/payment-methods?flash=Card+added.');
});

router.post('/account/payment-methods/:id/remove', (req: Request, res: Response) => {
  demoCards = demoCards.filter((c) => c.cardId !== req.params.id);
  res.redirect('/theme/common/account/payment-methods?flash=Card+removed.');
});

/* Orders */
router.get('/account/orders', (req: Request, res: Response) => {
  res.render('theme/common/account/orders', {
    layout: 'layouts/blank',
    title:  'Orders — Common Theme',
    user:   accountContext(),
    orders: DEMO_ORDERS,
    filter: (req.query.filter as string) || 'ALL',
  });
});

export default router;
