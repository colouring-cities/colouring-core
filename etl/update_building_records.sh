#!/usr/bin/env bash

## Prerequisites:
## - Make geometries table have coordinates (load_coordinates.sh) - DONE
## - <mastermap download>= release_geometries
  
# for geometry in geometries

  # if geometry.TOID not in builings
    # Add TOID to temp table called new_geometries
    # psql -c "INSERT INTO buildings ( geometry_id, ref_toid ) SELECT geometry_id, source_id from geometries;"

# for building in buildings

  # if building.TOID not in new <mastermap download>
    # (need a <mastermap download> table with all TOIDs in the new release, but not the old ones too, which geometires has)
    # buildings.dynamics_has_demolished_buildings = TRUE
    
  # secondarily, if building.coordinates <10m away from any new_geometry.coordinates
    # older_building.dynamics_has_demolished_buildings = TRUE
    # link new_geometry TOID in the geometries table to old building and delete duplicate building we just created for new_geometry


# Worry about build dates for switching next