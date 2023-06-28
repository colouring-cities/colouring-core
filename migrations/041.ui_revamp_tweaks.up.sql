ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_name_link text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_alternative_footprint_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS age_historical_raster_map_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS age_historical_vectorised_footprint_links text[];