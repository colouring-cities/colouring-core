--Landuse is hierachical. Highest level is Order (ie. Residential) then Group (ie Residential-Dwelling) then Class (ie Residential-Dwelling-Detached house)
--Interface will collected most detailed (class) but visualise highest level (order)
--Landuse is a table as #358
--Land use class, group and order will be stored in a new table
DROP TABLE IF EXISTS reference_tables.buildings_landuse_order CASCADE;
DROP TABLE IF EXISTS reference_tables.buildings_landuse_group CASCADE;
DROP TABLE IF EXISTS reference_tables.buildings_landuse_class CASCADE;

-- Land use class or classes, array object, client constrained.
ALTER TABLE buildings DROP COLUMN IF EXISTS current_landuse_class;

ALTER TABLE buildings DROP COLUMN IF EXISTS current_landuse_group;

-- Land use order, singular. Client and db constrained.
ALTER TABLE buildings DROP COLUMN IF EXISTS current_landuse_order;
