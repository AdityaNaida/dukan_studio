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

---

# Product brief — Dukaan Studio

> The sections below describe the product being built. Where the brief's tech
> stack (React 18 + Vite + Supabase) conflicts with this repo, the repo wins:
> the implementation here is Next.js 16 App Router + Tailwind v4, as described
> above. Everything else — mission, constraints, judging rubric, copy, failure
> modes, definition of done — applies as written.

## 1. Mission

**Dukaan Studio tells a seller whether their product photo is good enough to post.**

An Indian shopkeeper or D2C seller uploads a product photo. An agent inspects
it and answers two questions: (1) is the product perfectly captured — focus,
lighting, framing, background, whether the product is fully visible — and
(2) would this image work as a social media post? It returns a clear verdict
and a social-media score with specific reasons and what to fix — in under
20 seconds, for about ₹2.

Built for the **Build with Google AI Hackathon**, AI Day for Startups India
2026, Kolkata (IIM Calcutta, 31 July 2026).

### Why it wins

A product shoot costs an Indian MSME ₹15,000 and takes a week. There are
63 million MSMEs. They post blurry photos and lose to brands with budgets.
This collapses that to seconds and rupees.

## 2. Hard constraints — do not violate

| Constraint | Detail |
|---|---|
| **Time** | ~2 hours total. Ship over polish, always. |
| **Judged by link** | Deliverable is a **public URL**. Judges click it, possibly without us present. The page must sell itself. |
| **Must deploy on Google Cloud** | Cloud Run. Non-negotiable — it's in the brief. |
| **Must visibly use Google AI stack** | Gemini API + Nano Banana. Name them on the page. |
| **No login, no signup, no onboarding** | A judge has 40 seconds. |

### Ship gates

Deploy to Cloud Run by the **50-minute mark** with whatever works. A live ugly
link beats a beautiful localhost. Every milestone ends in a deploy.

## 3. Judging rubric (the event's own four pillars)

Hit three cleanly. Do not attempt the fourth.

- ✅ **Agentic** — the model *plans* which assets the product needs and returns
  an `assets_needed` array we branch on. This is not a fixed chain. Say so.
- ✅ **Multimodal** — image in; image + multilingual text out.
- ✅ **Sovereign** — Bengali and Hindi output, Indian festival and pricing
  context. Built for a market foreign tools ignore.
- ❌ **Physical / Edge AI** — skip. Three landed beats four half-done.

## 4. Tech stack (original hackathon plan — see note at top)

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase Edge Function (Deno) — holds the API key, calls Gemini
- **Storage:** Supabase Storage, public bucket `creations`
- **Database:** Supabase Postgres — one table, powers the live gallery
- **Hosting:** Google Cloud Run (`asia-south1`)

### Why Supabase behind a GCP frontend

The API key must never reach the browser.

<!-- NOTE: ~154 lines of the original brief (sections ~5–10, incl. milestones
     M0–M1) were collapsed in the source paste and are not reproduced here. -->

**M2 — 0:50–1:10 · Defensive layer**
Three sample products. Cached gallery from the `creations` table. Progressive
loading states. Error states that explain and offer a retry. Redeploy.

**M3 — 1:10–1:35 · Design pass**
Palette, type, the shutter reveal, mobile layout, pitch copy on page. Redeploy.

**M4 — 1:35–1:50 · Break it on purpose**
Test on a phone, in incognito, on mobile data. Try four objects: bottle,
biscuit packet, lanyard, shoe. Try a photo of a person, a blank wall, a
screenshot. Nothing may crash. Fix, redeploy.

**M5 — 1:50–2:00 · Submit the link.** Then keep polishing.

## 11. Environment

```bash
# Cloud Run (frontend)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Supabase Edge Function secrets — NEVER in the frontend
GEMINI_API_KEY=
```

```bash
supabase functions deploy generate --no-verify-jwt
supabase secrets set GEMINI_API_KEY=xxx

npm run build
gcloud run deploy dukaan-studio --source . --region asia-south1 --allow-unauthenticated
```

Multi-stage Dockerfile: `node:20-alpine` build → `nginx:alpine` serve `/dist`,
listening on `$PORT` (Cloud Run sets it; default nginx port 80 will fail).

## 12. Non-goals

No auth. No user accounts. No payments. No admin panel. No dark mode toggle.
No i18n framework — the three languages come from the model, not from locale
files. No tests. No CI. No Redux or state library — `useState` is enough.
No routing — it is one page.

If a feature is not on the judge's 40-second path, it does not get built.

## 13. Failure modes and fallbacks

| Failure | Response |
|---|---|
| Gemini returns fenced JSON | Strip fences, retry parse, else generic plan |
| Image model returns no image | Show the copy anyway, surface a retry button |
| Quota exhausted | Samples + cached gallery still render — page looks complete |
| Cloud Run cold start | Keep the bundle small; hero renders before any API call |
| Venue wifi dies during demo | One full result saved to camera roll as backup |

**Rule: no failure may produce a blank screen or a spinner that never ends.**

## 14. Definition of done

- [ ] Public Cloud Run URL, loads in under 3s on mobile data
- [ ] Judge can see a full result without uploading anything
- [ ] Upload → capture-quality verdict + social media rating works end to end
- [ ] Bengali and Hindi render as script, not boxes
- [ ] Gallery renders with zero API calls
- [ ] Google AI stack named on the page
- [ ] Nothing crashes on a weird photo
- [ ] Works at 380px width
