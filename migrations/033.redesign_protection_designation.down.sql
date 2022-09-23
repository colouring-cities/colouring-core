--into a single link from array of links
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_nhle_link text[];

--changed into URL
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_apa_url;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_apa boolean DEFAULT FALSE;

ALTER TABLE buildings DROP COLUMN IF EXISTS planning_world_list_url;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_world_list_id int DEFAULT NULL;

ALTER TABLE buildings DROP COLUMN IF EXISTS planning_heritage_at_risk_url;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_heritage_at_risk_id int DEFAULT NULL;

ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_conservation_area_url;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_conservation_area boolean DEFAULT FALSE;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_glher boolean DEFAULT FALSE;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_apa_name VARCHAR DEFAULT '';
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_apa_tier smallint DEFAULT NULL;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_local_list boolean DEFAULT FALSE;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_historic_area_assessment boolean DEFAULT FALSE;

