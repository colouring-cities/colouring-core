-- this type of links is expected:
-- 'https://historicengland.org.uk/listing/the-list/list-entry/1080446?section=official-list-entry'

UPDATE buildings
SET planning_local_list_url = 'identified as listed: please replace with link'
WHERE planning_local_list_url = ''
AND planning_in_local_list;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_conservation_area_url VARCHAR DEFAULT '';
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_conservation_area_id VARCHAR DEFAULT '';

UPDATE buildings
SET planning_in_conservation_area_url = 'identified as within conservation area: please replace with link'
WHERE planning_in_conservation_area_url = ''
AND planning_in_conservation_area;

ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_conservation_area;

--no need to store both id and link that can be derived from it
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_nhle_link;

--changed into URL
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_apa;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_apa_url VARCHAR DEFAULT '';

ALTER TABLE buildings DROP COLUMN IF EXISTS planning_heritage_at_risk_id;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_heritage_at_risk_url VARCHAR DEFAULT '';

--fully removed
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_glher;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_apa_name;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_apa_tier;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_local_list;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_in_historic_area_assessment;
