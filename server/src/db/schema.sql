-- Our own tables. The login tables (user, session, account, verification)
-- are created by Better Auth – see "npm run db:auth".

-- Membership plans people can sign up for
CREATE TABLE IF NOT EXISTS memberships (
  id         TEXT PRIMARY KEY,          -- short code, e.g. 'monthly'
  name       TEXT NOT NULL,
  blurb      TEXT NOT NULL,
  price      INTEGER NOT NULL CHECK (price >= 0),  -- whole dollars
  period     TEXT NOT NULL,             -- 'month', 'quarter' or 'year'
  sort_order INTEGER NOT NULL DEFAULT 0 -- order to show them on the page
);

-- Classes on the timetable
CREATE TABLE IF NOT EXISTS classes (
  id               SERIAL PRIMARY KEY,  -- auto-numbered 1, 2, 3...
  name             TEXT NOT NULL,
  category         TEXT NOT NULL,       -- 'Mind & Body', 'Cardio', 'Strength'
  trainer          TEXT NOT NULL,
  start_time       TIME NOT NULL,       -- e.g. 19:00
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  max_spots        INTEGER NOT NULL CHECK (max_spots > 0),
  image            TEXT NOT NULL,       -- path to a picture in client/public
  description      TEXT NOT NULL
);
