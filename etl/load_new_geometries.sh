#!/usr/bin/env bash

# Load new geometries from GeoJSON to Postgres
# - assume postgres connection details are set in the environment using PGUSER, PGHOST etc.

: ${1?"Usage: $0 ./path/to/mastermap/dir"}

mastermap_dir=$1

# Create 'geometry' record with
#     id: <polygon-guid>,
#     source_id: <toid>,
#     geom: <geom>

echo "Copy new geometries to db..."
find $mastermap_dir -type f -name '*.3857.csv' \
-printf "$mastermap_dir/%f\n" | \
parallel \
cat {} '|' psql -c "\"COPY geometries ( geometry_geom, source_id ) FROM stdin WITH CSV HEADER
WHERE source_id NOT IN geometries;\""
