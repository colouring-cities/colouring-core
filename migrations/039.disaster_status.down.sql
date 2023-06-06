ALTER TABLE buildings DROP COLUMN IF EXISTS disaster_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS disaster_severity;
ALTER TABLE buildings DROP COLUMN IF EXISTS disaster_assessment_method;
ALTER TABLE buildings DROP COLUMN IF EXISTS disaster_source_link;
ALTER TABLE buildings DROP COLUMN IF EXISTS disaster_start_date;
ALTER TABLE buildings DROP COLUMN IF EXISTS disaster_end_date;