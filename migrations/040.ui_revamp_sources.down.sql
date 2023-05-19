ALTER TABLE buildings DROP COLUMN IF EXISTS location_address_source;
ALTER TABLE buildings DROP COLUMN IF EXISTS location_address_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS location_coordinates_source;
ALTER TABLE buildings DROP COLUMN IF EXISTS location_coordinates_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS is_domestic_source;
ALTER TABLE buildings DROP COLUMN IF EXISTS is_domestic_links;