FROM ubuntu:20.04

RUN apt-get update
RUN apt-get upgrade


RUN apt-get install -y build-essential git vim-nox wget curl
RUN apt-get install -y python3 python3-pip python3-dev python3-venv


RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update

RUN apt-get install -y postgresql postgresql-contrib libpq-dev postgis postgresql-14-postgis-3
RUN apt-get install -y gdal-bin libspatialindex-dev libgeos-dev libproj-dev

RUN git clone https://github.com/colouring-london/colouring-london.git

RUN export NODE_VERSION=v16.13.2
RUN export DISTRO=linux-x64
RUN wget -nc https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-$DISTRO.tar.xz
RUN mkdir /usr/local/lib/node
RUN tar xf node-$NODE_VERSION-$DISTRO.tar.xz -C /usr/local/lib/node
RUN mv /usr/local/lib/node/node-$NODE_VERSION-$DISTRO /usr/local/lib/node/node-$NODE_VERSION
RUN rm node-$NODE_VERSION-$DISTRO.tar.xz


RUN cat >> ~/.profile <<EOF
RUN export NODEJS_HOME=/usr/local/lib/node/node-$NODE_VERSION/bin
RUN export PATH=\$NODEJS_HOME:\$PATH
RUN EOF

RUN source ~/.profile

RUN service postgresql start

RUN sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/14/main/postgresql.conf

RUN echo "host all all all md5" | tee --append /etc/postgresql/14/main/pg_hba.conf > /dev/null

RUN service postgresql restart

RUN postgres psql -c "SELECT 1 FROM pg_user WHERE usename = '<username>';" | grep -q 1 ||  postgres psql -c "CREATE ROLE <username> SUPERUSER LOGIN PASSWORD '<pgpassword>';"

RUN postgres psql -c "SELECT 1 FROM pg_database WHERE datname = '<colouringlondondb>';" | grep -q 1 ||  postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O <username> <colouringlondondb>

RUN psql -d <colouringlondondb> -U <username> -h localhost
RUN psql -d <colouringlondondb> -c "create extension postgis;"
RUN psql -d <colouringlondondb> -c "create extension pgcrypto;"
RUN psql -d <colouringlondondb> -c "create extension pg_trgm;"

RUN ls ./colouring-london/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql -d <colouringlondondb> < $migration; done;

RUN pyvenv colouringlondon
RUN source colouringlondon/bin/activate
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools wheel
RUN pip install -r ./colouring-london/etl/requirements.txt

RUN export NODEJS_HOME=/usr/local/lib/node/node-v16.13.2/bin/
RUN export PATH=$NODEJS_HOME:$PATH
RUN npm install -g npm@latest

RUN cd ./colouring-london/app && npm install

RUN apt install parallel
RUN source colouringlondon/bin/activate
RUN cd ./colouring-london/etl/
RUN python get_test_polygons.py
RUN ./load_geometries_cl.sh ./
RUN psql -d <colouringlondondb> < ../migrations/002.index-geometries.up.sql
RUN ./create_building_records_cl.sh
RUN psql -d <colouringlondondb> < ../migrations/003.index-buildings.up.sql
RUN ls ./colouring-london/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql -d <colouringlondondb> < $migration; done;

EXPOSE 8080
CMD /wait && npm start