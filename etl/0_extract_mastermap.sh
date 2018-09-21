#!/usr/bin/env bash

#
# Extract buildings from *.gz to CSV
#
# Features where::
#     descriptiveGroup = '(1:Building)'
#
# Use `fid` as source ID, aka TOID.
#

: ${1?"Usage: $0 ./path/to/data/dir"}

data_dir=$1

find $data_dir -type f -name '*.gz' -printf "%f\n" | \
parallel \
ogr2ogr \
    -select fid,descriptiveGroup \
    -f CSV $data_dir/{}.csv \
    $data_dir/{} \
    TopographicArea \
    -lco GEOMETRY=AS_WKT

# then filter
# -where "\"descriptiveGroup='(1:Building)'\"" \
# OR toid in addressbase_toids

# finally load
# -t_srs "EPSG:3857" \
