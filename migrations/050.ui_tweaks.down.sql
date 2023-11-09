ALTER TABLE buildings DROP COLUMN IF EXISTS location_residential_name_link;
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_breeam_rating_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_breeam_rating_source_link;
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_energy_rating_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_energy_rating_source_link;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_listed;