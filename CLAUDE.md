# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a static Next.js portfolio site deployed on Vercel. All code lives in `/frontend`.

- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + HeroUI

Vercel handles deployment, TLS, and CDN automatically via its Git integration (push to `main` → auto-deploy).

## Common Commands

### Frontend (Next.js)
```bash
cd frontend
npm run dev    # http://localhost:3000
npm run build
npm run lint
```

## Deployment

Vercel is linked to this repo with **Root Directory set to `frontend/`**. Every push to `main` triggers an automatic deploy. No manual steps needed.

## Frontend Structure

Uses Next.js App Router. Pages live in `frontend/app/`:
- `/` — homepage (hero + about)
- `/experience`, `/education`, `/projects` — static content pages

Components live in `frontend/components/`.
