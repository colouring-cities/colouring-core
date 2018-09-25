# Database setup

Initial setup, on first connection (replacing hostname, username, port, dbname as required):

```bash
$ psql "host={hostname} user={username} port={port} sslmode=require dbname=postgres"
> create database colouringlondon;
> \c colouringlondon
> create extension postgis;
> create extension pgcrypto;
> \q
$ psql "host={hostname} user={username} port={port} sslmode=require dbname=colouringlondon" < 001.create-core.up.sql
```

Create an app user:

```sql
-- role for server-side of front end (HTTP POST)
CREATE ROLE appusername WITH LOGIN;
-- create/update, authenticate and authorise users
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE users TO appusername;
-- join users against categories and access levels
GRANT SELECT ON TABLE user_access_levels, user_categories TO appusername;
-- read/write building data
GRANT SELECT, UPDATE ON TABLE buildings TO appusername;
-- read geometry data
GRANT SELECT ON TABLE geometries TO appusername;
-- read/append to logs
GRANT SELECT, INSERT ON TABLE logs to appusername;
-- use id sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public to appusername;
-- use postgis/pgcrypto functions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO appusername;
```

Set or update passwords:

```bash
psql -c "ALTER USER appusername WITH PASSWORD 'longsecurerandompassword';"
```
