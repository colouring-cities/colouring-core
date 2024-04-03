-- Remove sustainability fields, update in parallel with adding new fields
-- Last significant retrofit date YYYY
-- Need to add a constraint to sust_retrofit_date
ALTER TABLE buildings
    ADD CONSTRAINT sust_retrofit_date_end CHECK (sust_retrofit_date <= DATE_PART('year', CURRENT_DATE));

--Has a building had a major renovation without extension (captured in form)
--Boolean yes/no - links to the the DATE
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_retrofitted boolean DEFAULT 'n';

-- Renewal technologies
-- Constraint - Front end multi select back end ENUM
-- Values: Solar PV, Solar thermal, Wind, Ground sourced heat pump, Air sourced heat pump,
CREATE TYPE sust_renewables_tech
AS ENUM ('Solar photovoltaic',
    'Solar thermal',
    'Wind',
    'Ground source heat pump',
    'Air-source heat pump',
    'Water source heat pump',
    'Anaerobic digester');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_renewables_tech sust_renewables_tech DEFAULT NULL;

-- Generating capacity of those renewables, on selection of one of the above generate correspondening front end input for this. Pair values
-- Constraint more than 0 less than 9999
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_renewables_capax int CONSTRAINT high_renewables_capx CHECK (sust_renewables_capax >= 0);

-- Biodiversity
-- Green roof, green wall, both
-- Constrain drop down and enum
CREATE TYPE sust_biodiversity
AS ENUM ('Green roof',
    'Green wall',
    'Green wall & roof',
    'Anaerobic digester');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_biodiversity sust_biodiversity DEFAULT NULL;

-- Insulation, tool tip for glazing in construction to cross link
-- Which components are insulated
-- Constraint multi-entry and ENUM stored in josnb object
-- Values; Wall, Roof, FLOOR
CREATE TYPE constrctn_insulation
AS ENUM ('Cavity wall',
    'External wall',
    'Roof',
    'Floor');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS constrctn_insulation constrctn_insulation DEFAULT NULL;

-- Water recycling
-- yes / no
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_h2o_recyling boolean DEFAULT 'n';

-- Rain water harvesting
-- Does building store it's rainwater, helps combat flood risk
-- yes / no
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_rainwater_harvest boolean DEFAULT 'n';
