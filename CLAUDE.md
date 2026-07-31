# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server at http://localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint (flat config; `eslint-config-next` core-web-vitals + typescript)

There is no test setup in this project.

## Next.js version caveat

This project uses **Next.js 16.2.12** with **React 19**, which is newer than your training data. Per AGENTS.md, consult the bundled docs before writing framework code — they are the source of truth for this version:

- `node_modules/next/dist/docs/01-app/01-getting-started/` — core App Router concepts
- `node_modules/next/dist/docs/01-app/02-guides/` — use-case guides
- `node_modules/next/dist/docs/01-app/03-api-reference/` — API reference (components, functions, config)

## Architecture

App Router project (no `pages/` directory). All routes live in `app/`; `app/layout.tsx` is the root layout, which loads the Geist fonts via `next/font/google` and exposes them as the CSS variables `--font-geist-sans` / `--font-geist-mono`.

Styling is **Tailwind CSS v4**: there is no `tailwind.config.*` file. Tailwind is wired through the `@tailwindcss/postcss` plugin (`postcss.config.mjs`), and theme tokens are defined in CSS in `app/globals.css` via `@theme inline` (colors and fonts map to CSS variables, with dark mode handled by a `prefers-color-scheme` media query).

TypeScript is strict; the `@/*` path alias maps to the repository root.
