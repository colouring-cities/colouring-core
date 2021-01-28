-- Remove team fields, update in paralell with adding new fields
-- Award or awards (may be multiple) stored as json b object
ALTER TABLE buildings DROP COLUMN IF EXISTS team_awards;
