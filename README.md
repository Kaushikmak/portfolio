# Kaushik Portfolio (Next.js + Convex)

This repository contains the migrated portfolio site built with Next.js App Router and Convex.

## What changed from the old portfolio

- The old static site files are preserved in `old_portfolio/`.
- The new active app lives in `src/app/`.
- Dynamic sections such as projects and learning logs are now served from Convex.

## Tech stack

- Next.js `16`
- React `19`
- TypeScript
- Convex (database + backend functions)

## Routes

- `/` - home (profile, skills, projects preview, life log)
- `/projects` - complete projects listing
- `/learning` - learning/life log feed
- `/hobbies` - hobbies page
- `/gym` - gym log page
- `/cooking` - cooking/recipes page

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start Next.js dev server:

```bash
npm run dev
```

3. In another terminal, run Convex dev:

```bash
npx convex dev
```

4. Open `http://localhost:3000`

## Convex setup notes

- This project expects `NEXT_PUBLIC_CONVEX_URL` and `CONVEX_DEPLOYMENT` in `.env.local`.
- Schema is defined in `convex/schema.ts`.
- Read queries are in `convex/queries.ts`.
- Seed data is in `convex/seed.ts`.

## Build and run

```bash
npm run build
npm run start
```

## Deployment

Recommended deployment target is Vercel for the Next.js app, with Convex as the backend.
