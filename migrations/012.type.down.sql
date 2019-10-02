-- Building attachment, ENUM: Detached, Semi-detached, End-Terrace, Mid-Terrace
ALTER TABLE buildings DROP COLUMN IF EXISTS building_attachment_form;

-- [Disabled for launch] Date of change of use
-- This needs to pair with demolition 
ALTER TABLE buildings DROP COLUMN IF EXISTS date_change_building_use;

DROP TYPE IF EXISTS building_attachment_form;
