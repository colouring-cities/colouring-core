-- -- Remove community fields

-- -- Ownership type, enumerate type from:
-- ALTER TABLE buildings DROP COLUMN IF EXISTS ownership_type;

-- -- Ownerhsip perception, would you describe this as a community asset?
-- -- Boolean yes / no
-- ALTER TABLE buildings DROP COLUMN IF EXISTS ownership_perception;

-- -- Historic ownership type / perception
-- -- Has this building ever been used for community or public services activities?
-- -- Boolean yes / no
-- ALTER TABLE buildings DROP COLUMN IF EXISTS ownership_historic;

ALTER TABLE building_user_attributes
DROP COLUMN IF EXISTS community_type_worth_keeping;

ALTER TABLE building_user_attributes
DROP COLUMN IF EXISTS community_type_worth_keeping_reasons;

ALTER TABLE building_user_attributes
DROP COLUMN IF EXISTS community_local_significance;

ALTER TABLE buildings
DROP COLUMN IF EXISTS community_local_significance_total;

ALTER TABLE buildings
DROP COLUMN IF EXISTS community_activities;

ALTER TABLE buildings
DROP COLUMN IF EXISTS community_public_ownership;

DROP TYPE IF EXISTS public_ownership_type;

ALTER TABLE buildings
DROP COLUMN IF EXISTS community_public_ownership_sources;

