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

# find $data_dir -name '*.zip' -print0 | xargs -0 -P 4 -n 1 unzip

#
# Extract (subset) to CSV
#
# Relevant fields:
# WKT
# crossReference (list of TOID/other references)
# source (list of cross-reference sources: 7666MT refers to MasterMap Topo)
# uprn
# parentUPRN
# logicalStatus: 1 (one) is approved (otherwise historical, provisional)
#

# find $data_dir -type f -name '*.gml' -printf "%f\n"  | \
# parallel \
# ogr2ogr -f CSV \
#     -select crossReference,source,uprn,parentUPRN,logicalStatus \
#     {}.csv {} BasicLandPropertyUnit \
#     -lco GEOMETRY=AS_WKT

rm $data_dir/*.gml

find $data_dir -type f -name '*.gml.csv' -printf "$data_dir%f\n"  | \
parallel \
python filter_addressbase_csv.py {}
