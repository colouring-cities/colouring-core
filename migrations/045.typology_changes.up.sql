ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_original_use_order text;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS typology_original_use_verified BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE buildings as b
SET typology_original_use_verified = TRUE
FROM building_verification as v
WHERE b.building_id = v.building_id
AND v.attribute = 'current_landuse_group';