#!/usr/bin/env bash

#
# Extract MasterMap
#

: ${1?"Usage: $0 ./path/to/mastermap/dir ./path/to/boundary"}
: ${2?"Usage: $0 ./path/to/mastermap/dir ./path/to/boundary"}

data_dir=$1
boundary_file=$2

#
# Extract buildings from *.gz to CSV
#
# Features where::
#     descriptiveGroup = '(1:Building)'
#
# Use `fid` as source ID, aka TOID.
#

find $data_dir -type f -name '*.gz' -printf "%f\n" | \
parallel \
gunzip $data_dir/{} -k -S gml

rename 's/$/.gml/' $data_dir/*[^gzvt]

find $data_dir -type f -name '*.gml' -printf "%f\n" | \
parallel \
ogr2ogr \
    -select fid,descriptiveGroup \
    -f CSV $data_dir/{}.csv \
    -clipsrc $boundary_file \
    $data_dir/{} \
    TopographicArea \
    -lco GEOMETRY=AS_WKT

rm $data_dir/*.gfs
