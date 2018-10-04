#!/usr/bin/env bash

#
# Load boundary and filter geometries
# - boundary MUST be epsg:3857
# use: ogr2ogr -t_srs EPSG:3857 boundary.3857.shp boundary.shp
#
: ${1?"Usage: $0 ./path/to/boundary"}
boundary_file=$1

# Load boundary
psql -c "DROP TABLE IF EXISTS boundary"
shp2pgsql -s 3857 $boundary_file boundary | psql

# Remove restrictions on deleting linked geometries
psql -c "ALTER TABLE ONLY buildings
DROP CONSTRAINT buildings_geometry_id_fkey;

ALTER TABLE ONLY buildings
ADD CONSTRAINT buildings_geometry_id_fkey
FOREIGN KEY (geometry_id) REFERENCES geometries(geometry_id) ON DELETE CASCADE;

ALTER TABLE ONLY building_properties
DROP CONSTRAINT building_properties_building_id_fkey;

ALTER TABLE ONLY building_properties
ADD CONSTRAINT building_properties_building_id_fkey
FOREIGN KEY (building_id) REFERENCES buildings(building_id) ON DELETE CASCADE;

ALTER TABLE ONLY logs
DROP CONSTRAINT logs_building_id_fkey;

ALTER TABLE ONLY logs
ADD CONSTRAINT logs_building_id_fkey
FOREIGN KEY (building_id) REFERENCES buildings(building_id) ON DELETE CASCADE;
"

# Delete geometries (hence buildings, building_properties)
psql -c "DELETE FROM geometries as g
USING boundary as b
WHERE b.gid = 1 AND NOT ST_ContainsProperly(b.geom, g.geometry_geom);"

# Put restrictions back
psql -c "ALTER TABLE ONLY buildings
DROP CONSTRAINT buildings_geometry_id_fkey;

ALTER TABLE ONLY buildings
ADD CONSTRAINT buildings_geometry_id_fkey
FOREIGN KEY (geometry_id) REFERENCES geometries(geometry_id) ON DELETE RESTRICT;

ALTER TABLE ONLY building_properties
DROP CONSTRAINT building_properties_building_id_fkey;

ALTER TABLE ONLY building_properties
ADD CONSTRAINT building_properties_building_id_fkey
FOREIGN KEY (building_id) REFERENCES buildings(building_id) ON DELETE RESTRICT;

ALTER TABLE ONLY logs
DROP CONSTRAINT logs_building_id_fkey;

ALTER TABLE ONLY logs
ADD CONSTRAINT logs_building_id_fkey
FOREIGN KEY (building_id) REFERENCES buildings(building_id) ON DELETE RESTRICT;
"
