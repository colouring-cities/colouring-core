psql -c "DROP TABLE IF EXISTS epc;"

# Create EPC data table
psql -c "
CREATE TABLE epc (
    index integer,
    current_energy_rating varchar(8),
    lodgement_date timestamp,
    floor_level integer,
    construction_age_band varchar,
    uprn integer,
    epc_data_from_file varchar,
    toid varchar
);
"

# Read in the EPC data
psql -c "\copy epc FROM 'gla-epc-subset.csv' WITH (FORMAT csv HEADER true);"