psql -c "DROP TABLE IF EXISTS epc;"

# Create EPC data table
## construction_age_band should match date_year in buildings table
## uprn and toid can also be linked to building table
psql -c "
CREATE TABLE epc (
    index integer,
    current_energy_rating char(1),
    lodgement_date timestamp,
    floor_level integer,
    construction_age_band smallint,
    uprn bigint,
    epc_data_from_file varchar,
    toid varchar
);
"

# Read in the EPC data
psql -c "\copy epc FROM 'gla-epc-subset.csv' DELIMITER ',' CSV HEADER;"