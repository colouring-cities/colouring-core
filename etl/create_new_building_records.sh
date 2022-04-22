#!/usr/bin/env bash

#
# Create corresponding 'building' record with
#     id: <building-guid>,
#     doc: {},
#     geom_id: <polygon-guid>
#
psql -c "INSERT INTO buildings ( geometry_id, ref_toid )
         SELECT geometry_id, source_id
         FROM geometries AS g
         WHERE EXISTS ( SELECT source_id
                        FROM new_geometries AS ng
                        WHERE g.source_id = ng.source_id);"
