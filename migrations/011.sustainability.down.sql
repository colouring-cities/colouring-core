-- Remove sustainability fields, update in paralell with adding new fields
-- BREEAM rating
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_breeam_rating;
-- BREEAM date
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_breeam_date;

-- DEC (display energy certifcate, only applies to non domestic buildings)
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_dec;
-- DEC date
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_dec_date;

--DEC certifcate lmk key, this would be lmkkey, no online lookup but can scrape through API. Numeric (25)
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_dec_lmkey;

-- Aggregate EPC rating (Estimated) for a building, derived from inidividual certificates
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_aggregate_estimate_epc;

-- Last significant retrofit date YYYY
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_retrofit_date;

--How much embodied carbon? One for ML, tons CO2 int
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_embodied_carbon;

--Life expectancy of the building, via further analysis
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_life_expectancy;

--Average lifespan of typology based on statistical analysis of similar stock
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_lifespan_average;


DROP TYPE IF EXISTS sust_breeam_rating;
DROP TYPE IF EXISTS sust_dec;
DROP TYPE IF EXISTS sust_aggregate_estimate_epc;
