# Setting up a local development environment

This document is intended to guide you through setting up a local development environment for
Colouring London. This guide assumes you already have Ubuntu 20.04 server installed, typically
installed in a virtual environment such a Virtual Box and are able to SSH into your Ubuntu
installation for convenience.

First upgrade the installed packages to the latest versions, to remove any security warnings.

```
sudo apt-get update
sudo apt-get upgrade
```

## Installing the tools and components

Now we install some essential tools.

`sudo apt-get install -y build-essential git vim-nox wget curl`

Now install python and related tools.

`sudo apt-get install -y python3 python3-pip python3-dev python3-venv`

Set the postgres repo for apt.

`sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'`

`sudo wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -`

`sudo apt-get update`

Next install postgres and postgis to enable support for geographical objects.

`sudo apt-get install -y postgresql postgresql-contrib libpq-dev postgis postgresql-14-postgis-3`

and additional geo-spatial tools

`sudo apt-get install -y gdal-bin libspatialindex-dev libgeos-dev libproj-dev`

Now clone the colouring london codebase.

`git clone https://github.com/colouring-london/colouring-london.git`

Now install Node. It is helpful to define some local variables.

```
export NODE_VERSION=v16.13.2
export DISTRO=linux-x64
wget -nc https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-$DISTRO.tar.xz
sudo mkdir /usr/local/lib/node
sudo tar xf node-$NODE_VERSION-$DISTRO.tar.xz -C /usr/local/lib/node
sudo mv /usr/local/lib/node/node-$NODE_VERSION-$DISTRO /usr/local/lib/node/node-$NODE_VERSION
rm node-$NODE_VERSION-$DISTRO.tar.xz
```

Now add the Node installation to the path and export this to your bash profile.

```
cat >> ~/.profile <<EOF
export NODEJS_HOME=/usr/local/lib/node/node-$NODE_VERSION/bin
export PATH=\$NODEJS_HOME:\$PATH
EOF
```

Then run source to make sure node and npm are on your path:

```
source ~/.profile
```

You can check the updated variables as follows

```
echo $PATH
echo $NODEJS_HOME
```

## Configuring Postgres

Now we configure postgres. First ensure postgres is running.

`service postgresql start`

Ensure the `en_US` locale exists.

`sudo locale-gen en_US.UTF-8`

Configure the database to listen on network connection.

`sudo sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/14/main/postgresql.conf`

Allow authenticated connections from any IP (so includes the host).

`echo "host    all             all             all                     md5" | sudo tee --append /etc/postgresql/14/main/pg_hba.conf > /dev/null`

Restart postgres to pick up config changes.

`service postgresql restart`

Create a superuser role for this user (`<username>`) if it does not already exist. The
password `<pgpassword>` is arbitrary and probably should not be your Ubuntu login password.

```
sudo -u postgres psql -c "SELECT 1 FROM pg_user WHERE usename = '<username>';" | grep -q 1 || sudo -u postgres psql -c "CREATE ROLE <username> SUPERUSER LOGIN PASSWORD '<pgpassword>';"
```

Set the `<pgpassword>` as an environment variable.

```
export PGPASSWORD=<pgpassword>
```

Create a colouring london database if none exists. The name (`<colouringlondondb>`) is arbitrary.

```
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = '<colouringlondondb>';" | grep -q 1 || sudo -u postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O <username> <colouringlondondb>
```

Run `psql` interactively.

```
psql -d <colouringlondondb> -U <username> -h localhost
```

In `psql`, necessary postgres extensions.

```
create extension postgis;
create extension pgcrypto;
create extension pg_trgm;
```

Then quit `psql` by typing `\q` and hitting return.

Now run all 'up' migrations to create tables, data types, indexes etc. The `.sql` scripts to
do this are located in the `migrations` folder of your local repository.

`ls ./colouring-london/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql -d <colouringlondondb> -U <username> -h localhost < $migration; done;`

## Setting up Node

Now upgrade the npm package manager to the most recent release with global privileges. This
needs to be performed as root user, so it is necessary to export the node variables to the
root user profile. Don't forget to exit from root at the end.

