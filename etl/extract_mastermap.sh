#!/usr/bin/env bash

: ${1?"Usage: $0 ./path/to/mastermap/dir"}

data_dir=$1


echo "Extract buildings from *.gz..."

# Features where::
#     descriptiveGroup = '(1:Building)'
#
# Use `fid` as source ID, aka TOID.

find $data_dir -type f -name '*.gz' -printf "%f\n" | \
parallel \
gunzip $data_dir/{} -k -S gml

echo "Rename extracted files to .gml..."
rename 's/$/.gml/' $data_dir/*[^gzvt]

# Note: previously the rename cmd above resulted in some temp files being renamed to .gml
# so I have specified the start of the filename (appears to be consistent for all OS MasterMap downloads)
# we may need to update this below for other downloads
echo "Covert .gml files to .csv"
find $data_dir -type f -name '*5690395*.gml' -printf "%f\n" | \
parallel \
ogr2ogr \
    -select fid,descriptiveGroup \
    -f CSV $data_dir/{}.csv \
    $data_dir/{} \
    TopographicArea \
    -lco GEOMETRY=AS_WKT

echo "Remove .gfs and .gml files from previous steps..."
rm $data_dir/*.gfs
rm $data_dir/*.gml
