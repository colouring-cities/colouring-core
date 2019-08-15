ALTER TABLE users ADD COLUMN IF NOT EXISTS is_deleted boolean NOT NULL DEFAULT(false);
ALTER TABLE users ADD COLUMN IF NOT EXISTS deleted_on timestamp NULL;

ALTER TABLE users DROP CONSTRAINT IF EXISTS users_username_key;
CREATE UNIQUE INDEX users_username_idx ON users (username) WHERE NOT is_deleted;