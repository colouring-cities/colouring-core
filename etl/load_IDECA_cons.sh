#!/usr/bin/env bash

echo "Adding new geometries to geometries table..."
psql -c "INSERT INTO geometries (geometry_id, source_id, geometry_geom )
         SELECT demo_cons_ideca.objectid,demo_cons_ideca.lotecodigo, demo_cons_ideca.geom
         FROM demo_cons_ideca;"



