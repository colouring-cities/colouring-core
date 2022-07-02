# Setting up a local development environment

### WARNING: Setup document suitable for development environment, not production server

This document is intended to guide you through setting up a local development environment for the Colouring London application. This guide assumes you already have either already have access to an machine with Ubuntu 18.04 installed, or can use VirtualBox to set up an Ubuntu virtual machine as below.

<details>
<summary>
Configuring an Ubuntu VM in VirtualBox
</summary><p></p>

Here we explain how to use VirtualBox and SSH into your Ubuntu installation for convenience.

When setting up the VirtualBox VM, consider the size of the database you intend to load for use with the application. Consult the [:house: Loading the building data](#house-loading-the-building-data) section of this guide and decide whether you will be using a full city database or will load test data from OSM.

For "Colouring London", we have found that the size of the database means that a VM with access to 50GB of storage is appropriate. If you are using the OSM test data, the default storage settings in VirtualBox should suffice.

##### In either case, you should set the memory to at least `2048` MB.

If you a running Ubuntu in a virtual environment you will need to configure networking to forward ports from the guest to the host. For Virtual Box the following was configured under NAT port forwarding (found under `Settings -> Network -> Advanced -> Port Forwarding`).

Name     | Protocol  | Host Port  | Guest Port
-------- | --------- | ---------- | -----------
app      | TCP       | 8080       | 3000
app_dev  | TCP       | 3001       | 3001
ssh      | TCP       | 4022       | 22

The `app_dev` mapping is used in development by Razzle which rebuilds and serves client side assets on the fly.

To run the commands in the rest of this setup guide, either `ssh` into the VirtualBox environment or open the terminal within the Ubuntu GUI.

If you wish to `ssh`, you will first need to open the terminal in Ubuntu and run the following.

```bash
sudo apt-get install -y openssh-server
```

You can then `ssh` into the VirtualBox VM set up with the port  forwarding described above like so, where `<linuxusername>` is the name you set up during the installation of Ubuntu (you can type `whoami` in the Ubuntu terminal to remind yourself of this).

```bash
ssh <linuxusername>@localhost -p 4022
```
</details>

## Contents

- [:tulip: Installing the tools and components](#tulip-installing-the-tools-and-components)
  - [:red_circle: Installing PostgreSQL](#red_circle-installing-postgresql)
  - [:rainbow: Installing Colouring London](#rainbow-installing-colouring-london)
  - [:arrow_down: Installing Node.js](#arrow_down-installing-nodejs)
  - [:large_blue_circle: Configuring PostgreSQL](#large_blue_circle-configuring-postgresql)
  - [:space_invader: Create an empty database](#space_invader-create-an-empty-database)
  - [:arrow_forward: Configuring Node.js](#arrow_forward-configuring-nodejs)
  - [:snake: Set up Python](#snake-set-up-python)
- [:house: Loading the building data](#house-loading-the-building-data)
- [:computer: Running the application](#computer-running-the-application)
  - [:eyes: Viewing the application](#eyes-viewing-the-application)

## :tulip: Installing the tools and components

First upgrade the installed packages to the latest versions, to remove any security warnings.

```bash
sudo apt-get update -y
sudo apt-get upgrade -y
```

Now install some essential tools.

```bash
sudo apt-get install -y build-essential git wget curl parallel rename
```

### :red_circle: Installing PostgreSQL

Set the postgres repo for apt (these instructions were taken from [postgresql.org](https://www.postgresql.org/download/linux/ubuntu/)).

```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```

```bash
sudo wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```

```bash
sudo apt-get update
```

Next install postgres and postgis to enable support for geographical objects.

```bash
sudo apt-get install -y postgresql-12 postgresql-contrib-12 libpq-dev postgis postgresql-12-postgis-3
```

and additional geo-spatial tools

```bash
sudo apt-get install -y gdal-bin libspatialindex-dev libgeos-dev libproj-dev
```

### :rainbow: Installing Colouring London

Now clone the `colouring-london` codebase. 

```bash
cd ~ && git clone https://github.com/colouring-cities/colouring-london.git
```

**Note:** We assume here that you will clone the repo into the home directory of your Ubuntu installation. Watch out for later commands in this guide that assume the repo is located at `~/colouring-london` and modify the path if appropriate.

### :arrow_down: Installing Node.js

Now install Node. It is helpful to define some local variables.

```bash
export NODE_VERSION=v16.13.2
export DISTRO=linux-x64
wget -nc https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-$DISTRO.tar.xz
sudo mkdir /usr/local/lib/node
sudo tar xf node-$NODE_VERSION-$DISTRO.tar.xz -C /usr/local/lib/node
sudo mv /usr/local/lib/node/node-$NODE_VERSION-$DISTRO /usr/local/lib/node/node-$NODE_VERSION
rm node-$NODE_VERSION-$DISTRO.tar.xz
```

Now add the Node installation to the path and export this to your bash profile.

```bash
cat >> ~/.profile <<EOF
export NODEJS_HOME=/usr/local/lib/node/node-$NODE_VERSION/bin
export PATH=\$NODEJS_HOME:\$PATH
EOF
```

Then run source to make sure node and npm are on your path.

```bash
source ~/.profile
```

You can check the updated variables as follows

```bash
echo $PATH
echo $NODEJS_HOME
```

### :large_blue_circle: Configuring PostgreSQL

Now we configure postgres. First ensure postgres is running.

```bash
sudo service postgresql start
```

Ensure the `en_US` locale exists.

```bash
sudo locale-gen en_US.UTF-8
```

Configure postgres to listen on network connection.

```bash
sudo sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/12/main/postgresql.conf
```

Allow authenticated connections from any IP (so includes the host).

```bash
echo "host    all             all             all                     md5" | sudo tee --append /etc/postgresql/12/main/pg_hba.conf > /dev/null
```

Restart postgres to pick up config changes.

```bash
sudo service postgresql restart
```

Create a superuser role for this user (`<username>`) if it does not already exist. The
password `<pgpassword>` is arbitrary and probably should not be your Ubuntu login password.

```bash
sudo -u postgres psql -c "SELECT 1 FROM pg_user WHERE usename = '<username>';" | grep -q 1 || sudo -u postgres psql -c "CREATE ROLE <username> SUPERUSER LOGIN PASSWORD '<pgpassword>';"
```

<details>
<summary>Note for "Colouring London" devs</summary><p></p>

If you intend to load the full CL database from a dump file into your dev environment, run the above `psql` command with `<username>` as "cldbadmin" and use that username in subsequent steps, but also run the above a second time with `<username>` as "clwebapp" (see section [:house: Loading the building data](#house-loading-the-building-data) for more details).

</details><p></p>

### :space_invader: Create an empty database

Now create an empty database configured with geo-spatial tools. The database name (`<colouringlondondb>`) is arbitrary.

Set environment variables, which will simplify running subsequent `psql` commands.

```bash
export PGPASSWORD=<pgpassword>
export PGUSER=<username>
export PGHOST=localhost
export PGDATABASE=<colouringlondondb>
```

Create the database.

```bash
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = '<colouringlondondb>';" | grep -q 1 || sudo -u postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O <username> <colouringlondondb>
```

```bash
psql -c "create extension postgis;"
psql -c "create extension pgcrypto;"
psql -c "create extension pg_trgm;"
```

### :arrow_forward: Configuring Node.js

Now upgrade the npm package manager to the most recent release with global privileges. This needs to be performed as root user, so it is necessary to export the node variables to the root user profile.

```bash
export NODEJS_HOME=/usr/local/lib/node/node-v16.13.2/bin/
export PATH=$NODEJS_HOME:$PATH
sudo env "PATH=$PATH" npm install -g npm@latest
```

Now install the required Node packages. This needs to done from the `app` directory of your
local repository, so that it can read from the `package.json` file.

```bash
cd ~/colouring-london/app
npm install
```

### :snake: Set up Python

Install python and related tools.

```bash
sudo apt-get install -y python3 python3-pip python3-dev python3-venv
```

## :house: Loading the building data

There are several ways to create the Colouring London database in your environment. The simplest way if you are just trying out the application would be to use test data from OSM, but otherwise you should follow one of the instructions below to create the full database either from scratch, or from a previously made db (via a dump file).

To create the full database from scratch, follow [these instructions](../etl/README.md), otherwise choose one of the following:

<details>
<summary> Create database from dump </summary><p></p>

If you are a developer on the Colouring London project (or another Colouring Cities project), you may have a production database (or staging etc) that you wish to duplicate in your development environment.

Log into the environment where your production database is kept and create a dump file from the db.

```bash
pg_dump <colouringlondondb> > <dumpfile>
```

You should then download the file to the machine where you are setting up your development environment. If you are using Virtualbox, you could host share the dump file with the VM via a shared folder (e.g. [see these instructions for Mac](https://medium.com/macoclock/share-folder-between-macos-and-ubuntu-4ce84fb5c1ad)).

In your Ubuntu installation where you have been running these setup steps (e.g. Virtualbox VM), you can then recrate the db like so.

```bash
psql < <dumpfile>
```

#### Run migrations

Now run all 'up' migrations to create tables, data types, indexes etc. The `.sql` scripts to
do this are located in the `migrations` folder of your local repository.

```bash
ls ~/colouring-london/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql < $migration; done;
```

</details>

<details>
<summary> Create database with test data </summary><p></p>

This section shows how to load test buildings into the application from OpenStreetMaps (OSM).

#### Load OpenStreetMap test polygons

Create a virtual environment for python in the `etl` folder of your repository. In the following example we have name the virtual environment *colouringlondon* but it can have any name.

```bash
cd ~/colouring-london/etl
pyvenv colouringlondon
```

Activate the virtual environment so we can install python packages into it.

```bash
source colouringlondon/bin/activate
```

Install python pip package manager and related tools.

```bash
pip install --upgrade pip
pip install --upgrade setuptools wheel
```

Install the required python packages.

```bash
pip install -r requirements.txt
```

To help test the Colouring London application, `get_test_polygons.py` will attempt to save a small (1.5km²) extract from OpenStreetMap to a format suitable for loading to the database.

Download the test data.

```bash
python get_test_polygons.py
```

Note: the first time you run it, you will get these warnings:
```
rm: cannot remove 'test_buildings.geojson': No such file or directory
rm: cannot remove 'test_buildings.3857.csv': No such file or directory
```

#### Run migrations

Now run all 'up' migrations to create tables, data types, indexes etc. The `.sql` scripts to
do this are located in the `migrations` folder of your local repository.

```bash
ls ~/colouring-london/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql < $migration; done;
```

#### Load buildings

Load all building outlines.

```bash
./load_geometries.sh ./
```

Create a building record per outline.

```bash
./create_building_records.sh
```
</details>

## :computer: Running the application

Now we are ready to run the application.

First enter the app directory.

```bash
cd ~/colouring-london/app
```

Then create a folder for the tilecache.

```bash
mkdir tilecache
```

Create some additional variables for running the application (the `APP_COOKIE_SECRET` is arbitrary).

```bash
export PGPORT=5432
export APP_COOKIE_SECRET=123456
export TILECACHE_PATH=~/colouring-london/app/tilecache
```

Finally, simply run the application with npm.

```bash
npm start
```

**Note:** You can also specify the variables for `npm start` like so:
<details>
<summary>
Specify variables
</summary>

```bash
PGPASSWORD=<pgpassword> PGDATABASE=<colouringlondondb> PGUSER=<username> PGHOST=localhost PGPORT=5432 APP_COOKIE_SECRET=123456 TILECACHE_PATH=~/colouring-london/app/tilecache npm start
```

</details><p></p>

### :eyes: Viewing the application

The site can then be viewed on http://localhost:8080 on the host computer.

Finally to quit the application type `Ctrl-C`.
