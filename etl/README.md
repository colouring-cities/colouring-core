# Creating a Colouring London database from scratch

## Data downloading

The scripts in this directory are used to extract, transform and load (ETL) the core datasets
for Colouring London:

1. Building geometries, sourced from Ordnance Survey MasterMap (Topography Layer)
1. Unique Property Reference Numbers (UPRNs), sourced from Ordnance Survey AddressBase

To get the required datasets, you'll need to complete the following steps:

1. Sign up for the Ordnance Survey [Data Exploration License](https://www.ordnancesurvey.co.uk/business-government/licensing-agreements/data-exploration-sign-up). You should receive an e-mail with a link to log in to the platform (this could take  up to a week).
2. Navigate to https://orders.ordnancesurvey.co.uk/orders and click the button for: ✏️ Order. From here you should be able to click another button to add a product.
3. Drop a rectangle or Polygon over London and make the following selections, clicking the "Add to basket" button for each:

![](screenshot/MasterMap.png)
<p></p>

![](screenshot/AddressBase.png)

4. You should be then able to check out your basket and download the files

## Prerequisites

You should already have set up PostgreSQL and created a database. Make sure to create environment variables to use `psql` if you haven't already:

```bash
export PGPASSWORD=<pgpassword>
export PGUSER=<username>
export PGHOST=localhost
export PGDATABASE=<colouringlondondb>
```

Create the core database tables:

```bash
cd ~/colouring-london
psql < migrations/001.core.up.sql
```

There is some performance benefit to creating indexes after bulk loading data.
Otherwise, it's fine to run all the migrations at this point and skip the index
creation steps below.

Install GNU parallel, this is used to speed up loading bulk data.


## Process and load Ordance Survey data

Before running any of these scripts, you will need the OS data for your area of
interest. AddressBase and MasterMap are available directly from [Ordnance
Survey](https://www.ordnancesurvey.co.uk/). The alternative setup below uses
OpenStreetMap.

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
psql < ../migrations/003.index-buildings.sql
```

## Alternative, using OpenStreetMap

This uses the [osmnx](https://github.com/gboeing/osmnx) python package to get OpenStreetMap data. You will need python and osmnx to run `get_test_polygons.py`.

To help test the Colouring London application, `get_test_polygons.py` will attempt to save a
small (1.5km²) extract from OpenStreetMap to a format suitable for loading to the database.

In this case, run:

```bash
# download test data
python get_test_polygons.py
# load all building outlines
./load_geometries.sh ./
# index geometries (should be faster after loading)
psql < ../migrations/002.index-geometries.up.sql
# create a building record per outline
./create_building_records.sh
# index building records
psql < ../migrations/003.index-buildings.up.sql
```

## Finally

Run the remaining migrations in `../migrations` to create the rest of the database structure.

# Updating the Colouring London database with new OS data