DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS wineries;
DROP TABLE IF EXISTS reviews;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
  is_admin boolean NOT NULL DEFAULT false
);

CREATE TABLE wineries (
  id serial PRIMARY KEY,
  name text NOT NULL,
  address text NOT NULL,
  is_approved boolean NOT NULL DEFAULT false,
  photo text
);

CREATE TABLE reviews (
  id serial PRIMARY KEY,
  venue integer NOT NULL,
  variety integer NOT NULL,
  pricing integer NOT NULL,
  staff integer NOT NULL,
  overall integer NOT NULL,
  review_text text,
  date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  winery_id integer NOT NULL REFERENCES wineries(id) ON DELETE CASCADE
)
