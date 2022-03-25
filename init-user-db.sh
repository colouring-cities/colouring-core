#!/bin/bash
apt-get update -y
apt-get upgrade -y

apt-get install -y postgresql-contrib libpq-dev postgis
apt-get install -y postgresql-12-postgis-3
apt-get install -y gdal-bin libspatialindex-dev libgeos-dev libproj-dev

apt-get install -y python3 python3-pip python3-dev

# Do I need to create a db? Look at the dockerhub
# psql -d colouringlondon -U dockeruser -c "SELECT 1 FROM pg_user WHERE usename = 'dockeruser';" | grep -q 1 ||  psql -d colouringlondon -U dockeruser -c "CREATE ROLE dockeruser SUPERUSER LOGIN PASSWORD 'postgres';"
# psql -d colouringlondon -U dockeruser -c "SELECT 1 FROM pg_database WHERE datname = 'colouringlondon';" | grep -q 1 ||  -u postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O dockeruser colouringlondon

psql -c "create extension postgis;"
psql -c "create extension pgcrypto;"
psql -c "create extension pg_trgm;"

ls ./colouring-london/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql < $migration; done;

pip install --upgrade pip
pip install --upgrade setuptools wheel
pip install -r ./colouring-london/etl/requirements.txt

python ./colouring-london/etl/get_test_polygons.py
./colouring-london/etl/load_geometries_cl.sh ./
./colouring-london/etl/create_building_records_cl.sh