--
-- Geometries table
--
-- To store building outlines.
-- Geometries form the backbone, expected to be provided from other sources.
CREATE TABLE geometries (
    -- integer for internal unique id
    -- may consider guid for global uniqueness
    geometry_id serial PRIMARY KEY,
    -- jsonb document for all data, source ID, attributes
    geometry_doc jsonb,
    -- geometry as EPSG:3857 avoiding reprojection for tiles
    geometry_geom geometry(POLYGON, 3857)
);

-- Spatial index over building outlines
CREATE INDEX geometries_idx ON geometries USING GIST ( geometry_geom );

--
-- Buildings table
--
-- To store collected data.
-- This is the core dataset to be collected by the application.
CREATE TABLE buildings (
    -- integer for internal unique id
    -- may consider guid for global uniqueness
    building_id serial PRIMARY KEY,
    -- jsonb document for all data, attributes to be specified in application
    building_doc jsonb,
    -- reference to geometry, aiming to decouple from geometry provider
    geometry_id integer REFERENCES geometries
);

-- Index over building geometry (expect to look up building by geometry_id)
CREATE INDEX building_geometry_idx ON buildings ( geometry_id );

--
-- Users table
--
-- Minimal user data to support login and edit history
CREATE TABLE users (
    -- internal unique id
    user_id uuid PRIMARY KEY,
    -- username for login (required)
    username varchar(30) UNIQUE NOT NULL,
    -- email address for password reset (optional)
    email varchar(50),
    -- password - as generated from hash(salt+password) via pgcrypto
    pass varchar(60)
);

CREATE INDEX user_username_idx ON users ( username );
CREATE INDEX user_email_idx ON users ( email );

--
-- Log table
--
-- To store all changes to building data, recording users and change in data
-- over time.
CREATE TABLE log (
    -- integer for internal unique id
    log_id bigserial PRIMARY KEY,
    -- default timestamp to time now
    log_timestamp TIMESTAMP default NOW(),
    -- log document to be extended in application
    -- log change diff (CREATE/UPDATE/DELETE)
    log_doc jsonb,
    -- log user id
    user_id uuid REFERENCES users,
    -- log building id
    building_id integer REFERENCES buildings
);

CREATE INDEX log_timestamp_idx ON log ( log_timestamp );
CREATE INDEX log_user_idx ON log ( user_id );
CREATE INDEX log_building_idx ON log ( building_id );
