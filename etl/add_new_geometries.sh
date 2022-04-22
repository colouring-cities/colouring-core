echo "Adding new geometries to geometries table..."
psql -c "INSERT INTO geometries ( source_id, geometry_geom )
         SELECT source_id, geometry_geom
         FROM new_geometries;"