#!/usr/bin/env bash

#
# Filter and transform for loading
#
: ${1?"Usage: $0 ./path/to/addressbase/dir ./path/to/mastermap/dir"}
: ${2?"Usage: $0 ./path/to/addressbase/dir ./path/to/mastermap/dir"}

addressbase_dir=$1
mastermap_dir=$2

rm -f $addressbase_dir/*.{csv,gml,txt,filtered,gfs}
rm -f $mastermap_dir/*.{csv,gml,txt,filtered,gfs}
