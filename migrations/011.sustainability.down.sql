-- Remove sustainability fields, update in paralell with adding new fields
-- BREEAM rating
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_breeam_rating;
-- BREEAM date
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_breeam_date;

-- DEC (display energy certifcate, only applies to non domestic buildings)
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_dec;
-- DEC date
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_dec_date;

--TODO: DEC certifcate number, is there an online store for these?

-- Aggregate EPC rating (Estimated) for a building, derived from inidividual certificates
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_aggregate_estimate_epc;

-- Last significant retrofit date YYYY
ALTER TABLE buildings DROP COLUMN IF EXISTS sust_retrofit_date;

--TODO : Embodied carbon

--TODO : Life expectancy minimum

--TODO : Average lifespan for typology

--TODO : Adaptability rating
