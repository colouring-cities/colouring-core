# Setting Up A Production Environment


#### Preliminaries

This guide assumes a virtual environment (VM) running Ubuntu 20_04.

Install updates to packages:

`sudo apt-get update`

`sudo apt-get dist-upgrade`


Install openSSH (if necessary)

`sudo apt install openssh-server`


***


#### Install Essential Components

Install some useful development tools

`sudo apt-get install -y build-essential git vim-nox wget curl`

Install Postgres and associated tools

`sudo apt-get install -y postgresql postgresql-contrib libpq-dev postgis postgresql-12-postgis-3`

`sudo apt-get install -y gdal-bin libspatialindex-dev libgeos-dev libproj-dev`

Install Python 3 and pip

`sudo apt-get install python3 python3-pip`


Install Nginx

`sudo apt install nginx`


Clone the remote Colouring London GitHub repository into `/var/www`

`cd /var/www`

`sudo git clone https://github.com/colouring-cities/colouring-london.git`

Create a system user (`nodeapp`) to `chown` the `colouring-london` directory

`useradd -r -s /bin/nologin nodeapp`

Add the current user to the `nodeapp` group

`sudo usermod -a -G nodeapp <your_ubuntu_username>`

Make the `nodeapp` user/group `chown` the `colouring-london` directory and its subdirectories

`sudo chown -R nodeapp:nodeapp /var/www/colouring-london`

Now set appropriate permissions on the `colouring-london` directory

`sudo chmod -R 775 /var/www/colouring-london`


***


#### Install Node. 

First define a couple of convenience variables:

`NODE_VERSION=v12.14.1`

`DISTRO=linux-x64`

Get the Node distribution and install it

`wget -nc https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-$DISTRO.tar.xz`

`sudo mkdir /usr/local/lib/node`

`sudo tar xf node-$NODE_VERSION-$DISTRO.tar.xz -C /usr/local/lib/node`

`sudo mv /usr/local/lib/node/node-$NODE_VERSION-$DISTRO /usr/local/lib/node/node-$NODE_VERSION`

`rm node-$NODE_VERSION-$DISTRO.tar.xz`


Export the `NODE_JS_HOME` variable to your bash profile

	cat >> ~/.profile <<EOF
	export NODEJS_HOME=/usr/local/lib/node/node-$NODE_VERSION/bin
	export PATH=$NODEJS_HOME:$PATH
	EOF


Reload your profile to ensure changes take effect

`source ~/.profile`


***


#### Configure Node

Now upgrade the `npm` package manager to the most recent release with global privileges. This needs to be performed as root user, so it is necessary to export the node variables to the root user profile. 

`sudo su root`

`export NODEJS_HOME=/usr/local/lib/node/node-v12.14.1/bin/`

`export PATH=$NODEJS_HOME:$PATH`

`npm install -g npm@next`

`exit`

Now install the required Node packages as designated in `package.json`

`cd /var/www/colouring-london/app && npm install`


***


#### Configure Postgres

`sudo service postgresql start`

`sudo locale-gen en_US.UTF-8`

`sudo sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/10/main/postgresql.conf`

`echo "host    all             all             all                     md5" | sudo tee --append /etc/postgresql/10/main/pg_hba.conf > /dev/null`


For production we do not want to use our Ubuntu username as the Postgres username. So we need to replace peer authentication with password authentication for local connections. 

`sudo sed -i 's/^local.*all.*all.*peer$/local   all             all                                     md5/' /etc/postgresql/10/main/pg_hba.conf`


Restart Postgres for the configuration changes to take effect

`sudo service postgresql restart`

Create a distinct Postgres user

`sudo -u postgres psql -c "SELECT 1 FROM pg_user WHERE usename = '<postgres_username>';" | grep -q 1 || sudo -u postgres psql -c "CREATE ROLE <postgres_username> SUPERUSER LOGIN PASSWORD '<postgres_password>';"`


Create default colouring london database

`sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = 'colouringlondondb';" | grep -q 1 || sudo -u postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O <postgres_username> colouringlondondb`

`psql -d colouringlondondb -U <postgres_username> -c "create extension postgis;"`

`psql -d colouringlondondb -U <postgres_username> -c "create extension pgcrypto;"`

`psql -d colouringlondondb -U <postgres_username> -c "create extension pg_trgm;"`


Import data from the most recent colouring london database dump

`pg_restore --no-privileges --no-owner --username "<postgres_username>" --dbname "colouringlondondb" --clean "<path/to/database/dump/file>"`


***


#### Configure NGINX

Configure linux firewall

`sudo ufw allow 'Nginx HTTP'`

`sudo ufw allow OpenSSH`

`sudo ufw enable`

We can check the status of the firewall with

`sudo ufw status`


Now edit `sites-available/default` to create a minimal Nginx configuration to test the installation

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

`cd /var/www/colouring-london/app`


`npm run build`


`PGPASSWORD=<postgres_password> PGDATABASE=colouringlondondb PGUSER=<postgres_username> PGHOST=localhost PGPORT=5432 APP_COOKIE_SECRET=<secret> npm run start:prod`

Now open a browser window on a client machine and navigate to the IP Address of your VM

`http://<ip_address_of_vm>`

You should see the Colouring London homepage.


***


#### Set up PM2

Perform a global install of PM2

`sudo su root`

`export NODEJS_HOME=/usr/local/lib/node/node-v12.14.1/bin/`

`export PATH=$NODEJS_HOME:$PATH`

`npm install -g pm2`

`exit`


Create an `ecosystem.config.js` file from the template file

`cd /var/www/colouring-london`

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
	            instances: 6,
	            env: {
	                NODE_ENV: "production",
	                PGHOST: "localhost",
	                PGPORT: 5432,
	                PGDATABASE: "colouringlondondb",
	                PGUSER: "<postgres_username>",
	                PGPASSWORD: "<postgres_password>",
	                APP_COOKIE_SECRET: "<longrandomsecret>",
	                TILECACHE_PATH: "/var/www/colouring-london/app/tilecache"
	            }
	        }
	    ]
	}

Edit the above file as appropriate and save as `ecosystem.config.js`


Start the colouring-london app

`cd /var/www/colouring-london`

`pm2 start ecosystem.config.js`

Open a browser window on a client machine and navigate to the IP Address of your VM

`http://<ip_address_of_vm>`

You should see the Colouring London homepage.

To stop the colouring-london app type:

`pm2 stop ecosystem.config.js`


***

#### Set up data extracts

Install requirements for the maintenance Python scripts

`cd /var/www/colouring-london/maintenance`

`sudo pip3 install -r requirements.txt`

The maintenance scripts might need environment variables present at the time of execution, notably the database connection details.
If running the scripts manually, the variables can be provided just before execution, for example

`PGHOST=localhost PGPORT=5432 PGDATABASE=dbname PGUSER=username PGPASSWORD=secretpassword EXTRACTS_DIRECTORY=/var/www/colouring-london/downloads python3 maintenance/extract_data/extract_data.py`

If the maintenance script is to be run on a schedule, the variables should be loaded before running the script, for example from a `.env` file.


#### Set up SSL - TO DO

DON'T FORGET to open the Ubuntu firewall to HTTPS


