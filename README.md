# EJS Components Showcase

Server-rendered multi-page website themes built with Node.js, Express, EJS, and Tailwind CSS 4.

## Highlights

- Node.js 20+ + Express 4 + TypeScript 5 + Tailwind CSS 4
- EJS 3 templating with express-ejs-layouts
- Layered module architecture (ui -> app -> domain -> theme)
- Multiple themes and sample page flows
- Font Awesome icon standard (CDN)
- Design token-driven styling approach

## Tech Stack

- Node.js 20+
- Express 4
- EJS 3 + express-ejs-layouts
- TypeScript 5
- Tailwind CSS 4
- PostCSS pipeline

## Quick Start

Requirements:

- Node.js 20+
- npm 10+

Install:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app runs on http://localhost:3000 by default.

## Scripts

```bash
npm run dev       # development (server + CSS watcher in parallel)
npm run build     # production build (CSS then TypeScript → dist/)
npm start         # production server (runs dist/server.js)
```

## Project Structure

Main directories:

- src/routes/: Express route files, one per theme
- src/data/: Static sample data files per theme
- src/types/: Shared TypeScript type definitions
- views/layouts/: Base EJS layouts (main, blank)
- views/partials/: Shared partials (head, navbar, footer)
- views/themes/: Theme-specific EJS views
- modules/ui/: Reusable EJS partial components (atoms/molecules)
- modules/app/: Application-level component compositions
- modules/domain/: Industry-specific domain components
- public/css/: Tailwind source and compiled CSS output

Layering model:

1. modules/ui
2. modules/app
3. modules/domain
4. views/themes (full-page demos)

Each layer provides building blocks for the next one. Keep business logic and data flow in domain/app layers while keeping ui partials as generic as possible.

## Theme Routes

Theme demos are grouped under views/themes and served via src/routes/themes/.

- views/themes/landing
- views/themes/blog
- views/themes/modem

This structure enables different product experiences on top of the same component foundation.

## Development Principles

- Use `res.render()` to pass all data as locals — never inline data inside views.
- Prefer `<%= value %>` (escaped) over `<%- value %>` (raw) for user-facing output.
- Follow the design token approach for styling via CSS variables.
- Use Font Awesome via CDN as the icon source.
- Build templates with accessibility in mind (semantic HTML, ARIA, focus states).

## Adding a New Theme

1. Create views: `views/themes/<vertical>/index.ejs` (and any sub-pages).
2. Create data file: `src/data/<vertical>.data.ts` with all static sample data.
3. Create route file: `src/routes/themes/<vertical>.ts`.
4. Register the router in `src/routes/themes.ts`.
5. Register metadata in `src/data/showcase.ts`.

## Code Quality

Run lint (if configured):

```bash
npm run lint
```

For larger changes, a production build is recommended:

```bash
npm run build
```

## Contributing

Everyone can contribute as long as the project architecture and development order are followed.

### Who Can Contribute?

Everyone is welcome as long as the project conventions and layer order are followed.

### Development Order (Required)

Please follow this order when building or extending features:

1. modules/ui
2. modules/app
3. modules/domain
4. views/themes

Keep lower layers generic and reusable. Put domain-specific and theme-specific logic in the proper upper layers.

### Contribution Rules

1. Follow the architecture and naming conventions documented in AGENTS.md.
2. Keep changes scoped and focused.
3. Use existing utilities and patterns (for example, `cn` from modules/ui where applicable).
4. Prefer composition (EJS includes/partials) over duplication.
5. Keep accessibility in mind (semantic HTML, focus states, ARIA where needed).

### Before Opening a PR

1. Run `npm run build` to verify the TypeScript and CSS compile cleanly.
2. Make sure your changes do not break existing theme pages.
3. If you add a new theme, register it in `src/data/showcase.ts`.
4. If you add a reusable partial, place it in the correct layer (`modules/ui`, `modules/app`, or `views/partials`).

### Pull Request Notes

1. Use a clear title and short summary.
2. Explain what changed and why.
3. Add screenshots or short videos for visible UI changes.

### Credit

Credit is not required, but it is appreciated.
If this project helps you, a small mention such as "Built with EJS Components Showcase" makes the maintainer happy.

## License

This project is licensed under 0BSD.

See LICENSE for details.