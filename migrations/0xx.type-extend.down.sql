-- Building original use, collecting both class and order
ALTER TABLE buildings DROP COLUMN IF EXISTS original_landuse_class;

-- [Disabled for launch] Date of change of use
-- This needs to pair with demolition
ALTER TABLE buildings DROP COLUMN IF EXISTS date_change_building_use;


-- Original Land use class or classes, array object, client constrained.
ALTER TABLE buildings DROP COLUMN IF EXISTS original_landuse_class;

-- Land use order, singular. Client and db constrained.
ALTER TABLE buildings DROP COLUMN IF EXISTS original_landuse_order;

-- Land use order, singular. Client and db constrained.
ALTER TABLE buildings DROP COLUMN IF EXISTS original_landuse_source;
