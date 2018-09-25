#!/usr/bin/env bash

#
# Create corresponding 'building' record with
#     id: <building-guid>,
#     doc: {},
#     geom_id: <polygon-guid>
#
psql -c "INSERT INTO buildings ( geometry_id ) SELECT geometry_id from geometries;"
