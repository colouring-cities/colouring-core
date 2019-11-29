--Landuse is hierachical. Highest level is Order (ie. Residential) then Group (ie Residential-Dwelling) then Class (ie Residential-Dwelling-Detached house)
--Interface will collected most detailed (class) but visualise highest level (order)
--Landuse is a table as #358

-- Land use is table with 3 levels of hierachy (highest to lowest). order > group > class
DROP TABLE IF EXISTS landuse_classifications;

-- Land use class or classes, array object, client constrained.
ALTER TABLE buildings DROP COLUMN IF EXISTS current_landuse_class;

-- Land use order, singular. Client and db constrained.
ALTER TABLE buildings DROP COLUMN IF EXISTS current_landuse_order;

--Land use class, group and order will be stored in a new table
DROP TABLE building_landuse IF EXISTS CASCADE;

--===========================================
--
-- We also collect original landuse, structure & process is as current land use
-- We don't currently collect intermediate historic uses
--
--===========================================

-- Original Land use class or classes, array object, client constrained.
ALTER TABLE buildings DROP COLUMN IF EXISTS original_landuse_class;

-- Land use order, singular. Client and db constrained.
ALTER TABLE buildings DROP COLUMN IF EXISTS original_landuse_order;
