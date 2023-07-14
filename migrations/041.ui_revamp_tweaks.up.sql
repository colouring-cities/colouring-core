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

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS date_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS date_source_links text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_heritage_at_risk boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_world_heritage_site boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_local_list boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_conservation_area boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_in_apa boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_historic_area_assessment boolean;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_scientific_interest boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_scientific_interest_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_scientific_interest_source_links text[];