```
sudo su root
export NODEJS_HOME=/usr/local/lib/node/node-v16.13.2/bin/
export PATH=$NODEJS_HOME:$PATH
npm install -g npm@latest
exit
```

Now install the required Node packages. This needs to done from the `app` directory of your
local repository, so that it can read from the `package.json` file.

`cd ./colouring-london/app && npm install`

## Loading the data

<details>
<summary> With a database dump </summary>

If you are a developer on the Colouring London project (or another Colouring Cities project), you may have a production database (or staging etc) that you wish to duplicate in your development environment.

Log into the environment where your production database is kept and create a dump file from the db.

```
pg_dump <colouringlondondb> > <dumpfile>
```

You should then download the file to the machine where you are setting up your development environment. If you are using Virtualbox, you could host share the dump file with the VM via a shared folder (e.g. [see these instructions for Mac](https://medium.com/macoclock/share-folder-between-macos-and-ubuntu-4ce84fb5c1ad)).

In your Ubuntu installation where you have been running these setup steps (e.g. Virtualbox VM), you can then recrate the db like so.

```
psql -d <colouringlondondb> -U <username> -h localhost < <dumpfile>
```

</details>

<details>
<summary> With test data </summary>

Run the following two sections if you wish to load test buildings into the application from OpenStreetMaps (OSM).

#### Set up Python:

Now set up a virtual environment for python. In the following example we have named the
virtual environment *colouringlondon* but it can have any name.

`pyvenv colouringlondon`

Activate the virtual environment so we can install python packages into it.

`source colouringlondon/bin/activate`

Install python pip package manager and related tools.

```
pip install --upgrade pip
pip install --upgrade setuptools wheel
```

Now install the required python packages. This relies on the `requirements.txt` file located
in the `etl` folder of your local repository.

`pip install -r ./colouring-london/etl/requirements.txt`

#### Load OpenStreetMap test polygons:

First Install prerequisites.
```bash
sudo apt-get install parallel
```

Check you are in the virtual environment you setup earlier, otherwise run:
```
source colouringlondon/bin/activate
```

To help test the Colouring London application, `get_test_polygons.py` will attempt to save a small (1.5km²) extract from OpenStreetMap to a format suitable for loading to the database.

First open `colouring-london/etl/load_geometries.sh` and `colouring-london/etl/create_building_records.sh` and add this `-d` flag to all the `psql` statements present:

```
-d <colouringlondondb>
```

Then run:

```bash
cd ./colouring-london/etl/
# download test data
python get_test_polygons.py
# load all building outlines
./load_geometries.sh ./
# index geometries (should be faster after loading)
psql -d <colouringlondondb> < ../migrations/002.index-geometries.up.sql
# create a building record per outline
./create_building_records.sh
# index building records
psql -d <colouringlondondb> < ../migrations/003.index-buildings.up.sql
```

#### Re-run database migrations

Re-run the remaining migrations in `../migrations` to create the rest of the database structure.

`ls ./colouring-london/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql -d <colouringlondondb> < $migration; done;`
</details>

## Running the application

Now we are ready to run the application. The `APP_COOKIE_SECRET` is arbitrary.

First `cd ./colouring-london/app`, then:

`PGPASSWORD=<pgpassword> PGDATABASE=<colouringlondondb> PGUSER=<username> PGHOST=localhost PGPORT=5432 APP_COOKIE_SECRET=123456 TILECACHE_PATH=/path/to/tilecache/directory npm start`

If you a running Ubuntu in a virtual environment you will need to configure networking to
forward ports from the guest to the host. For Virtual Box the following was configured under
NAT port forwarding.

Name     | Protocol  | Host Port  | Guest Port
-------- | --------- | ---------- | -----------
app      | TCP       | 8080       | 3000
app_dev  | TCP       | 3001       | 3001
ssh      | TCP       | 4022       | 22

The site can then be viewed on http://localhost:8080. The `app_dev` mapping is used in
development by Razzle which rebuilds and serves client side assets on the fly.

Finally to quit the application type `Ctrl-C`.
