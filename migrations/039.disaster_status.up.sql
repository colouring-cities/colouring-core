ALTER TABLE buildings ADD COLUMN IF NOT EXISTS disaster_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS disaster_severity text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS disaster_assessment_method text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS disaster_source_link text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS disaster_start_date date;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS disaster_end_date date;