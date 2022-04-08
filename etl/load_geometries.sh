#!/usr/bin/env bash

# Load geometries from GeoJSON to Postgres
# - assume postgres connection details are set in the environment using PGUSER, PGHOST etc.

: ${1?"Usage: $0 ./path/to/mastermap/dir"}

mastermap_dir=$1

# Create 'geometry' record with
#     id: <polygon-guid>,
#     source_id: <toid>,
#     geom: <geom>

echo "Creating temporary geometries table for input data..."
psql -c "CREATE TABLE IF NOT EXISTS release_geometries (
    geometry_id serial PRIMARY KEY,
    source_id varchar(30),
    geometry_geom geometry(GEOMETRY, 3857)
);"

echo "Copy geometries to db..."
find $mastermap_dir -type f -name '*.3857.csv' \
-printf "$mastermap_dir/%f\n" | \
parallel \
cat {} '|' psql -c "\"COPY release_geometries ( geometry_geom, source_id ) FROM stdin WITH CSV HEADER;\""

# Copy release_geometries into existing geometries table
psql -c "INSERT INTO geometries SELECT * FROM release_geometries;"

# Delete any duplicated geometries (by TOID)
echo "Delete duplicate geometries..."
psql -c "DELETE FROM geometries a USING (
    SELECT MIN(ctid) as ctid, source_id
    FROM geometries
    GROUP BY source_id
    HAVING COUNT(*) > 1
) b
WHERE a.source_id = b.source_id
AND a.ctid <> b.ctid;"
