#!/usr/bin/env bash

# Assign latitute and longitute to buildings with OpenTOID data
# - assume postgres connection details are set in the environment using PGUSER, PGHOST etc.

: ${1?"Usage: $0 ./path/to/opentoid/dir"}

opentoid_dir=$1

echo "Create a temporary table for coordinates..."
psql -c "CREATE TABLE open_toid (
    toid varchar,
    version_number smallint,
    version_date date,
    source_product varchar,
    easting float,
    northing float,
    latitute float,
    longitude float
);"

echo "Loading Open TOID CSV(s) to temporary table..."
find $opentoid_dir -type f -name '*.csv' \
-printf "$opentoid_dir/%f\n" | \
parallel \
cat {} '|' psql -c "\"COPY open_toid ( toid, version_number, version_date, source_product, easting, northing ) FROM stdin WITH CSV HEADER;\""

# Convert the northing/easting coordinates to latitude/longitute with PostGIS
psql -c "update open_toid set the_geom=GeomFromText('POINT('||easting||' '||northing||')',27700);"
psql -c "update open_toid set longitude=st_x(st_transform(the_geom,4326)), latitude=st_y(st_transform(the_geom,4326));"

# Update the buildings table with coordinates
# psql -c ""


# Delete the temporary table
# psql -c "DROP TABLE open_toid;"