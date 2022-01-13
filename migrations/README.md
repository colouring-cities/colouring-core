# Database setup

Initial setup, on first connection (replacing hostname, username, port, dbname as required):

```bash
$ psql "host={hostname} user={username} port={port} sslmode=require dbname=postgres"
> create database colouringlondon;
> \c colouringlondon
> create extension postgis;
> create extension pgcrypto;
> create extension pg_trgm;
> \q
```

To run all up migrations:

OSX:
```bash
$ bash up_migrate.sh
```

Or all down migrations in reverse order:

```bash
$ ls -r ./*.down.sql 2>/dev/null | while read -r migration; do psql < $migration; done;
```

Create an app user:

```bash
$ psql -d colouringlondon -f setup.sql
```

Set or update passwords:

```bash
psql -c "ALTER USER appusername WITH PASSWORD 'longsecurerandompassword';"
```

## File naming syntax

Initial up and down migrations as `###.name.up.sql` file number should be sequential
and incremental to last migrations file number is same for up/down.

If adjusting a prior migration syntax is:

    ###.name.up.sql

Syntax for adding to existing migration:

    0##.filename-extension-#.up.sql

