# Database setup

Initial setup, on first connection (replacing hostname, username, port, dbname as required):

```bash
$ psql "host={hostname} user={username} port={port} sslmode=require dbname=postgres"
> create database colouringlondon;
> \c colouringlondon
> create extension postgis;
> create extension pgcrypto;
> \q
```

To run all up migrations:

```bash
$ ls ./*.up.sql 2>/dev/null | while read -r migration; do psql < $migration; done;
```

Or all down migrations in reverse order:

```bash
$ ls -r ./*.down.sql 2>/dev/null | while read -r migration; do psql < $migration; done;
```

Create an app user:

```sql
-- role for server-side of front end (HTTP POST)
CREATE ROLE appusername WITH LOGIN;
-- create/update, authenticate and authorise users
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE users, user_sessions TO appusername;
-- join users against categories and access levels
GRANT SELECT ON TABLE user_access_levels, user_categories TO appusername;
-- read/write building data
GRANT SELECT, UPDATE ON TABLE buildings TO appusername;
GRANT SELECT, INSERT, DELETE ON TABLE building_user_likes TO appusername;
GRANT SELECT ON TABLE building_properties TO appusername;
-- read geometry data
GRANT SELECT ON TABLE geometries TO appusername;
-- read/append to logs
GRANT SELECT, INSERT ON TABLE logs to appusername;
-- use id sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public to appusername;
-- use postgis/pgcrypto functions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO appusername;
-- read map search locations
GRANT SELECT ON TABLE search_locations to appusername;
```

Set or update passwords:

```bash
psql -c "ALTER USER appusername WITH PASSWORD 'longsecurerandompassword';"
```

# File naming syntax
Initial up and down migrations as `###.name.up.sql` file number should be sequential and incremental to last migrations file number is same for up/down. If adjusting a prior migration syntax is `###.name.up.sql` 
