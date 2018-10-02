#!/usr/bin/env bash

#
# Filter and transform for loading
#
: ${1?"Usage: $0 ./path/to/addressbase/dir ./path/to/mastermap/dir"}
: ${2?"Usage: $0 ./path/to/addressbase/dir ./path/to/mastermap/dir"}

addressbase_dir=$1
mastermap_dir=$2

#
# Check which TOIDs are matched against UPRNs
#
python check_ab_mm_match.py $addressbase_dir $mastermap_dir

#
# Filter
# - WHERE descriptiveGroup = '(1:Building)'
# - OR toid in addressbase_toids
#
python filter_mastermap.py $addressbase_dir $mastermap_dir

#
# Transform to 3857 (web mercator)
#
find $mastermap_dir -type f -name '*.filtered.csv' -printf "%f\n" | \
parallel \
ogr2ogr \
    -f CSV $mastermap_dir/{}.3857.csv \
    -select fid \
    -s_srs "EPSG:27700" \
    -t_srs "EPSG:3857" \
    $mastermap_dir/{} \
    -lco GEOMETRY=AS_WKT

#
# Update to EWKT (with SRID indicator for loading to Postgres)
#
find $mastermap_dir -type f -name '*.3857.csv' -printf "%f\n" | \
parallel \
sed -i 's/^"POLYGON/"SRID=3857;POLYGON/' $mastermap_dir/{}

find $mastermap_dir -type f -name '*.3857.csv' -printf "%f\n" | \
parallel \
sed -i 's/^"MULTIPOLYGON/"SRID=3857;MULTIPOLYGON/' $mastermap_dir/{}
