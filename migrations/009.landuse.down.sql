-- Remove planning and controls fields
--Landuse is hierachical. Highest level is Order (Residential) then Group (Residential-Dwelling) then Class (Residential-Dwelling-Detached house)
--Fields could be linked when not mixed use Example: If user inputs class field (Detached-House) on front end then trigger on db automatically will populate group and order. If we go this route then a trigger is needed on the db both to run and remove this process.
--Landuse us a table as #358
-- Land use, single or mutiple classes?
ALTER TABLE buildings DROP COLUMN IF EXISTS landuse_mutiple_use;

-- Land use, how many different uses?
ALTER TABLE buildings DROP COLUMN IF EXISTS landuse_number_of_uses;

-- Land use is table with 3 levels order > group > class
DROP TABLE IF EXISTS landuse_classifications;
