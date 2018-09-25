# Data loading

The scripts in this directory are used to extract, transform and load (ETL) the core datasets
for Colouring London:

1. Building geometries, sourced from Ordnance Survey MasterMap (Topography Layer)
1. Unique Property Reference Numbers (UPRNs), sourced from Ordnance Survey AddressBase

## Prerequisites

Before running any of these scripts, you will need the OS data for your area of
interest. AddressBase and MasterMap are available directly from [Ordnance
Survey](https://www.ordnancesurvey.co.uk/).

To help test the Colouring London app, `get_test_polygons.py` will attempt to save a small
(1.5km²) extract from OpenStreetMap to a format suitable for loading to the database.

The scripts should be run in the following order:

1. extract_addressbase.sh
1. extract_mastermap.sh
1. filter_transform_mastermap_for_loading.sh
1. load_geometries.sh
1. create_building_records.sh
1. (SQL migration) psql < ../migrations/002.index-geometries.sql
1. load_uprns.py
1. (SQL migration) psql < ../migrations/002.index-buildings.sql
