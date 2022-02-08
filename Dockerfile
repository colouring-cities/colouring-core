FROM ubuntu/postgres:12-20.04_beta

RUN apt-get update
RUN apt-get upgrade

RUN apt-get install -y build-essential wget
RUN apt-get install -y python3 python3-pip python3-dev python3-venv
RUN apt install parallel -y

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
# RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
# RUN apt-get update

RUN apt-get install -y postgresql-contrib libpq-dev postgis
RUN apt-get install -y postgresql-12-postgis-3
RUN apt-get install -y gdal-bin libspatialindex-dev libgeos-dev libproj-dev

RUN mkdir /colouring-london
COPY app /colouring-london/app
COPY migrations /colouring-london/migrations
COPY etl /colouring-london/etl

# RUN wget -nc https://nodejs.org/dist/v16.13.2/node-v16.13.2-linux-x64.tar.xz
# RUN mkdir /usr/local/lib/node
# RUN tar xf node-v16.13.2-linux-x64.tar.xz -C /usr/local/lib/node
# RUN mv /usr/local/lib/node/node-v16.13.2-linux-x64 /usr/local/lib/node/node-v16.13.2
# RUN rm node-v16.13.2-linux-x64.tar.xz
# RUN cat >> ~/.profile <<EOF
# RUN export NODEJS_HOME=/usr/local/lib/node/node-v16.13.2/bin
# RUN export PATH=\$NODEJS_HOME:\$PATH
# RUN EOF
# RUN source ~/.profile

ENV NODE_VERSION=16.13.2
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

RUN service postgresql start
COPY ./init-user-db.sh /docker-entrypoint-initdb.d/init-user-db.sh

# RUN sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/12/main/postgresql.conf

# RUN echo "host all all all md5" | tee --append /etc/postgresql/12/main/pg_hba.conf > /dev/null

# RUN service postgresql restart

# RUN psql -c "SELECT 1 FROM pg_user WHERE usename = 'dockeruser';" | grep -q 1 ||  psql -c "CREATE ROLE dockeruser SUPERUSER LOGIN PASSWORD 'postgres';"

# RUN psql -c "SELECT 1 FROM pg_database WHERE datname = 'colouringlondon';" | grep -q 1 ||  createdb -E UTF8 -T template0 --locale=en_US.utf8 -O dockeruser colouringlondon

# RUN psql -d colouringlondon -U dockeruser -h localhost
# RUN psql -d colouringlondon -c "create extension postgis;"
# RUN psql -d colouringlondon -c "create extension pgcrypto;"
# RUN psql -d colouringlondon -c "create extension pg_trgm;"

# RUN ls ./colouring-london/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql -d colouringlondon < $migration; done;

RUN pyvenv colouringlondon
RUN source colouringlondon/bin/activate
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools wheel
RUN pip install -r ./colouring-london/etl/requirements.txt

# RUN export NODEJS_HOME=/usr/local/lib/node/node-v16.13.2/bin/
# RUN export PATH=$NODEJS_HOME:$PATH
RUN npm install -g npm@latest

WORKDIR ./colouring-london/app
RUN npm install

WORKDIR ./colouring-london/app/etl
RUN python get_test_polygons.py
RUN ./load_geometries_cl.sh ./
RUN psql -d colouringlondon < ../migrations/002.index-geometries.up.sql
RUN ./create_building_records_cl.sh
RUN psql -d colouringlondon < ../migrations/003.index-buildings.up.sql
RUN ls ./colouring-london/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql -d colouringlondon < $migration; done;

WORKDIR ./colouring-london/app
EXPOSE 8080
CMD /wait && PGPASSWORD=postgres PGDATABASE=colouringlondon PGUSER=dockeruser PGHOST=localhost PGPORT=5432 APP_COOKIE_SECRET=123456 npm start