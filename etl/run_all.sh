#!/usr/bin/env bash

#
# Extract, transform and load building outlines and property records
#
: ${1?"Usage: $0 ./path/to/mastermap/dir ./path/to/boundary"}
: ${2?"Usage: $0 ./path/to/mastermap/dir ./path/to/boundary"}

mastermap_dir=$1
boundary_file=$2
script_dir=${0%/*}

#
# Process
#

# extract both datasets
$script_dir/extract_mastermap.sh $mastermap_dir
# filter mastermap ('building' polygons and any others referenced by addressbase)
$script_dir/filter_transform_mastermap_for_loading.sh $mastermap_dir

#
# Load
#

# load all building outlines
$script_dir/load_geometries.sh $mastermap_dir
# index geometries (should be faster after loading)
psql < $script_dir/../migrations/002.index-geometries.up.sql
$script_dir/drop_outside_limit.sh $boundary_file
# create a building record per outline
$script_dir/create_building_records.sh
# Run remaining migrations
ls $script_dir/../migrations/*.up.sql 2>/dev/null | while read -r migration; do psql < $migration; done;
