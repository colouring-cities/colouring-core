Following scripts should be scheduled to run regularly to load livestream data into database.

```
# querying API to obtain data
python3 obtain_livestream_data.py > all_data.json

# loading data into Colouring database
python3 load_into_database

# removing tile cache for planning_applications_status layer - note that location of cache depends on your configuration
rm /srv/colouring-london/tilecache/planning_applications_status/* -rf
```

As loading into databases expects environment variables to be set, one option to actually schedule it in a cron is something like

```
export $(cat ~/scripts/.env | xargs) && /usr/bin/python3 ~/colouring-london/etl/planning_data/load_into_database.py
```

with

```
~/scripts/.env
```

being in following format

```
PGHOST=localhost
PGDATABASE=colouringlondondb
PGUSER=cldbadmin
PGPASSWORD=actualpassword
```