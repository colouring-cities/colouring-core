ALTER TABLE buildings DROP COLUMN IF EXISTS disaster_start_date;
ALTER TABLE buildings DROP COLUMN IF EXISTS disaster_end_date;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS disaster_start_date text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS disaster_end_date text;