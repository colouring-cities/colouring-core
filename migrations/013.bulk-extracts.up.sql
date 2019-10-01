CREATE TABLE IF NOT EXISTS bulk_extracts (
    extract_id serial PRIMARY KEY,
    extracted_on timestamptz NOT NULL,
    extract_path text NOT NULL
);

-- convert all existing timestamp columns to timestamptz assuming UTC
ALTER TABLE logs ALTER log_timestamp TYPE timestamptz USING log_timestamp AT TIME ZONE 'UTC';
ALTER TABLE users
    ALTER registered TYPE timestamptz USING registered AT TIME ZONE 'UTC',
    ALTER deleted_on TYPE timestamptz USING deleted_on AT TIME ZONE 'UTC';
ALTER TABLE user_password_reset_tokens ALTER expires_on TYPE timestamptz USING expires_on AT TIME ZONE 'UTC';