-- Remove sustainability fields, update in paralell with adding new fields

-- Last significant retrofit date YYYY
-- Need to add a constraint to sust_retrofit_date

-- Renewal technologies
-- Constraint - Front end multi select back end ENUM
-- Values:
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_renewables_tech;


-- Generating capacity of those renewables, on selection of one of the above generate correspondening front end input for this. Pair values
-- Constraint more than 0 less than?, integer only
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_renewables_capax;


-- Biodiversity
-- Green roof, green wall, both
-- Constrain drop down and enum
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_biodiversity;


-- Insulation, tool tip for glazing in construction to cross link
-- Which components are insulated
-- Cosntraint multi-entry and ENUM stored in josnb object
-- Values; Wall, Roof, Floor
ALTER TABLE buildings DROP COLUMN IF EXISTS constrctn_insulation;


-- Water recycling
-- yes / no
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_h2o_recyling;


-- Rain water harvesting
-- Does builing store it's rainwater
-- yes / no

ALTER TABLE buildings DROP COLUMN IF EXISTS sust_h2o_harvest;
