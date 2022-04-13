#!/usr/bin/env bash

#
# Filter and transform for loading
#
: ${1?"Usage: $0 ./path/to/mastermap/dir"}

mastermap_dir=$1

rm -f $mastermap_dir/*.{csv,gml,txt,filtered,gfs}
