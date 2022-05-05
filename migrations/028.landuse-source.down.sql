ALTER TABLE buildings DROP COLUMN IF EXISTS current_landuse_source;

ALTER TABLE buildings DROP COLUMN IF EXISTS current_landuse_source_detail;

ALTER TABLE buildings DROP COLUMN IF EXISTS current_landuse_link;

ALTER TABLE buildings DROP COLUMN IF NOT EXISTS current_landuse_verified;
