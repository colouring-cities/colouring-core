#!/usr/bin/env bash

#
# Provision virtual machine
#
# This script is expected to run a part of the vagrant virtual machine provisioning process. It
# is run by the root user and should do all required installation and setup:
#   1. Install OS packages
#   2. Provision Postgres database
#   3. Light-touch set up of virtual machine environment for user convenience (other programs
#      or dependencies, .bashrc or other dotfiles)
#

# Echo commands as they are executed
set -x

# Create vagrant user if not exists
id -u vagrant >/dev/null 2>&1 || useradd --create-home vagrant


#
# Install OS packages
#

apt-get update
# Install:
# - basics:  build-essential git vim-nox
# - python with pip and venv:  python3 python3-pip python3-dev
# - postgres and postgis: postgresql postgresql-contrib libpq-dev postgis postgresql-12-postgis-3
# - spatial shared libs:  gdal-bin libspatialindex-dev libgeos-dev libproj-dev
apt-get install -y \
    build-essential git vim-nox wget curl \
    python3 python3-pip python3-dev python3-venv \
    postgresql postgresql-contrib libpq-dev postgis postgresql-12-postgis-3 \
    gdal-bin libspatialindex-dev libgeos-dev libproj-dev


#
# Install node.js (node and npm)
#

# node version and platform
NODE_VERSION=v12.18.1
DISTRO=linux-x64

# download
wget -nc https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-$DISTRO.tar.xz

# extract
sudo mkdir /usr/local/lib/node
sudo tar xf node-$NODE_VERSION-$DISTRO.tar.xz -C /usr/local/lib/node
sudo mv /usr/local/lib/node/node-$NODE_VERSION-$DISTRO /usr/local/lib/node/node-$NODE_VERSION
rm node-$NODE_VERSION-$DISTRO.tar.xz

# add to user PATH
cat >> /home/vagrant/.profile <<EOF
# Nodejs
export NODEJS_HOME=/usr/local/lib/node/node-$NODE_VERSION/bin
export PATH=\$NODEJS_HOME:\$PATH
EOF

# add to current (root user) path
export NODEJS_HOME=/usr/local/lib/node/node-$NODE_VERSION/bin
export PATH=$NODEJS_HOME:$PATH


#
# Setup PostgreSQL database
#

# Ensure postgres is running
service postgresql start
# Ensure en_US locale exists
locale-gen en_US.UTF-8
# Database config to listen on network connection
sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/10/main/postgresql.conf
# Allow password connections from any IP (so includes host)
echo "host    all             all             all                     md5" >> /etc/postgresql/10/main/pg_hba.conf
# Restart postgres to pick up config changes
service postgresql restart

# Create vagrant role if not exists
su postgres -c "psql -c \"SELECT 1 FROM pg_user WHERE usename = 'vagrant';\" " \
    | grep -q 1 || su postgres -c "psql -c \"CREATE ROLE vagrant SUPERUSER LOGIN PASSWORD 'vagrant';\" "
# Create vagrant database if not exists
su postgres -c "psql -c \"SELECT 1 FROM pg_database WHERE datname = 'vagrant';\" " \
    | grep -q 1 || su postgres -c "createdb -E UTF8 -T template0 --locale=en_US.utf8 -O vagrant vagrant"


# Create extensions
su vagrant -c "psql -c \"create extension postgis;\" "
su vagrant -c "psql -c \"create extension pgcrypto;\" "
su vagrant -c "psql -c \"create extension pg_trgm;\" "

# Run all 'up' migrations to create tables, data types, indexes
su vagrant -c "ls /vagrant/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql < \$migration; done;"


#
# Install python packages
#

# set up env
pyvenv colouringlondon
source colouringlondon/bin/activate

# Install smif
pip install --upgrade pip
pip install --upgrade setuptools wheel
pip install -r /vagrant/etl/requirements.txt

# Make virtualenv user-editable
chown -R vagrant:vagrant /home/vagrant/colouringlondon


#
# Install node modules
#

# Install latest release of npm
npm install -g npm@next

# Local fixed install of node modules
cd /vagrant/app && npm install


#
# User config
#

# Copy bash config to vagrant home (making sure to clean windows newlines using tr)
tr -d '\r' < /vagrant/provision/.bashrc > /home/vagrant/.bashrc
chown vagrant:vagrant /home/vagrant/.bashrc
