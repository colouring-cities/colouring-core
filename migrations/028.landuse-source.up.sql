ALTER TABLE buildings ADD COLUMN IF NOT EXISTS current_landuse_source varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_current_landuse_source_len CHECK (length(current_landuse_source) < 150);

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS current_landuse_source_detail varchar;
ALTER TABLE buildings ADD CONSTRAINT current_landuse_source_detail_len CHECK (length(current_landuse_source_detail) < 500);

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS current_landuse_link text[];

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS current_landuse_verified BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE buildings as b
SET current_landuse_verified = TRUE
FROM building_verification as v
WHERE b.building_id = v.building_id
AND v.attribute = 'current_landuse_group';