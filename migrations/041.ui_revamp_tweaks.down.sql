ALTER TABLE buildings DROP COLUMN IF EXISTS location_name_link;
ALTER TABLE buildings DROP COLUMN IF EXISTS location_alternative_footprint_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS age_historical_raster_map_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS age_historical_vectorised_footprint_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS landowner_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS designers_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS builder_links;
ALTER TABLE buildings DROP COLUMN IF EXISTS developer_links;