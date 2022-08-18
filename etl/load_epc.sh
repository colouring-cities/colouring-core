psql -c "DROP TABLE IF EXISTS epc;"
psql -c "DROP TABLE IF EXISTS temp;"

# Create temp data table mayching CSV headers
psql -c "
CREATE TABLE temp (
  
    CURRENT_ENERGY_RATING char(1),
    LODGEMENT_DATE timestamp,
    FLOOR_LEVEL integer,
    CONSTRUCTION_AGE_BAND varchar,
    UPRN integer,
    EPCDatafromFile varchar,
    TOID varchar
);
"

# Create EPC data table
psql -c "
CREATE TABLE epc (
  
    current_energy_rating char(1),
    lodgement_date timestamp,
    floor_level integer,
    construction_age_band varchar,
    uprn integer,
    toid varchar
);
"

# Read in the EPC data
psql -c "
\copy temp
FROM 'gla-epc-subset.csv'
WITH (FORMAT csv, HEADER true);
"

# Move to the EPC table
psql -c "
INSERT INTO epc (current_energy_rating, lodgement_date, floor_level, construction_age_band, uprn, toid)
SELECT CURRENT_ENERGY_RATING, LODGEMENT_DATE, FLOOR_LEVEL, CONSTRUCTION_AGE_BAND, UPRN, TOID
FROM temp;
"

psql -c "DROP TABLE temp;"