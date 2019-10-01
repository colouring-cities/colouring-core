DROP TABLE IF EXISTS bulk_extracts;

-- convert all existing timestamp columns to timestamptz assuming UTC
ALTER TABLE logs ALTER log_timestamp TYPE timestamp;
ALTER TABLE users
    ALTER registered TYPE timestamp,
    ALTER deleted_on TYPE timestamp;
ALTER TABLE user_password_reset_tokens ALTER expires_on TYPE timestamp;