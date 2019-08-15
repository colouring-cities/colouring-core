ALTER TABLE users DROP COLUMN IF EXISTS is_deleted;
ALTER TABLE users DROP COLUMN IF EXISTS deleted_on;

DROP INDEX IF EXISTS users_username_idx;
ALTER TABLE users ADD CONSTRAINT users_username_key UNIQUE (username);