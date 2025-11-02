# Audiophile — Build Project

Professional, responsive e-commerce frontend inspired by the "Build Audiophile" Figma design.

This repository contains a Vite + React (TypeScript) front-end implementation of the Audiophile storefront used for UI/build exercises.



Key features
- Responsive product listing and detail pages
- Cart context and UI components (modal, items, totals)
- Checkout and order confirmation pages
- Reusable UI primitives (Radix + utility components)

Tech stack
- Vite
- React 18
- TypeScript
- Tailwind CSS (utility classes used throughout)
- Radix UI primitives and small helper libraries

Prerequisites
- Node.js (>=18) and npm installed

Quick start
1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

Project scripts
- `npm run dev` — start Vite dev server
- `npm run build` — perform production build (Vite)

Notes about this repository
- Many UI components wrap Radix primitives and use utility classes; the codebase is organized under `src/components`.
- The app entrypoint is `src/main.tsx` and the top-level app is `src/App.tsx`.
- A minimal `tsconfig.json` is included to enable TypeScript checks for development.

Repository structure (important files)
- `index.html` — Vite entry
- `package.json` — npm scripts and dependencies
- `src/main.tsx` — app bootstrap
- `src/App.tsx` — application routes and layout
- `src/components` — UI components, pages and layout
- `src/contexts/CartContext.tsx` — cart state and helpers
- `src/lib/utils.ts` — utility helpers (formatting, price)

Contributing
- Feel free to open issues and PRs. For code changes, keep them small and focused.
- Run the dev server and ensure the UI builds without TypeScript errors before submitting changes.

Troubleshooting
- If TypeScript reports missing types for React, install the types with:

```bash
npm i -D @types/react @types/react-dom
```

- If you see errors about imports containing version suffixes (e.g. `@radix-ui/react-dialog@1.1.6`), the import path should be the package name without the `@<version>` suffix. Imports in `src/components/ui/` have been normalized.

License
- This repository is provided as-is for learning and reference. Check LICENSE or upstream project terms if you plan to reuse assets.

Contact
- Repository: Socheema/audiophile



