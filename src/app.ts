import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import indexRouter from './routes/index';
import themesRouter from './routes/themes';

const app = express();

// Shared across every view/partial
app.locals.catStyle = {
  'Atom':     'background:var(--info-subtle);color:var(--info-fg)',
  'Molecule': 'background:var(--primary-subtle);color:var(--primary)',
  'Organism': 'background:var(--success-subtle);color:var(--success-fg)',
  'App':      'background:var(--warning-subtle);color:var(--warning-fg)',
  'Domain':   'background:var(--error-subtle);color:var(--error-fg)',
  'Theme':    'background:var(--secondary);color:var(--primary-fg)',
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/theme', themesRouter);

app.use((req, res) => {
  res.status(404).render('404', { title: '404 — Not Found' });
});

export default app;
