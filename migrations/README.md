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
