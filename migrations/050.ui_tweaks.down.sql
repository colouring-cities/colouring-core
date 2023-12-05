ALTER TABLE buildings DROP COLUMN IF EXISTS location_residential_name_link;
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_breeam_rating_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_breeam_rating_source_link;
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_energy_rating_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_energy_rating_source_link;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_listed;

ALTER TABLE buildings DROP COLUMN IF EXISTS building_client;
ALTER TABLE buildings DROP COLUMN IF EXISTS building_client_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS building_client_source_link;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_client;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_client_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS extension_client_source_link;