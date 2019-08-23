CREATE TABLE IF NOT EXISTS user_password_reset_tokens (
    token uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid,
    expires_on timestamp NOT NULL,
    used boolean NOT NULL DEFAULT false
)