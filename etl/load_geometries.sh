#!/usr/bin/env bash

# Load geometries from GeoJSON to Postgres
# - assume postgres connection details are set in the environment using PGUSER, PGHOST etc.

: ${1?"Usage: $0 ./path/to/mastermap/dir"}

mastermap_dir=$1

# Create 'geometry' record with
#     id: <polygon-guid>,
#     source_id: <toid>,
#     geom: <geom>

# MacOS uses a different version of find thus we need to check which OS
# is being used to determine which find command to use. gfind is
# the linux version of find, but installed using homebrew on Mac.
# Since find already exists, the name becomes gfind
OS=$(uname)

if [ $OS == "Darwin" ]; then
    echo "MacOS detected"
    echo "Copy geometries to db..."
    gfind $mastermap_dir -type f -name '*.3857.csv' \
    -printf "$mastermap_dir/%f\n" | \
    parallel \
    cat {} '|' psql -c "\"COPY geometries ( geometry_geom, source_id ) FROM stdin WITH CSV HEADER;\""
else
    echo "Linux detected"
    echo "Copy geometries to db..."
    find $mastermap_dir -type f -name '*.3857.csv' \
    -printf "$mastermap_dir/%f\n" | \
    parallel \
    cat {} '|' psql -c "\"COPY geometries ( geometry_geom, source_id ) FROM stdin WITH CSV HEADER;\""
fi

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
