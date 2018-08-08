# Database details

Initial setup, on first connection (replacing hostname and username):

```bash
$ psql "host={hostname} user={username} port=5432 sslmode=require dbname=postgres"
> create database colouringlondon;
> \c colouringlondon
> create extension postgis;
> create extension pgcrypto;
> \q
$ psql "host={hostname} user={username} port=5432 sslmode=require dbname=colouringlondon" < 001.create-core.up.sql
```

Create app users

```sql
-- role for server-side of front end (HTTP POST)
CREATE ROLE frontend WITH LOGIN;
-- create/update, authenticate and authorise users
GRANT SELECT, UPDATE, INSERT ON TABLE users TO frontend;
-- read/write building data
GRANT SELECT, UPDATE, INSERT ON TABLE buildings TO frontend;
-- read geometry data
GRANT SELECT ON TABLE geometries TO frontend;
-- read/append to logs
GRANT SELECT, INSERT ON TABLE log to frontend;
-- use id sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public to frontend;
-- use postgis/pgcrypto functions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO frontend;

-- role for /api routes (may be AJAX from web client, or 3rd-party client with key)
CREATE ROLE apiserver WITH LOGIN;
-- need to authenticate and authorize users
GRANT SELECT ON TABLE users TO apiserver;
-- read/write building data
GRANT SELECT, UPDATE, INSERT ON TABLE buildings TO apiserver;
-- read geometry data
GRANT SELECT ON TABLE geometries TO apiserver;
-- read/append to logs
GRANT SELECT, INSERT ON TABLE log to apiserver;
-- use id sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public to apiserver;
-- use postgis/pgcrypto functions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO apiserver;

-- role for /tiles routes
CREATE ROLE tileserver WITH LOGIN;
-- read building and geometry data
GRANT SELECT ON TABLE geometries, buildings TO tileserver;
-- use id sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public to tileserver;
-- use postgis functions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO tileserver;
```

Set or update passwords

```bash
psql -c "ALTER USER frontend WITH PASSWORD 'longsecurerandompassword1';"
psql -c "ALTER USER apiserver WITH PASSWORD 'longsecurerandompassword2';"
psql -c "ALTER USER tileserver WITH PASSWORD 'longsecurerandompassword3';"
```
