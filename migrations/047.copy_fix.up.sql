ALTER TABLE buildings ADD COLUMN IF NOT EXISTS developer_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS designer_source_type text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS community_public_ownership_source_type text;


ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_flood_zone boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_housing_zone boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_enterprise_zone boolean;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS planning_protected_vista boolean;
