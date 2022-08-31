psql -c "DROP TABLE IF EXISTS epc;"

# Create EPC data table
psql -c "
CREATE TABLE epc (
    index integer,
    current_energy_rating char(1),
    lodgement_date timestamp,
    floor_level varchar(16),
    construction_age_band varchar,
    uprn bigint,
    epc_data_from_file varchar,
    toid varchar
);
"

# Read in the EPC data
psql -c "\copy epc FROM 'gla-epc-subset.csv' DELIMITER ',' CSV HEADER;"