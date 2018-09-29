# Data loading

The scripts in this directory are used to extract, transform and load (ETL) the core datasets
for Colouring London:

1. Building geometries, sourced from Ordnance Survey MasterMap (Topography Layer)
1. Unique Property Reference Numbers (UPRNs), sourced from Ordnance Survey AddressBase

## Prerequisites

Before running any of these scripts, you will need the OS data for your area of
interest. AddressBase and MasterMap are available directly from [Ordnance
Survey](https://www.ordnancesurvey.co.uk/).

The scripts should be run in the following order:

```bash
# extract both datasets
extract_addressbase.sh ./addressbase_dir
extract_mastermap.sh ./mastermap_dir
# filter mastermap ('building' polygons and any others referenced by addressbase)
filter_transform_mastermap_for_loading.sh ./addressbase_dir ./mastermap_dir
# load all building outlines
load_geometries.sh ./mastermap_dir
# index geometries (should be faster after loading)
psql < ../migrations/002.index-geometries.sql
# create a building record per outline
create_building_records.sh
# add UPRNs where they match
load_uprns.py ./addressbase_dir
# index building records
psql < ../migrations/002.index-buildings.sql
```

To help test the Colouring London application, `get_test_polygons.py` will attempt to save a
small (1.5km²) extract from OpenStreetMap to a format suitable for loading to the database.

In this case, run:

```bash
# download test data
get_test_polygons.py
# load all building outlines
load_geometries.sh ./test_data_dir
# index geometries (should be faster after loading)
psql < ../migrations/002.index-geometries.sql
# create a building record per outline
create_building_records.sh
# index building records
psql < ../migrations/002.index-buildings.sql
```
