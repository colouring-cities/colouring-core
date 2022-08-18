DROP TABLE IF EXISTS epc;

-- Create EPC data table
CREATE TABLE epc (
  
    current_energy_rating char(1),
    lodgement_date timestamp,
    floor_level integer,
    construction_age_band varchar,
    uprn integer,
    epcdatafromfile varchar,
    toid varchar
);

-- Read in the EPC data
COPY epc (CURRENT_ENERGY_RATING, LODGEMENT_DATE, FLOOR_LEVEL, CONSTRUCTION_AGE_BAND, UPRN, EPCDatafromFile, TOID)
FROM 'gla-epc-subset.csv'
WITH (FORMAT csv, HEADER true);