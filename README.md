# CVEScope

Timeline of publicly disclosed CVEs and security bugs credited to AI assistance.

Live: https://cvescope.vercel.app

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind (dark mode, mobile-first)
- Static curated dataset, no DB
- Edge runtime for the `/api/cves` JSON feed

## Local dev

```
npm install
npm run dev
```

## Adding a CVE

Edit `lib/cves.ts` and add a `CveEntry`. Each entry needs a vendor-side source link with the AI credit line visible. See `app/about/page.tsx` for full inclusion criteria.
