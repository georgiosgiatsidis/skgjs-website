# Repository Guidelines

## Project Structure & Module Organization

- Next.js App Router pages in `app/` (`events/`, `events/[slug]/`, `community/`, `about-us/`, `contact/`), plus `sitemap.ts` and `robots.ts`.
- React components in `components/` grouped by area (`ui/`, `layout/`, `animations/`, `events/`, `community/`, `contact/`, `home/`); hooks in `hooks/`.
- Content lives in markdown under `content/`: `events/`, `community/organizers/`, `community/speakers/`, `partners/`, and `site-config.md`.
- Content loading in `lib/content.ts` (gray-matter via `lib/markdown.ts`), Zod schemas in `lib/schemas.ts`, types in `lib/types.ts`, Backblaze B2 helpers (event photos, presentations) in `lib/b2.ts`.
- Static assets in `public/images/`; tests in `tests/unit/` (Vitest) and `tests/e2e/` (Playwright).

## Architecture & Stack

- Next.js 16 static export (`output: 'export'`) deployed to GitHub Pages on push to `main`; React 19, TypeScript 5, Tailwind CSS 3.4, Framer Motion.
- Pages are generated at build time from the markdown content; event upcoming/past status is derived from the event `date` (Europe/Athens).

## Build, Test, and Development Commands

- `npm ci` — install dependencies (same as CI).
- `npm run dev` — development server on http://localhost:3000.
- `npm run build` — static export to `out/`; requires `B2_ACCESS_KEY_ID`, `B2_SECRET_ACCESS_KEY`, `B2_BUCKET_NAME`, and `B2_REGION`.
- `npm test` — Vitest unit tests, including validation of every event file.
- `npm run type-check`, `npm run lint`, `npm run format`.
- `npm run test:e2e` — Playwright suite (starts `npm run dev`).

## Coding Style & Naming Conventions

- Prettier: no semicolons, single quotes, 2-space indent, 100-char lines, Tailwind class sorting.
- Import through the `@/` alias.
- Content files use kebab-case slugs; event files are named `YYYY-MM-DD-slug.md`.

## Content Rules

- Event frontmatter is validated strictly by `EventSchema` (`lib/schemas.ts`); unknown keys and unquoted dates fail. Fix the content rather than loosening the schema.
- Community member frontmatter is validated strictly by `CommunityMemberSchema`; the markdown body (bio) must not be empty.
- Speaker references in events (`talks[].speaker[].path`) must point to an existing file under `content/community/`, otherwise the build fails.

## Skills

Task-specific instructions live in `.claude/skills/<name>/SKILL.md`. Read the matching skill before starting the task:

- `.claude/skills/skgjs-website-add-event/SKILL.md` — adding a new or upcoming event (including new speakers).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
