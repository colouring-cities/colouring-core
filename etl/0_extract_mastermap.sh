# Extract buildings from *.gml.gz
#
# Features where::
#     descriptiveGroup = '(1:Building)'
#
# Use `fid` as source ID, aka TOID.

: ${1?"Usage: $0 ./path/to/input/dir ./path/to/ouput/dir"}

: ${2?"Usage: $0 ./path/to/input/dir ./path/to/ouput/dir"}

find $1 -type f -name '*.gz' -printf "%f\n" | \
parallel \
ogr2ogr \
    -select fid \
    -where "\"descriptiveGroup='(1:Building)'\"" \
    -t_srs "EPSG:3857" \
    -f "GeoJSON" $2/{}.geojson \
    $1/{} \
    TopographicArea
