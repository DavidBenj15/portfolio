# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a full-stack portfolio app with three distinct layers:
- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + HeroUI — lives in `/frontend`
- **Backend**: Flask + Peewee ORM — lives in `/app`
- **Database**: MariaDB, accessed only by the backend

In production, Caddy (configured in `Caddyfile`) proxies `/api/*` to Flask (port 5000) and everything else to Next.js (port 3000), and handles TLS automatically via Let's Encrypt. Docker Compose wires all three services together.

## Common Commands

### Backend (Flask)
```bash
python -m venv python3-virtualenv
source python3-virtualenv/bin/activate
pip install -r app/requirements.txt

export FLASK_ENV=development
flask run  # http://127.0.0.1:5000
```

### Frontend (Next.js)
```bash
cd frontend
npm run dev    # http://localhost:3000
npm run build
npm run lint
```

### Tests
```bash
./run_test.sh  # runs unittest discovery against /tests
```

Tests require the backend to be importable (activating the venv first). Frontend tests (`FrontendTestCase`) are skipped automatically if the Next.js dev server isn't running.

### Docker
```bash
cp example.env .env  # fill in values first
docker-compose up                                    # dev (hot reload)
docker-compose -f docker-compose.prod.yml up -d     # prod (pre-built images)
./redeploy-site.sh                                   # pull and restart prod
```

## Environment Variables

Copy `example.env` to `.env`. Key vars:
- `URL` — backend URL (default: `localhost:5000`)
- `FRONTEND_URL` — Next.js URL (default: `http://localhost:3000`)
- `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_ROOT_PASSWORD`

## Backend API

Three endpoints in `app/__init__.py`:
- `POST /api/timeline_post` — create post (fields: `name`, `email`, `content`)
- `GET /api/timeline_post` — list all posts
- `DELETE /api/timeline_post/<id>` — delete by ID

The `TESTING=true` env var switches the backend to use a local SQLite DB instead of MySQL (used by the test suite).

## Frontend Structure

Uses Next.js App Router. Pages live in `frontend/src/app/`:
- `/` — homepage (hero + about)
- `/timeline` — timeline posts (fetches from backend via `useTimeline` hook)
- `/experience`, `/education`, `/projects` — static content pages

API calls to the backend are centralized in `frontend/src/app/api/timeline.ts`. Components live in `frontend/src/components/`.

## CI/CD

Two GitHub Actions workflows:
- **`test.yml`** — runs on push/PR to main: sets up Python env and runs `./run_test.sh`
- **`deploy.yml`** — triggers after tests pass: builds Docker images, pushes to GHCR, SSHs into the VPS and runs `docker-compose -f docker-compose.prod.yml`
