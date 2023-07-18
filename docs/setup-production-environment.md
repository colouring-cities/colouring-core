# Configuración de un entorno de producción

#### Nota
Esta guía asume que estás trabajando con el repositorio ['colouring-colombia'](https://github.com/osgeolabUD-org/colouring-colombia/). Si deseas usar un nombre personalizado entonces crea tu propio fork y cambia `'colouring-colombia'` a `'colouring-[nombre de tu ciudad]'`.

## Preliminares

Esta guía asume un entorno ejecutando Ubuntu 22.04.

### Instalar actualizaciones de paquetes

`sudo apt-get update`

`sudo apt-get dist-upgrade`


### Instala openSSH (si es necesario)

`sudo apt install openssh-server`

## Instalar Componentes Esenciales

### Instalar algunas herramientas útiles de desarrollo

`sudo apt-get install -y build-essential git vim-nox wget curl`

### Instalar Postgres y herramientas asociadas

`sudo apt-get install -y postgresql postgresql-contrib`

`sudo apt-get install -y libpq-dev postgresql-14-postgis-3 gdal-bin libspatialindex-dev libgeos-dev libproj-dev`

### Instalar Python 3 y pip

La versión 22.04 viene con Python 3 preinstalado, sin embargo es necesario instalar el gestor de paquetes pip:

`sudo apt-get install python3-pip`

### Instalar Nginx

`sudo apt install nginx`

## Instalar Colouring

### Clona el repositorio de colouring-colombia

`cd /var/www`

`sudo git clone https://github.com/osgeolabUD-org/colouring-colombia.git`

Crea un usuario del sistema (`nodeapp`) para que sea propietario de la carpeta colouring-colombia

`useradd -r -s /usr/sbin/nologin nodeapp`

Añade el usuario actual al grupo `nodeapp`

`sudo usermod -a -G nodeapp <tu_nombre_de_usuario_de_ubuntu>`

Hacer que el usuario/grupo `nodeapp` sea propietario (`chown`) del directorio `colouring-colombia` y sus subdirectorios

`sudo chown -R nodeapp:nodeapp /var/www/colouring-colombia`

Ahora establece los permisos apropiados en el directorio `colouring-colombia`

`sudo chmod -R 775 /var/www/colouring-colombia`


***


#### Instalar Node. 

Primero define un par de variables de entorno:

`NODE_VERSION=v12.14.1`

`DISTRO=linux-x64`

Obtén la distribución de Node e instálala

`wget -nc https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-$DISTRO.tar.xz`

`sudo mkdir /usr/local/lib/node`

`sudo tar xf node-$NODE_VERSION-$DISTRO.tar.xz -C /usr/local/lib/node`

`sudo mv /usr/local/lib/node/node-$NODE_VERSION-$DISTRO /usr/local/lib/node/node-$NODE_VERSION`

`rm node-$NODE_VERSION-$DISTRO.tar.xz`


Exporta la variable `NODE_JS_HOME` a tu perfil de bash

	cat >> ~/.profile <<EOF
 	export NODE_VERSION=v12.14.1
	export NODEJS_HOME=/usr/local/lib/node/node-$NODE_VERSION/bin
	export PATH=$NODEJS_HOME:$PATH
	EOF


Recarga tu perfil para asegurar que los cambios surtan efecto

`source ~/.profile`

***


#### Configurar Node

Ahora actualiza el gestor de paquetes `npm` a la versión más reciente con privilegios globales. Esto necesita ser realizado como usuario root, por lo que es necesario exportar las variables de node al perfil de usuario root.

`sudo su root`

`export NODEJS_HOME=/usr/local/lib/node/node-v12.14.1/bin/`

`export PATH=$NODEJS_HOME:$PATH`

`npm install -g npm@next`

`exit`

Ahora instala los paquetes Node requeridos como se designa en `package.json`

`cd /var/www/colouring-colombia/app && npm install`


***


#### Configurar Postgres

`sudo service postgresql start`

`sudo locale-gen en_US.UTF-8`

`sudo sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/14/main/postgresql.conf`

`echo "host    all             all             all                     md5" | sudo tee --append /etc/postgresql/14/main/pg_hba.conf > /dev/null`


Para producción no queremos usar nuestro nombre de usuario de Ubuntu como el nombre de usuario de Postgres. Por lo tanto, necesitamos reemplazar la autenticación de pares con la autenticación de contraseña para las conexiones locales. 

`sudo sed -i 's/^local.*all.*all.*peer$/local   all             all                                     md5/' /etc/postgresql/10/main/pg_hba.conf`


Reinicia Postgres para que los cambios de configuración surtan efecto

`sudo service postgresql restart`

Crea un usuario de Postgres

`sudo -u postgres psql -c "SELECT 1 FROM pg_user WHERE usename = '<nombre_de_usuario_postgres>';" | grep -q 1 || sudo -u postgres psql -c "CREATE ROLE <nombre_de_usuario_postgres> SUPERUSER LOGIN PASSWORD '<contraseña_postgres>';"`


Crea la base de datos predeterminada de colouring cities

`sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = 'colouringcitiesdb';" | grep -q 1 || sudo -u postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O colouring colouringcitiesdb`

`psql -d colouringcitiesdb -U <nombre_de_usuario_postgres> -c "create extension postgis;"`

`psql -d colouringcitiesdb -U <nombre_de_usuario_postgres> -c "create extension pgcrypto;"`

`psql -d colouringcitiesdb -U <nombre_de_usuario_postgres> -c "create extension pg_trgm;"`


Importa datos del volcado de base de datos más reciente de colouring cities

`pg_restore --no-privileges --no-owner --username "<nombre_de_usuario_postgres>" --dbname "colouringcitiesdb" --clean "<ruta/a/archivo/volcado/base_de_datos>"`


***


#### Configurar NGINX

Configura el firewall de linux

`sudo ufw allow 'Nginx HTTP'`

`sudo ufw allow OpenSSH`

`sudo ufw enable`

Podemos verificar el estado del firewall con

`sudo ufw status`


Ahora edita `sites-available/default` para crear una configuración mínima de Nginx para probar la instalación

`sudo nano /etc/nginx/sites-available/default`



	# Manejar conexiones HTTP con redirección
	server {
	    listen 80 default_server;
	    listen [::]:80 default_server;
	    server_name colouring-core;
	    
	    location / {
                proxy_pass http://localhost:3000/;
                proxy_set_header X-Real-IP $remote_addr;
       }

	}
	


Asegúrate de que no introdujiste ningún error de sintaxis escribiendo



`sudo nginx -t`

Reinicia Nginx para aplicar los cambios

`sudo systemctl restart nginx`


***

#### Configurar SSL con Let's Encrypt

Let’s Encrypt es una Autoridad de Certificación (AC) que proporciona certificados gratuitos para el cifrado de la Capa de Transporte Seguro (TLS). Ellos simplifican el proceso al proporcionar software que puede interactuar con sus servicios. El software que vamos a usar se llama Certbot.

Primero, añade el PPA de Certbot a tu lista de repositorios:

```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
```

A continuación, instala Certbot:

```
sudo apt-get install certbot python3-certbot-nginx
```

Ahora, puedes usar Certbot para solicitar un certificado para tu dominio:

```
sudo certbot --nginx -d tu-dominio.com
```

Sigue las instrucciones en pantalla para completar la configuración. Certbot modificará la configuración de Nginx para servir tu sitio a través de HTTPS y luego reiniciará el servicio.

Por último, puedes configurar la renovación automática del certificado. Certbot incluye un cronjob que renueva automáticamente los certificados antes de que caduquen. Asegúrate de que este cronjob esté habilitado y configurado correctamente:

```
sudo certbot renew --dry-run
```

Si el comando se ejecuta sin errores, entonces la renovación automática está configurada correctamente.

***

#### Arranca tu aplicación

Copia los archivos de configuración de muestra y edítalos como sea necesario

`cp .env.example .env`

`cp config.js.example config.js`


Finalmente, para lanzar la aplicación

`sudo su nodeapp`

`source ~/.profile`

`cd /var/www/colouring-core/app`

`node app.js`


Tu aplicación debería estar en funcionamiento y estar disponible en tu dominio.

