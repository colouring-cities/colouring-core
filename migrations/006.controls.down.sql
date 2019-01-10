-- Remove planning and controls fields

-- Planning Portal
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_portal_link;

-- Conservation area
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_conservation_area;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_conservation_area_name;

-- Listed
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_list;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_list_id;

-- List category
DROP TYPE IF EXISTS planning_list_cat;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_list_cat;

-- Listing grade
DROP TYPE IF EXISTS planning_list_grade;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_list_grade;

-- Heritage at risk
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_heritage_at_risk_id;

-- World Heritage
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_world_list_id;

-- GLHER
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_glher;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_glher_url;

-- Archaeological Priority Area
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_apa;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_apa_name;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_apa_tier;

-- Locally listed
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_local_list;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_local_list_url;

-- Historic Area Assessment
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_historic_area_assessment;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_historic_area_assessment_url;
