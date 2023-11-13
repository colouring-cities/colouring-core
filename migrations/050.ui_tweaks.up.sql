ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_residential_name_link text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_breeam_rating_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_breeam_rating_source_link text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_energy_rating_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_energy_rating_source_link text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_listed boolean;