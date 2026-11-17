# OCD Saraswati Puja — Vercel JSON demo

## Deploy
1. Upload this project folder to GitHub (or import the folder through Vercel CLI).
2. In Vercel, **New Project → Import**, choose the repository and select `ocd-saraswati-demo` as Root Directory if applicable.
3. Framework: Next.js. Build command: `npm run build`. No database or Prisma setup required.
4. Set Environment Variables for Production and Preview:
   - `DEMO_SITE_PASSWORD` = a strong, unique password of your choice.
   - `DEMO_SESSION_SECRET` = an independently generated random secret of at least 32 characters (do not reuse the password).
5. Deploy. Open the site and enter the password.

## Data and limitations
- Public content is loaded from `data/demo.json` at build time / server runtime.
- To edit public content, change `data/demo.json` and redeploy.
- **This is a read-only demonstration.** Admin write operations, file uploads, and public form submissions return HTTP 503; nothing is stored.
- Admin dashboard is demonstration-only and uses the same shared site password. Do not put private donor or financial data into the JSON file.
- Sample donor and finance records are illustrative, not real accounting figures.
- For real forms, CMS editing, donations and financial operations, add a persistent managed database and proper individual admin authentication.
- The password screen is a preview gate, not production-grade user authentication; avoid confidential content in the deployed source or static assets.

## Local test
`npm install` then `npm run build` and `npm run dev` with `.env.local` populated from `.env.example`.
