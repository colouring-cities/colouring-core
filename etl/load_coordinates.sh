#!/usr/bin/env bash

# Assign latitude and longitude to buildings with OpenTOID data
# - assume postgres connection details are set in the environment using PGUSER, PGHOST etc.

: ${1?"Usage: $0 ./path/to/opentoid/dir"}

opentoid_dir=$1

# Move this to 001.core.up.sql if needed, or otherwise delete as temp table
echo "Creating table for open_toid coordinates..."
psql -c "DROP TABLE IF EXISTS open_toid"
psql -c "CREATE TABLE open_toid (
    toid varchar,
    version_number float,
    version_date date,
    source_product varchar,
    easting float,
    northing float,
    longitude float,
    latitude float
);"

echo "Loading Open TOID CSV(s) to temporary table..."
find $opentoid_dir -type f -name '*_converted.csv' \
-printf "$opentoid_dir/%f\n" | \
parallel \
cat {} '|' psql -c "\"COPY open_toid ( toid, version_number, version_date, source_product, easting, northing, longitude, latitude ) FROM stdin WITH CSV HEADER;\""

echo "Updating the buildings table with coordinates..."
psql -c "UPDATE buildings
    SET location_latitude = open_toid.latitude,
        location_longitude = open_toid.longitude
    FROM open_toid
    WHERE open_toid.toid = buildings.ref_toid
;"

# Add these columns here rather than in 001.core.up.sql for legacy reasons
psql -c "ALTER TABLE geometries
         ADD longitude float
         ADD latitude float;"

echo "Updating the geometries table with coordinates..."
psql -c "UPDATE geometries
    SET latitude = open_toid.latitude,
        longitude = open_toid.longitude
    FROM open_toid
    WHERE open_toid.toid = geometries.source_id
;"