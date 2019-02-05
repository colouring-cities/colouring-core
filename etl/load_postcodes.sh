#!/usr/bin/env bash

#
# Extract and load postcode data for search
#

# Download
# Codepoint Open from Ordnance Survey

# Unpack
# to codepo_gb/Data/*.csv
# with columns (no headers): Postcode, Positional_quality_indicator, Eastings, Northings, Country_code, NHS_regional_HA_code, NHS_HA_code, Admin_county_code, Admin_district_code, Admin_ward_code
unzip -n -d codepo_gb codepo_gb.zip

# Filter
# to codepo_gb/london_postcodes.csv
# with columns: postcode, eastings, northings
# "E09..." is London Borough prefix, used in Admin_county_code
echo "postcode,x,y" > codepo_gb/london_postcodes_27700.csv
grep -h '"E09' codepo_gb/Data/CSV/*.csv \
    | sed 's/["]//g' \
    | cut -f 1,3,4 -d "," \
    >> codepo_gb/london_postcodes_27700.csv

# Transform
# to epsg:4326
rm -f codepo_gb/london_postcodes_4326.csv
ogr2ogr -s_srs "EPSG:27700" -t_srs "EPSG:4326" \
    -oo X_POSSIBLE_NAMES=x -oo Y_POSSIBLE_NAMES=y \
    -oo KEEP_GEOM_COLUMNS=no \
    -f CSV \
    codepo_gb/london_postcodes_4326.csv \
    codepo_gb/london_postcodes_27700.csv \
    -lco GEOMETRY=AS_WKT

# Coerce EPSG:4326 CRS
sed -i 's/^\"POINT/\"SRID=4326;POINT/' codepo_gb/london_postcodes_4326.csv

# Load
cat codepo_gb/london_postcodes_4326.csv \
    | psql -c "COPY search_locations ( center, search_str ) FROM stdin WITH CSV HEADER;"
