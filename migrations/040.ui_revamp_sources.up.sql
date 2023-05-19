ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_address_source text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_address_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_coordinates_source text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_coordinates_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS is_domestic_source text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS is_domestic_links text[];