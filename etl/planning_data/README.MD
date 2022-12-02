Following instructions assume that code is placed within `~/colouring-london/etl/planning_data/`

To install necessary dependencies use `cd ~/colouring-london/etl/planning_data/ && pip3 install -r requirements.txt`

Following scripts should be scheduled to run regularly to load livestream data into database.

```
# querying API to obtain data & loading data into Colouring database
python3 obtain_livestream_data_and_load_into_database.py

# removing tile cache for planning applications status layers - note that location of cache depends on your configuration
rm /srv/colouring-london/tilecache/planning_applications_status_all/* -rf
rm /srv/colouring-london/tilecache/planning_applications_status_recent/* -rf
rm /srv/colouring-london/tilecache/planning_applications_status_very_recent/* -rf
```

As loading into databases expects environment variables to be set, one option to actually schedule it in a cron is something like

```
export $(cat ~/scripts/.env | xargs) && /usr/bin/python3 ~/colouring-london/etl/planning_data/obtain_livestream_data_and_load_into_database.py
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
PLANNNING_DATA_API_ALLOW_REQUEST_CODE=requestcode
```
