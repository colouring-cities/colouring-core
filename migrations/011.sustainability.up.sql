-- BREEAM ratings, one of:
-- - Outstanding
-- - Excellent
-- - Very good
-- - Good
-- - Pass
-- - Unclassified
CREATE TYPE sust_breeam_rating
AS ENUM ('Outstanding',
    'Excellent',
    'Very good',
    'Good',
    'Pass',
    'Unclassified');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_breeam_rating sust_breeam_rating;

-- Date of BREEAM
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_breeam_date smallint;

-- DEC (display energy certifcate, only applies to non domestic buildings)
-- A - G
CREATE TYPE sust_dec
AS ENUM ('A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G');

-- Date of DEC YYYY
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_dec_date smallint;


ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_dec sust_dec;

-- Aggregate EPC rating (Estimated) for a building, derived from inidividual certificates
-- A+ - G
CREATE TYPE sust_aggregate_estimate_epc
AS ENUM ('A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G');

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_aggregate_estimate_epc sust_aggregate_estimate_epc;

-- Last significant retrofit date YYYY
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS sust_retrofit_date smallint;

--How much embodied carbon? One for ML, tons CO2 int
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_embodied_carbon numeric(7,2);

--Life expectancy of the building, via further analysis
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_life_expectancy smallint;

--Average lifespan of typology based on statistical analysis of similar stock
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS sust_lifespan_average smallint;
