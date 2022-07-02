#!/usr/bin/env bash

: ${1?"Usage: $0 ./path/to/mastermap/dir"}

mastermap_dir=$1

echo "Filter WHERE descriptiveGroup = '(1:Building)'... "
python filter_mastermap.py $mastermap_dir

echo "Transform to 3857 (web mercator)..."
find $mastermap_dir -type f -name '*.filtered.csv' -printf "%f\n" | \
parallel \
ogr2ogr \
    -f CSV $mastermap_dir/{}.3857.csv \
    -select fid \
    -s_srs "EPSG:27700" \
    -t_srs "EPSG:3857" \
    $mastermap_dir/{} \
    -lco GEOMETRY=AS_WKT

echo "Update to EWKT (with SRID indicator for loading to Postgres)..."
echo "Updating POLYGONs.."
find $mastermap_dir -type f -name '*.3857.csv' -printf "%f\n" | \
parallel \
sed -i "'s/^\"POLYGON/\"SRID=3857;POLYGON/'" $mastermap_dir/{}

echo "Updating MULTIPOLYGONs.."
find $mastermap_dir -type f -name '*.3857.csv' -printf "%f\n" | \
parallel \
sed -i "'s/^\"MULTIPOLYGON/\"SRID=3857;MULTIPOLYGON/'" $mastermap_dir/{}
