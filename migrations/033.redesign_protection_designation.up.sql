-- this type of links is expected:
-- 'https://historicengland.org.uk/listing/the-list/list-entry/1080446?section=official-list-entry'

UPDATE buildings
SET planning_nhle_link = CONCAT('https://historicengland.org.uk/listing/the-list/list-entry/', planning_list_id, 
'?section=official-list-entry')
WHERE planning_nhle_link = ''
AND planning_list_id IS NOT NULL;


UPDATE buildings
SET planning_local_list_url = 'identified as listed: please replace with link'
WHERE planning_local_list_url = ''
AND planning_in_local_list;

--into a single link from array of links
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_nhle_link;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_nhle_link VARCHAR DEFAULT '';

--changed into URL
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_apa;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_apa_url VARCHAR DEFAULT '';

ALTER TABLE buildings DROP COLUMN IF EXISTS planning_world_list_id;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_world_list_url VARCHAR DEFAULT '';

ALTER TABLE buildings DROP COLUMN IF EXISTS planning_heritage_at_risk_id;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_heritage_at_risk_url VARCHAR DEFAULT '';

ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_conservation_area;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_conservation_area_url VARCHAR DEFAULT '';    

-- URL column exists already
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_list_id;

--fully removed
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_glher;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_apa_name;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_apa_tier;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_local_list;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_historic_area_assessment;
