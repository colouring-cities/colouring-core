#!/usr/bin/env bash

#
# Load boundary and filter geometries
# - boundary MUST be epsg:3857
# use: ogr2ogr -t_srs EPSG:3857 boundary.3857.shp boundary.shp
#
: ${1?"Usage: $0 ./path/to/boundary"}
boundary_file=$1

echo "Load boundary..."
psql -c "DROP TABLE IF EXISTS boundary"
shp2pgsql -s 3857 $boundary_file boundary | psql

echo "Delete geometries (hence buildings, building_properties)..."
psql -c "DELETE FROM new_geometries as g
USING boundary as b
WHERE b.gid = 1 AND NOT ST_ContainsProperly(b.geom, g.geometry_geom);"
