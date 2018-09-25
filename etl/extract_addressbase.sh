#!/usr/bin/env bash

#
# Extract address points from OS Addressbase GML
# - as supplied in 5km tiles, zip/gz archives
#
: ${1?"Usage: $0 ./path/to/data/dir"}

data_dir=$1

#
# Unzip to GML
#

find $data_dir -type f -name '*.zip' -printf "%f\n" | \
parallel \
unzip -u $data_dir/{} -d $data_dir

#
# Extract to CSV
#
# Relevant fields:
# WKT
# crossReference (list of TOID/other references)
# source (list of cross-reference sources: 7666MT refers to MasterMap Topo)
# uprn
# parentUPRN
# logicalStatus: 1 (one) is approved (otherwise historical, provisional)
#

find $data_dir -type f -name '*.gml' -printf "%f\n"  | \
parallel \
ogr2ogr -f CSV \
    -select crossReference,source,uprn,parentUPRN,logicalStatus \
    $data_dir/{}.csv $data_dir/{} BasicLandPropertyUnit \
    -lco GEOMETRY=AS_WKT

#
# Filter, grouping by TOID
#

find $data_dir -type f -name '*.gml.csv' -printf "%f\n"  | \
parallel \
python filter_addressbase_csv.py $data_dir/{}
