ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_subdivided BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_num_subdivisions smallint DEFAULT 0;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_subdivisions_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_subdivisions_source_links  text[];
