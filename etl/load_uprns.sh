#!/usr/bin/env bash

#
# Load UPRNS from CSV to Postgres
# - assume postgres connection details are set in the environment using PGUSER, PGHOST etc.
#
: ${1?"Usage: $0 ./path/to/addressbase/dir"}

data_dir=$1

#
# Create 'building_properties' record with
#     uprn: <uprn>,
#     parent_uprn: <parent_uprn>,
#     toid: <toid>,
#     uprn_geom: <point>
#
# find $data_dir -type f -name '*.3857.csv.loadable' \
# -printf "$data_dir/%f\n" | \
# parallel \
# cat {} '|' psql -c "\"COPY building_properties ( uprn_geom, toid, uprn, parent_uprn ) FROM stdin WITH CSV HEADER;\""

#
# Create references
#
psql -c "UPDATE building_properties
SET building_id = (
    SELECT b.building_id
    FROM buildings as b
    WHERE
    building_properties.toid = b.ref_toid
);"
