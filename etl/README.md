# Data loading

The scripts in this directory are used to extract, transform and load (ETL) the core datasets
for Colouring London:

1. Building geometries, sourced from Ordnance Survey MasterMap (Topography Layer)
1. Unique Property Reference Numbers (UPRNs), sourced from Ordnance Survey AddressBase

## Prerequisites

Install PostgreSQL and create a database for colouringlondon, with a database
user that can connect to it. The [PostgreSQL
documentation](https://www.postgresql.org/docs/12/tutorial-start.html) covers
installation and getting started.

Install the [PostGIS extension](https://postgis.net/).

Connect to the colouringlondon database and add the PostGIS, pgcrypto and
pg_trgm extensions:

```sql
create extension postgis;
create extension pgcrypto;
create extension pg_trgm;
```

Create the core database tables:

```bash
psql < ../migrations/001.core.up.sql
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

This uses the [osmnx](https://github.com/gboeing/osmnx) python package to get OpenStreetMap data. You will need python & pip and to install `osmnx` to run `get_test_polygons.py`.


In vagrant:
- Install anaconda: https://linuxize.com/post/how-to-install-anaconda-on-ubuntu-20-04/
<!-- ```bash
sudo apt install python3.8
sudo apt install python3-pip
pip3 install cython
sudo apt-get install proj-bin <- gets an old version of proj
```

OR -->

```bash
sudo apt-get install gdal-bin
conda env create -f environment.yml
conda activate polygons
```

<!-- Install `osmnx`: 
```bash
pip install osmnx==0.13
``` -->

(full [osmnx docs](https://osmnx.readthedocs.io))

To help test the Colouring London application, `get_test_polygons.py` will attempt to save a
small (1.5km²) extract from OpenStreetMap to a format suitable for loading to the database.

In this case, run:

```bash
# download test data
python get_test_polygons.py
# load all building outlines
$ sudo -i -u postgres
$ cd ../../../vagrant/colouring-london/etl
./load_geometries.sh ./
# index geometries (should be faster after loading)
psql < ../migrations/002.index-geometries.up.sql
# create a building record per outline
./create_building_records.sh
# index building records
psql < ../migrations/003.index-buildings.up.sql
```

#### TODO:

There is a script in this dir called `WIP_get_test_polygons_osmnx_112.py` which attempts to get the OSM test polygons with the latest version of the `osmnx` package  - functions changed in this [PR](https://github.com/gboeing/osmnx/pull/542).

## Finally

Run the remaining migrations in `../migrations` to create the rest of the database structure.