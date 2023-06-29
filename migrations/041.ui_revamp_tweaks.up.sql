ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_name_link text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_alternative_footprint_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS age_historical_raster_map_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS age_historical_vectorised_footprint_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS landowner_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS designers_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS builder_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS developer_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS energy_solar boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS energy_solar_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS energy_solar_source_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS energy_green_roof boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS energy_green_roof_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS energy_green_roof_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_crowdsourced_site_completion_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_crowdsourced_site_completion_source_links text[];
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_missing_data boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_missing_data_links text[];