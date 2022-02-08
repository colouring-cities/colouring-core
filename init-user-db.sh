#!/bin/bash
sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/12/main/postgresql.conf
echo "host all all all md5" | tee --append /etc/postgresql/12/main/pg_hba.conf > /dev/null
service postgresql restart

sudo -u postgres psql -c "SELECT 1 FROM pg_user WHERE usename = 'dockeruser';" | grep -q 1 ||  sudo -u postgres psql -c "CREATE ROLE dockeruser SUPERUSER LOGIN PASSWORD 'postgres';"
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = 'colouringlondon';" | grep -q 1 ||  sudo -u postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O dockeruser colouringlondon

psql -d colouringlondon -U dockeruser -h localhost
psql -d colouringlondon -c "create extension postgis;"
psql -d colouringlondon -c "create extension pgcrypto;"
psql -d colouringlondon -c "create extension pg_trgm;"

ls ./colouring-london/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql -d colouringlondon < $migration; done;