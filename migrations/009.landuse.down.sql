-- Remove planning and controls fields

--Landuse is hierachical. Highest level is Order (Residential) then Group (Residential-Dwelling) then Class (Residential-Dwelling-Detached house)

--Fields could be linked when not mixed use Example: If user inputs class field (Detached-House) on front end then trigger on db automatically will populate group and order. If we go this route then a trigger is needed on the db both to run and remove this process.

-- Land use, single or mutiple classes?
ALTER TABLE buildings DROP COLUMN IF EXISTS landuse_mutiple_use;

-- Land use, how many different uses?
ALTER TABLE buildings DROP COLUMN IF EXISTS landuse_number_of_uses;

--Land use class, group and order will be stored in a new table
DROP TABLE building_landuse IF EXISTS CASCADE;  
