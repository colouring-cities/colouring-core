ALTER TABLE buildings DROP COLUMN IF EXISTS developer_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS designer_source_type;
ALTER TABLE buildings DROP COLUMN IF EXISTS community_public_ownership_source_type;

ALTER TABLE buildings DROP COLUMN IF EXISTS planning_flood_zone;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_housing_zone;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_enterprise_zone;
ALTER TABLE buildings DROP COLUMN IF EXISTS planning_protected_vista;