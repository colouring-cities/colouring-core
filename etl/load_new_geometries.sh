#!/usr/bin/env bash

# Load geometries from GeoJSON to Postgres
# - assume postgres connection details are set in the environment using PGUSER, PGHOST etc.

: ${1?"Usage: $0 ./path/to/mastermap/dir"}

mastermap_dir=$1

# Create 'geometry' record with
#     id: <polygon-guid>,
#     source_id: <toid>,
#     geom: <geom>

echo "Removing temp tables if previously created..."
psql -c "DROP TABLE IF EXISTS new_geometries;"
psql -c "DROP TABLE IF EXISTS release_geometries;"

echo "Creating temporary geometries table for OS release geometries..."
psql -c "CREATE TABLE IF NOT EXISTS release_geometries (
    source_id varchar(30) PRIMARY KEY,
    geometry_geom geometry(GEOMETRY, 3857)
);"

echo "Copy geometries to db..."
find $mastermap_dir -type f -name '*.3857.csv' \
-printf "$mastermap_dir/%f\n" | \
parallel \
cat {} '|' psql -c "\"COPY release_geometries ( geometry_geom, source_id ) FROM stdin WITH CSV HEADER;\""

echo "Creating temporary geometries table for new geometries only..."
psql -c "CREATE TABLE IF NOT EXISTS new_geometries (
    source_id varchar(30) PRIMARY KEY,
    geometry_geom geometry(GEOMETRY, 3857)
);"

echo "Finding geometries that are new to this release..."
psql -c "INSERT INTO new_geometries ( source_id, geometry_geom )
         SELECT source_id, geometry_geom
         FROM release_geometries AS r
         WHERE NOT EXISTS ( SELECT source_id
                            FROM geometries AS g
                            WHERE g.source_id = r.source_id);"
         
echo "Adding new geometries to geometries table..."
psql -c "INSERT INTO geometries ( source_id, geometry_geom )
        SELECT source_id, geometry_geom
        FROM new_geometries;"
