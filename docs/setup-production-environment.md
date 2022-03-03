# Setting Up A Production Environment

This guide assumes a virtual environment (VM) running Ubuntu 18.04 (for example on a cloud computing service such as MS Azure). Make sure the VM has at least 2GB memory and enough disk space for your database (for "Colouring London" we use a disk size of 50GB). Otherwise you can keep the defaults in the VM setup.

<details>
<summary>
Configuring a VM in MS Azure
</summary><p></p>

From the Azure Portal Home, navigate to `Virtual machines -> + Create` and select the relevant subscription. Choose an Ubuntu 18.04 image, chose "SSH public key" as the Authentication type and select "SSH" as the inbound port. 

You should probably set the "SSH public key source" to "Generate a new key  pair", which will allow you to download a private key once the VM is created. Store it somewhere sensible like `~/.ssh/`.

So long as the VM has enough memory and disk space (see above e.g. 2GB, 50GB), you can leave all other options as the default and click `Review + create`.

Once the Vm has been created, navigate to it in the Azure Portal and click the `Connect` tab, which will show you how to connect via SSH.

</details><p></p>

## Contents

- [:tulip: Installing the tools and components](#tulip-installing-the-tools-and-components)
  - [:red_circle: Installing PostgreSQL](#red_circle-installing-postgresql)
  - [:rainbow: Installing Colouring London](#rainbow-installing-colouring-london)
  - [:arrow_down: Installing Node.js](#arrow_down-installing-nodejs)
  - [:large_blue_circle: Configuring PostgreSQL](#large_blue_circle-configuring-postgresql)
  - [:arrow_forward: Configuring Node.js](#arrow_forward-configuring-nodejs)
- [:house: Loading the building data](#house-loading-the-building-data)
- [:surfer: Installing the web components](#surfer-installing-the-web-components)
	- [:fire_engine: Installing & Configuring Nginx](#fire_engine-installing--configuring-nginx)
	- [:seedling: Test the app configuration](seedling-test-the-app-configuration)
	- [:star: Installing & Configuring PM2](#star-installing--configuring-pm2)
- [:truck: Deploying the application](#truck-deploying-the-application)
- [:computer: Running the application](#computer-running-the-application)
	- [:eyes: Viewing the application](#eyes-viewing-the-application)
	- [:triangular_flag_on_post: Stopping the application](#triangular_flag_on_post-stopping-the-application)
- [:recycle: Automate database backups](#recycle-automate-database-backups)
- [:nut_and_bolt: Automate maintenance](#nut_and_bolt-automate-maintenance)
- [:satellite: Enable domain name access to site](#satellite-enable-domain-name-access-to-site)
	- [:lock: Set up SSL](#lock-set-up-ssl)
	- [:telephone_receiver: Set up DNS record](#telephone_receiver-set-up-dns-record)
	- [:fire: Open Ubuntu firewall](#fire-open-ubuntu-firewall)
	- [:heart_eyes_cat: View site](#heart_eyes_cat-view-site)


## :tulip: Installing the tools and components

First upgrade the installed packages to the latest versions, to remove any security warnings.

```bash
sudo apt-get update -y --quiet
sudo apt-get upgrade -y --quiet
```

Now install some essential tools.

```bash
sudo apt-get install -y build-essential git wget curl --quiet
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

<!-- TODO: Add variable for quiet -->

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
cd ~ && git clone https://github.com/colouring-london/colouring-london.git
```

**Note:** We assume here that you will clone the repo into the home directory of your Ubuntu installation. Watch out for later commands in this guide that assume the repo is located at `~/colouring-london` and modify the path if appropriate.

Create a symlink for the repo in `/var/www/`.

```bash
sudo ln -s ~/colouring-london /var/www/
```

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

Configure the database to listen on network connection.

```bash
sudo sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/12/main/postgresql.conf
```

Allow authenticated connections.

```bash
cat <<EOF | sudo tee -a /etc/postgresql/12/main/pg_hba.conf
local all all    md5 
host all all 127.0.0.1/32   md5 
host all all ::1/128   md5
EOF
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

If you intend to load the full CL database from a dump file into your dev environment, run the above `psql` command with `<username>` as "cldbadmin" and use that username in subsequent steps, but also create a normal user called "clwebapp" (see section [:house: Loading the building data](#house-loading-the-building-data) for more details).

<!-- TODO: add command for the above suggestion -->

</details><p></p>

Set environment variables, which will simplify running subsequent `psql` commands.

```bash
export PGPASSWORD=<pgpassword>
export PGUSER=<username>
export PGHOST=localhost
export PGDATABASE=<colouringlondondb>
```

Create a colouring london database if none exists. The name (`<colouringlondondb>`) is arbitrary.

```bash
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = '$PGDATABASE';" | grep -q 1 || sudo -u postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O $PGUSER $PGDATABASE
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

<!-- Now install the required Node packages. This needs to done from the `app` directory of your
local repository, so that it can read from the `package.json` file.

```bash
cd ~/colouring-london/app
npm install
``` -->

## :house: Loading the building data

<details>
<summary> With a database dump </summary><p></p>

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
<summary> With test data </summary><p></p>

This section shows how to load test buildings into the application from OpenStreetMaps (OSM).

#### Set up Python

Install python and related tools.

```bash
sudo apt-get install -y python3 python3-pip python3-dev python3-venv
```

Now set up a virtual environment for python. In the following example we have named the
virtual environment *colouringlondon* but it can have any name.

```bash
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

#### Load OpenStreetMap test polygons

First install prerequisites.
```bash
sudo apt-get install -y parallel
```

Install the required python packages. This relies on the `requirements.txt` file located
in the `etl` folder of your local repository.

```bash
cd ~/colouring-london/etl/
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

## :surfer: Installing the web components

In this section we'll install the components needed to set up your own "Colouring Cities" website from the application.

### :fire_engine: Installing & Configuring Nginx

```bash
sudo apt-get -yqq install nginx
```

Create a system user (`nodeapp`) to `chown` the `colouring-london` directory

```bash
sudo useradd -r -s /bin/nologin nodeapp
```

Add the current user to the `nodeapp` group

```bash
sudo usermod -a -G nodeapp $USER
```

Make the `nodeapp` user/group `chown` the `colouring-london` directory and its subdirectories

```bash
sudo chown -R nodeapp:nodeapp /var/www/colouring-london
sudo chmod -R 775 /var/www/colouring-london
```

Configure Linux firewall.

```bash
sudo ufw allow 'Nginx Full'
```

Allow ssh connection.

```bash
sudo ufw allow 22
```

Optional: For increased security, restrict the ip addresses that can be used to access.

```bash
sudo ufw allow from <your_static_ip_address> proto tcp to any port 22
```

Then run

```bash
sudo ufw enable
```

We can check the status of the firewall with

```bash
sudo ufw status
```

Now edit `sites-available/default` to create a minimal Nginx configuration to test the installation

```bash
cat <<EOF | sudo tee -a /etc/nginx/sites-available/colouring-london

# Handle HTTP connections with redirect
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name colouring-london;
    
    location / {
              proxy_pass http://localhost:3000/;
              proxy_set_header X-Real-IP \$remote_addr;
     }

}
EOF
```

Symbolic link the config.

```bash
sudo ln -s /etc/nginx/sites-available/colouring-london /etc/nginx/sites-enabled/colouring-london
```

Make sure you didn't introduce any syntax errors by typing:

```bash
sudo nginx -t
```

If all is well, restart Nginx.

```bash
sudo systemctl restart nginx
```

### :seedling: Test the app configuration

Later on in this guide, we will set up deploy the app and run it with pm2, but you can test the app is configured properly at this point:

<details>
<summary>
Build and run the application
</summary><p></p>

Build the application.

```bash
cd /var/www/colouring-london/app
npm install
npm run build
```

Run the application (postgres env vars previously set)

```bash
npm run start:prod
```

Or set the env vars manually to run the application like so.

```bash
PGPASSWORD=<pgpassword> PGDATABASE=<colouringlondondb> PGUSER=<username> PGHOST=localhost PGPORT=5432 APP_COOKIE_SECRET=123456 TILECACHE_PATH=~/colouring-london/app/tilecache npm run start:prod
```

Now open a browser window on a client machine and navigate to the IP Address of your VM

`http://<ip_address_of_vm>`

You should see the Colouring London homepage.
</details>


### :star: Installing & Configuring PM2

Perform a global install of PM2

```bash
sudo env "PATH=$PATH" npm install -g pm2
```

Navigate to colouring-london dir.

```bash
cd /var/www/colouring-london
```

Create an `ecosystem.config.js` file from the template file.

Note: this file is generating an `APP_COOKIE_SECRET`.

```bash
cat <<EOF | sudo tee ecosystem.config.js
// DO NOT COMMIT details to this file (publicly visible)
// See https://pm2.io/doc/en/runtime/guide/ecosystem-file/ for docs
module.exports = {
    apps: [
        {
            name: "colouringlondon",
            script: "./app/build/server.js",
            instances: 6,
            env: {
                NODE_ENV: "production",
                PGHOST: "localhost",
                PGPORT: 5432,
                PGDATABASE: "$PGDATABASE",
                PGUSER: "$PGUSER",
                PGPASSWORD: "$PGPASSWORD",
                APP_COOKIE_SECRET: "$(openssl rand -base64 12)",
                TILECACHE_PATH: "/var/www/colouring-london/app/tilecache"
            }
        }
    ]
}
EOF
```

## :truck: Deploying the application

```bash
cd ~/colouring-london/app
npm install
npm run clean
npm run build -- --noninteractive
rm -rf ~/predeploy/app
mkdir -p ~/predeploy/app
cp -r package.json package-lock.json build map_styles ~/predeploy/app
cd ~/predeploy/app
npm install --production
rsync -r ~/predeploy/app/ /var/www/colouring-london/app
```

^ seeing "skipping things" is normal...

## :computer: Running the application

```bash
cd /var/www/colouring-london
```

```bash
pm2 start ecosystem.config.js
```

### :eyes: Viewing the application

Open a browser window on a client machine and navigate to the IP Address of your VM

```bash
http://<ip_address_of_vm>
```

You should see the Colouring London homepage.

### :triangular_flag_on_post: Stopping the application

To stop the colouring-london app type:

```bash
pm2 stop ecosystem.config.js
```

## :recycle: Automate database backups

- Add backup.sh https://github.com/colouring-cities/colouring-london-config/blob/main/backup.sh
- User to set $AZURE_CONNECTION_STRING
-  install Azure CLI
- Set up backup.sh to run with cron

## :nut_and_bolt: Automate maintenance

<!-- TODO: Also run on a  cron (check PROD server): -->

Install requirements for the maintenance Python scripts

```bash
cd /var/www/colouring-london/maintenance
```

```bash
sudo pip3 install -r requirements.txt
```

The maintenance scripts might need environment variables present at the time of execution, notably the database connection details.
If running the scripts manually, the variables can be provided just before execution, for example

```bash
PGHOST=localhost PGPORT=5432 PGDATABASE=dbname PGUSER=username PGPASSWORD=secretpassword EXTRACTS_DIRECTORY=/var/www/colouring-london/downloads python3 maintenance/extract_data/extract_data.py
```

If the maintenance script is to be run on a schedule, the variables should be loaded before running the script, for example from a `.env` file.

## :satellite: Enable domain name access to site

### :lock: Set up SSL

- Use cert bot to let you request and renew SSL  certificates automatically (letsencrypt)

### :telephone_receiver: Set up DNS record

- Setup DNS record for domain name access to site

### :fire: Open Ubuntu firewall

DON'T FORGET to open the Ubuntu firewall to HTTPS

### :heart_eyes_cat: View site


