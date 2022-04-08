#!/usr/bin/env bash
  
# for TOID in geometries
  # if geometry.TOID not in builings
    # INSERT
    # add build date

# for TOID in buildings
  # for each building.coordinates <10m away from a building.coordinates
    # Mark one with older build date (or blank) as demolish date = build date of the new one


psql -c "INSERT INTO buildings ( geometry_id, ref_toid ) SELECT geometry_id, source_id from geometries;"
