# Setting Up a Production Environment


#### Preliminaries
This guide assumes a virtual environment running Ubuntu 18_04.

Install updates to packages:

`sudo apt-get update`

`sudo apt-get dist-upgrade`


Install openSSH (if necessary)

`sudo apt install openssh-server`


***


#### Install essential tools

`sudo apt-get install -y build-essential git vim-nox wget curl`

Install postgres and associated tools

`sudo apt-get install -y postgresql postgresql-contrib libpq-dev postgis postgresql-10-postgis-2.4`

`sudo apt-get install -y gdal-bin libspatialindex-dev libgeos-dev libproj-dev`


Now that GIT is installed, clone the remote repository

`git clone https://github.com/tomalrussell/colouring-london.git`



Define a couple of convenience variables
`NODE_VERSION=v8.11.3`
`DISTRO=linux-x64`

Get the Node distribution and install it

`wget -nc https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-$DISTRO.tar.xz`

`sudo mkdir /usr/local/lib/node`

`sudo tar xf node-$NODE_VERSION-$DISTRO.tar.xz -C /usr/local/lib/node`

`sudo mv /usr/local/lib/node/node-$NODE_VERSION-$DISTRO /usr/local/lib/node/node-$NODE_VERSION`

`rm node-$NODE_VERSION-$DISTRO.tar.xz`


Export the NODE_JS variable to your bash profile
`cat >> ~/.profile <<EOF export NODEJS_HOME=/usr/local/lib/node/node-$NODE_VERSION/bin export PATH=$NODEJS_HOME:$PATH EOF`


***


#### Configure Postgres

`sudo service postgresql start`

`sudo locale-gen en_US.UTF-8`

`sudo sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/10/main/postgresql.conf`

`echo "host    all             all             all                     md5" | sudo tee --append /etc/postgresql/10/main/pg_hba.conf > /dev/null`


For production we do not want to use our Ubuntu username as the postgres username. So we need to replace peer authentication with password authentication for local connections. 

`sudo sed -i 's/^local.*all.*all.*peer$/local   all             all                                     md5/' /etc/postgresql/10/main/pg_hba.conf`


Restart postgres for the changes to take effect

`sudo service postgresql restart`

Create a distinct postgres user

`sudo -u postgres psql -c "SELECT 1 FROM pg_user WHERE usename = '<postgres_username>';" | grep -q 1 || sudo -u postgres psql -c "CREATE ROLE <postgres_username> SUPERUSER LOGIN PASSWORD '<postgres_password>';"`

Create default colouring london database

`sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = 'colorlondondb';" | grep -q 1 || sudo -u postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O <postgres_username> colorlondondb`

`psql -d colorlondondb -U cldbadmin -c "create extension postgis;"`

`psql -d colorlondondb -U cldbadmin -c "create extension pgcrypto;"`

`psql -d colorlondondb -U cldbadmin -c "create extension pg_trgm;"`

Import data from most recent colouring london database dump

`pg_restore --no-privileges --no-owner --username "<postgres_username>" --dbname "colorlondondb" --clean "/home/cacolorlondon/db/colouringlondonbeta_2018-12-10.dump"`


***


#### Setting up Node

Now upgrade the npm package manager to the most recent release with global privileges. This needs to be performed as root user, so it is necessary to export the node variables to the root user profile. 

`sudo su root`

`export NODEJS_HOME=/usr/local/lib/node/node-v8.11.3/bin/`

`export PATH=$NODEJS_HOME:$PATH`

`npm install -g npm@next`

`exit`


`cd ./colouring-london/app && npm install`


***


#### Setting up NGINX

Install Nginx

`sudo apt install nginx`


Configure linux firewall

`sudo ufw app list`

`sudo ufw allow 'Nginx HTTP'`

`sudo ufw allow OpenSSH`

`sudo ufw status`

`sudo ufw enable`


Edit `sites-available/default` to create a minimal Nginx configuration to test the installation

`sudo nano /etc/nginx/sites-available/default`



	# Handle HTTP connections with redirect
	server {
	    listen 80 default_server;
	    listen [::]:80 default_server;
	    server_name colouring-london;
	    
	    location / {
                proxy_pass http://localhost:3000/;
                proxy_set_header X-Real-IP $remote_addr;
       }

	}
	


Make sure you didn't introduce any syntax errors by typing:

`sudo nginx -t`


If all is well, restart Nginx

`sudo systemctl restart nginx`



Test out the configuration

`cd colouring-london/app`


`npm run build`


`PGPASSWORD=<postgres_password> PGDATABASE=colorlondondb PGUSER=<postgres_username> PGHOST=localhost PGPORT=5432 APP_COOKIE_SECRET=<secret> npm run start:prod`

***

#### Set up PM2

Perform a global install of PM2

`sudo su root`

`export NODEJS_HOME=/usr/local/lib/node/node-v8.11.3/bin/`

`export PATH=$NODEJS_HOME:$PATH`

`npm install -g pm2`

`exit`


Create ecosystem.config.js file from template

`cd ~/colouring-london`

`nano ecosystem.config.template.js`


	// Template for production ecosystem file
	
	// Copy this file and edit to set up pm2 config
	// DO NOT COMMIT details to this file (publicly visible)
	// See https://pm2.io/doc/en/runtime/guide/ecosystem-file/ for docs
	module.exports = {
	    apps: [
	        {
	            name: "colouringlondon",
	            script: "./app/build/server.js",
	            instances: 2,
	            env: {
	                NODE_ENV: "production",
	                PGHOST: "localhost",
	                PGPORT: 5432,
	                PGDATABASE: "colorlondondb",
	                PGUSER: "cldbadmin",
	                PGPASSWORD: "longrandomspassword",
	                APP_COOKIE_SECRET: "longrandomsecret",
	                TILECACHE_PATH: "~/colouring-london/app/tilecache"
	            }
	        }
	    ]
	}

Edit the above file as appropriate and save as `ecosystem.config.js`


Start colouring-london

`cd ~/colouring-london`

`pm2 start ecosystem.config.js`

To stop the colouring-london app type:

`pm2 stop ecosystem.config.js`


***


#### Set up SSL - TO DO

DON'T FORGET to open Firewall (443)


