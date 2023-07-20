# Configuración de un entorno de producción

#### Nota
Esta guía asume que está trabajando con el repositorio ['colouring-colombia'](https://github.com/osgeolabUD-org/colouring-colombia/). Si desea usar un nombre personalizado entonces debe crear un fork y cambiar `'colouring-colombia'` a `'colouring-[nombre de la ciudad]'`.

## Preliminares

Esta guía asume un entorno ejecutando Ubuntu 22.04.

### Instalar actualizaciones de paquetes

`sudo apt-get update`

`sudo apt-get dist-upgrade`


### Instalar openSSH (si es necesario)

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

### Clonar el repositorio de colouring-colombia

`cd /var/www`

`sudo git clone https://github.com/osgeolabUD-org/colouring-colombia.git`

Crear un usuario del sistema (`nodeapp`) para que sea propietario de la carpeta colouring-colombia

`useradd -r -s /usr/sbin/nologin nodeapp`

Añadir el usuario actual al grupo `nodeapp`

`sudo usermod -a -G nodeapp <tu_nombre_de_usuario_de_ubuntu>`

Hacer que el usuario/grupo `nodeapp` sea propietario (`chown`) del directorio `colouring-colombia` y sus subdirectorios

`sudo chown -R nodeapp:nodeapp /var/www/colouring-colombia`

Ahora establecer los permisos apropiados en el directorio `colouring-colombia`

`sudo chmod -R 775 /var/www/colouring-colombia`

Nota: Para que los cambios tengan efecto debe reiniciar la sesión de trabajo del usuario (logout)
***


### Instalar Node. 

Primero definir un par de variables de entorno:

`NODE_VERSION=v12.14.1`

`DISTRO=linux-x64`

Obtener la distribución de Node e instalarla

`wget -nc https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-$DISTRO.tar.xz`

`sudo mkdir /usr/local/lib/node`

`sudo tar xf node-$NODE_VERSION-$DISTRO.tar.xz -C /usr/local/lib/node`

`sudo mv /usr/local/lib/node/node-$NODE_VERSION-$DISTRO /usr/local/lib/node/node-$NODE_VERSION`

`rm node-$NODE_VERSION-$DISTRO.tar.xz`

#### Agregar las variables de entorno

Para facilitar la instalación del ambiente de desarrollo se van a declarar un conjunto de variables de entorno de manera persistente.

1. Abrir el archivo .profile
```bash
nano ~/.profile
```

2. Copiar y pegar al final del archivo la definición de las siguientes variables de entorno. Tener en cuenta que los valores de usuarios y claves son solo de referencia y se recomienda personalizarla en cada instalación

```bash
export NODE_VERSION=v12.14.1
export DISTRO=linux-x64
export PGPASSWORD=<ReemplazarPorLaClaveDelUsuarioDePostgresql>
export PGUSER=<ReemplazarPorElUsuarioDePostgresql>
export PGHOST=localhost
export PGDATABASE=<ReemplazarPorElNombreDeLaBaseDeDatosDePostgresql>
export NODEJS_HOME=/usr/local/lib/node/node-$NODE_VERSION/bin
export PATH=$NODEJS_HOME:$PATH
export PGPORT=5432
export APP_COOKIE_SECRET=<ReemplazarPorLaClaveQueSeDesee>
export TILECACHE_PATH=/var/www/colouring-colombia/app/tilecache
```
Guardar el archivo (ctrl+x, ingresar Y y enter)

`source ~/.profile`

***
#### Configurar Node

Ahora actualizar el gestor de paquetes `npm` a la versión más reciente con privilegios globales y compatible con la versión de Node.js instalada. Esto necesita ser realizado como usuario root, por lo que es necesario exportar las variables de node al perfil de usuario root.

```bash

sudo su root
export NODEJS_HOME=/usr/local/lib/node/node-v12.14.1/bin/
export PATH=$NODEJS_HOME:$PATH
npm install -g npm@6.14.15
exit
```

Instalar los paquetes Node requeridos como se designa en `package.json`

`cd /var/www/colouring-colombia/app && npm install`

***

### Configurar Postgresql
```bash
sudo service postgresql start
sudo locale-gen en_US.UTF-8
sudo sed -i "s/#\?listen_address.*/listen_addresses '*'/" /etc/postgresql/14/main/postgresql.conf
echo "host    all             all             all                     md5" | sudo tee --append /etc/postgresql/14/main/pg_hba.conf > /dev/null
```

Para producción no queremos usar nuestro nombre de usuario de Ubuntu como el nombre de usuario de Postgres. Por lo tanto, necesitamos reemplazar la autenticación de pares con la autenticación de contraseña para las conexiones locales. 

`sudo sed -i 's/^local.*all.*all.*peer$/local   all             all                                     md5/' /etc/postgresql/10/main/pg_hba.conf`


Reiniciar Postgres para que los cambios de configuración surtan efecto

```bash
sudo service postgresql restart
```

Crear un usuario de Postgres

```bash
sudo -u postgres psql -c "SELECT 1 FROM pg_user WHERE usename = '<nombre_de_usuario_postgres>';" | grep -q 1 || sudo -u postgres psql -c "CREATE ROLE <nombre_de_usuario_postgres> SUPERUSER LOGIN PASSWORD '<contraseña_postgres>';"
```
Crea la base de datos predeterminada de colouring cities

```bash
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = 'colouringcitiesdb';" | grep -q 1 || sudo -u postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O colouring colouringcitiesdb
psql -d colouringcitiesdb -U <nombre_de_usuario_postgres> -c "create extension postgis;"
psql -d colouringcitiesdb -U <nombre_de_usuario_postgres> -c "create extension pgcrypto;"
psql -d colouringcitiesdb -U <nombre_de_usuario_postgres> -c "create extension pg_trgm;"
```
Importar datos de prueba

```bash
ls ~/colouring-colombia/migrations/*.up.sql 2>/dev/null | while read -r migration; do psql -d colouringcitiesdb < $migration; done;
```
***

### Configurar NGINX

Configura el firewall de linux

```bash
sudo ufw allow 'Nginx HTTP'
sudo ufw allow OpenSSH
sudo ufw enable
```
Podemos verificar el estado del firewall con

```bash
sudo ufw status
```
Editar `sites-available/default` para crear una configuración mínima de Nginx para probar la instalación

```bash
sudo nano /etc/nginx/sites-available/default
```
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
	
Verificar la integridad del archivo con:

`sudo nginx -t`

Reiniciar Nginx para aplicar los cambios

`sudo systemctl restart nginx`
#### Verificación básica
En este punto se puede verificar la instalación compilando y arrancando el servidor:

```bash
cd /var/www/colouring-colombia/app
npm run build
npm run start:prod
```
Desde un navegador ir a la ulr http://<reemplazarPorlaIpDelServidor>, debe aparecer la página de inicio del proyecto colouring.

En caso de necesitar asesoría colocar un issue en este repositorio o comunicarse con:
- osgeolabud@gmail.com
- paulocoronado@udistrital.edu.co

### Ejecutar la app como un proceso del sistema (daemon)
Dado que es un servidor de producción es necesario que la aplicación se ejecute como un proceso del sistema.

pm2 es un gestor de procesos que permite ejecutar las aplicaciones de Node como procesos de sistema

`sudo npm install pm2 -g`

Registrar y ejecutar la aplicación con pm2
`pm2 start npm --name "colouring-app" -- run start:prod`

Para asegurar que la aplicación se reinicie cuando existe un reinicio del servidor
```bash
pm2 save
pm2 startup
```
Si se desea deshabilitar dicho comportamiento (no recomendado)
`pm2 unstartup systemd`

### Configurar SSL con Let's Encrypt

Let’s Encrypt es una Autoridad de Certificación (AC) que proporciona certificados gratuitos para el cifrado de la Capa de Transporte Seguro (TLS). Ellos simplifican el proceso al proporcionar software que puede interactuar con sus servicios. El software que vamos a usar se llama Certbot.

Primero, añade el PPA de Certbot a tu lista de repositorios:

```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
```

A continuación, instala Certbot:

```bash
sudo apt-get install certbot python3-certbot-nginx
```

Ahora, puedes usar Certbot para solicitar un certificado para tu dominio:

```bash
sudo certbot --nginx -d tu-dominio.com
```

Sigue las instrucciones en pantalla para completar la configuración. Certbot modificará la configuración de Nginx para servir tu sitio a través de HTTPS y luego reiniciará el servicio.

Por último, puedes configurar la renovación automática del certificado. Certbot incluye un cronjob que renueva automáticamente los certificados antes de que caduquen. Asegúrate de que este cronjob esté habilitado y configurado correctamente:

```bash
sudo certbot renew --dry-run
```

Si el comando se ejecuta sin errores, entonces la renovación automática está configurada correctamente.

***

#### Arranca la aplicación

Copia los archivos de configuración de muestra y edítalos como sea necesario

`cp .env.example .env`

`cp config.js.example config.js`


Finalmente, para lanzar la aplicación

`sudo su nodeapp`

`source ~/.profile`

`cd /var/www/colouring-core/app`

`node app.js`


Tu aplicación debería estar en funcionamiento y estar disponible en tu dominio.

