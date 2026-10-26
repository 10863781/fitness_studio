# Milano Fitness Studio

Fitness studio site: a React + Tailwind frontend, a Node.js + Express API,
a Postgres database (Neon) and real accounts with Better Auth.

## Folder structure

```
client/                 React + Vite + Tailwind frontend (what the visitor sees)
  src/components/       UI sections (Header, ClassGrid, Register, SignInForm…)
  src/lib/useApi.js     fetches JSON from our API with loading / error state
  src/lib/auth-client.js  Better Auth browser client (signUp, signIn, signOut, useSession)
  vite.config.js        dev proxy: /api -> http://localhost:3000
  vercel.json           live proxy: /api -> the Railway server

server/                 Express API
  src/index.js          starts the server and mounts every route
  src/auth.js           Better Auth setup (email + password, 7-day sessions)
  src/routes/           /api/classes and /api/memberships
  src/db/pool.js        one shared connection pool to Postgres
  src/db/schema.sql     our tables
  src/db/seed-data.js   the data that used to be hardcoded in React
  src/db/seed.js        copies seed-data.js into the database
  src/db/auth-migrate.js  creates Better Auth's tables
  .env.example          template for the secrets file (.env is never committed)
```

## How a request flows

```
Browser ──/api/...──▶ Vite (dev) or Vercel (live) ──proxy──▶ Express ──SQL──▶ Neon Postgres
```

The browser only ever talks to **one address** (localhost:5173 or the Vercel URL).
Vite or Vercel forwards `/api/...` to Express. To the browser, the API is on the same
site, so the login cookie is a normal first-party cookie: no CORS setup is needed,
and the session survives a page refresh.

## Database schema (in plain English)

| Table | What one row is | Key columns |
|-------|-----------------|-------------|
| `memberships` | A plan you can buy | `id` ('monthly'), `name`, `blurb`, `price` in dollars, `period`, `sort_order` |
| `classes` | A class on the timetable | `id`, `name`, `category`, `trainer`, `start_time`, `duration_minutes`, `max_spots`, `image`, `description` |
| `user` *(Better Auth)* | A person with an account | `id`, `name`, `email` (unique), `plan` (which membership they chose) |
| `account` *(Better Auth)* | How a user logs in | `userId` → user, `providerId` ('credential'), `password` (**hashed**, never plain text) |
| `session` *(Better Auth)* | One signed-in browser | `token` (stored in the cookie), `userId` → user, `expiresAt` |
| `verification` *(Better Auth)* | Short-lived codes (e.g. password reset) | `identifier`, `value`, `expiresAt` |

One user can have many sessions (phone and laptop both signed in). Signing out
deletes that session row, so the cookie stops working.

## API

| Method | URL | Returns |
|--------|-----|---------|
| GET | `/api/health` | `{ "status": "ok" }` |
| GET | `/api/classes` | every class (`?category=Cardio` to filter) |
| GET | `/api/classes/:id` | one class, or 404 |
| GET | `/api/memberships` | every plan |
| GET | `/api/me` | the signed-in user, or 401 |
| POST | `/api/auth/sign-up/email` | creates an account and signs in (Better Auth) |
| POST | `/api/auth/sign-in/email` | signs in (Better Auth) |
| POST | `/api/auth/sign-out` | signs out (Better Auth) |
| GET | `/api/auth/get-session` | current session (Better Auth) |

## Run locally

1. Create a free Postgres database at [neon.com](https://neon.com) and copy its connection string.
2. Set up the server:

   ```bash
   cd server
   npm install
   cp .env.example .env      # then paste DATABASE_URL and a random BETTER_AUTH_SECRET
   npm run db:setup          # creates auth tables + our tables, then seeds data
   npm run dev               # API on http://localhost:3000
   ```

3. In a second terminal:

   ```bash
   cd client
   npm install
   npm run dev               # site on http://localhost:5173
   ```

## Deploy

**Backend on Railway**

1. New Project → Deploy from GitHub repo → pick this repo.
2. Service Settings → **Root Directory** = `server`. Railway runs `npm install` and `npm start`.
3. Variables: `DATABASE_URL` (Neon), `BETTER_AUTH_SECRET` (a new random string),
   `BETTER_AUTH_URL` = your Vercel URL, e.g. `https://milano-fitness.vercel.app` (no trailing slash).
4. Settings → Networking → **Generate Domain**. Check `https://<that-domain>/api/health`.

**Frontend on Vercel**

1. In `client/vercel.json`, replace `YOUR-RAILWAY-APP.up.railway.app` with the Railway domain and push.
2. New Project → import this repo → **Root Directory** = `client` (Vite is detected automatically).
3. Deploy, then open the Vercel URL. If it isn't the one you put in `BETTER_AUTH_URL`, update that variable on Railway.

The database tables only need creating once: running `npm run db:setup` locally
with the Neon `DATABASE_URL` sets up the same database that Railway uses.

Our own tables use `snake_case` column names; Better Auth's tables use `camelCase`
(its default). The API renames ours to camelCase (e.g. `start_time AS "startTime"`) so
the React code sees one style.
