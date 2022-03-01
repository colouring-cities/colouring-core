# Setting Up A Production Environment


#### Preliminaries

This guide assumes a virtual environment (VM) running Ubuntu 18_04 (for example on a cloud computing service such as MS Azure). Make sure the VM has at least 2GB memory and enough disk space for your database (for "Colouring London" we use a disk size of 50GB). Otherwise you can keep the defaults in the VM setup.

<!-- - TODO: add private key download etc -->

Install updates to packages:

```bash
sudo apt-get update -y --quiet
sudo apt-get upgrade -y --quiet
```

#### Install Essential Components

Install some useful development tools

```bash
sudo apt-get install -y build-essential git wget curl --quiet
```

- Note: install postgres as per dev doc

Install Nginx

```bash
sudo apt-get -yqq install nginx
```

```bash
cd ~ && git clone https://github.com/colouring-london/colouring-london.git
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
sudo mkdir /var/www/colouring-london
sudo chown -R nodeapp:nodeapp /var/www/colouring-london
sudo chmod -R 775 /var/www/colouring-london
```

- Install and configure node as per the dev docs (TODO) Note: don't need to run `npm install`
- Configure Postgres as per dev doc (ignore the step: Allow authenticated connections from any IP (so includes the host). - replace it with:

```bash
cat <<EOF | sudo tee -a /etc/postgresql/12/main/pg_hba.conf
local all all    md5 
host all all 127.0.0.1/32   md5 
host all all ::1/128   md5
EOF
```

<!-- Change the below to the above -->
<!-- ```bash
echo "host    all             all             all                     md5" | sudo tee --append /etc/postgresql/12/main/pg_hba.conf > /dev/null
``` -->

<!-- TODO: make the clwebapp user not a superuser for prod -->

#### Configure Nginx

Configure Linux firewall.

`sudo ufw allow 'Nginx HTTP'`

Allow ssh connection.

`sudo ufw allow 22`

Optional: For increased security, restrict the ip addresses that can be used to access.

`sudo ufw allow from <your_static_ip_address> proto tcp to any port 22`

`sudo ufw enable -y`

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


