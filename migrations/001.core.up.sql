--
-- Geometries table
--
-- To store building outlines.
-- Geometries form the backbone, expected to be provided from other sources.
CREATE TABLE IF NOT EXISTS geometries (
    -- internal unique id
    geometry_id serial PRIMARY KEY,
    -- cross-reference to data source id
    source_id varchar(30),
    -- geometry as EPSG:3857 avoiding reprojection for tiles
    geometry_geom geometry(POLYGON, 3857)
);

--
-- Buildings table
--
-- To store collected data.
-- This is the core dataset to be collected by the application.
CREATE TABLE IF NOT EXISTS buildings (
    -- internal unique id
    building_id serial PRIMARY KEY,
    -- unique property reference number
    ref_uprn bigint,
    -- OS MasterMap topo id
    ref_toid varchar,
    -- OSM reference id
    ref_osm_id bigint,
    -- jsonb document for all data, attributes to be specified in application
    building_doc jsonb,
    -- reference to geometry, aiming to decouple from geometry provider
    geometry_id integer REFERENCES geometries
);
ALTER TABLE buildings ADD CONSTRAINT buildings_ref_toid_len CHECK (length(ref_toid) < 90);

--
-- User categories
--
-- Self-selected, optional categories
CREATE TABLE IF NOT EXISTS user_categories (
    category_id serial PRIMARY KEY,
    -- category name/short description
    category varchar
);
INSERT INTO user_categories ( category_id, category ) VALUES ( 1, 'Not provided');

--
-- User access levels
--
-- If necessary for moderation
CREATE TABLE IF NOT EXISTS user_access_levels (
    access_level_id serial PRIMARY KEY,
    -- name/short description
    access_level varchar
);
INSERT INTO user_access_levels ( access_level_id, access_level ) VALUES ( 1, 'untrusted');

--
-- Users table
--
-- Minimal user data to support login and edit history
CREATE TABLE IF NOT EXISTS users (
    -- internal unique id
    user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    -- username for login (required)
    username varchar UNIQUE NOT NULL,
    -- email address for password reset (optional)
    email varchar UNIQUE,
    -- password - as generated from hash(salt+password) via pgcrypto
    pass varchar,
    -- date registered
    registered timestamp default NOW(),
    -- user category (optional, self-selected)
    category integer REFERENCES user_categories NOT NULL DEFAULT 1,
    -- user access level (essential, default untrusted)
    access_level integer REFERENCES user_access_levels NOT NULL DEFAULT 1
);
ALTER TABLE users ADD CONSTRAINT users_username_len CHECK (length(username) < 30);
ALTER TABLE users ADD CONSTRAINT users_email_len CHECK (length(email) < 50);
ALTER TABLE users ADD CONSTRAINT users_pass_len CHECK (length(pass) < 60);

CREATE INDEX IF NOT EXISTS user_username_idx ON users ( username );
CREATE INDEX IF NOT EXISTS user_email_idx ON users ( email );

--
-- User session table
--
CREATE TABLE IF NOT EXISTS user_sessions (
    sid varchar PRIMARY KEY,
    sess json NOT NULL,
    expire timestamp(6) NOT NULL
);

CREATE INDEX IF NOT EXISTS user_sessions_expire_idx on user_sessions ( expire );

--
-- Logs table
--
-- To store all changes to building data, recording users and change in data
-- over time.
CREATE TABLE IF NOT EXISTS logs (
    -- integer for internal unique id
    log_id bigserial PRIMARY KEY,
    -- default timestamp to time now
    log_timestamp TIMESTAMP default NOW(),
    -- log document to be extended in application
    -- log from..to; only changed values (aim to be reversible)
    log_from jsonb,
    log_to jsonb,
    -- log user id
    user_id uuid REFERENCES users,
    -- log building id
    building_id integer REFERENCES buildings
);

CREATE INDEX IF NOT EXISTS log_timestamp_idx ON logs ( log_timestamp );
CREATE INDEX IF NOT EXISTS log_user_idx ON logs ( user_id );
CREATE INDEX IF NOT EXISTS log_building_idx ON logs ( building_id );
