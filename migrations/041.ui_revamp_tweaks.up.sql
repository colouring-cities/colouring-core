ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_name_link text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_alternative_footprint_links text[];