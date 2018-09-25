--
-- Geometries table
--
-- To store building outlines.
-- Geometries form the backbone, expected to be provided from other sources.
CREATE TABLE geometries (
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
CREATE TABLE buildings (
    -- internal unique id
    building_id serial PRIMARY KEY,
    -- jsonb document for all data, attributes to be specified in application
    building_doc jsonb,
    -- reference to geometry, aiming to decouple from geometry provider
    geometry_id integer REFERENCES geometries
);

--
-- User categories
--
-- Self-selected, optional categories
CREATE TABLE user_categories (
    category_id serial PRIMARY KEY,
    -- category name/short description
    category varchar(60)
);
INSERT INTO user_categories ( category_id, category ) VALUES ( 1, 'Not provided');

--
-- User access levels
--
-- If necessary for moderation
CREATE TABLE user_access_levels (
    access_level_id serial PRIMARY KEY,
    -- name/short description
    access_level varchar(60)
);
INSERT INTO user_access_levels ( access_level_id, access_level ) VALUES ( 1, 'untrusted');

--
-- Users table
--
-- Minimal user data to support login and edit history
CREATE TABLE users (
    -- internal unique id
    user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    -- username for login (required)
    username varchar(30) UNIQUE NOT NULL,
    -- email address for password reset (optional)
    email varchar(50) UNIQUE,
    -- password - as generated from hash(salt+password) via pgcrypto
    pass varchar(60),
    -- date registered
    registered timestamp default NOW(),
    -- user category (optional, self-selected)
    category integer REFERENCES user_categories NOT NULL DEFAULT 1,
    -- user access level (essential, default untrusted)
    access_level integer REFERENCES user_access_levels NOT NULL DEFAULT 1
);

CREATE INDEX user_username_idx ON users ( username );
CREATE INDEX user_email_idx ON users ( email );

--
-- User session table
--
--
CREATE TABLE user_sessions (
    sid varchar PRIMARY KEY,
    sess json NOT NULL,
    expire timestamp(6) NOT NULL
);

CREATE INDEX user_sessions_expire_idx on user_sessions ( expire );

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
    -- log from..to; only changed values (aim to be reversible)
    log_from jsonb,
    log_to jsonb,
    -- log user id
    user_id uuid REFERENCES users,
    -- log building id
    building_id integer REFERENCES buildings
);

CREATE INDEX log_timestamp_idx ON log ( log_timestamp );
CREATE INDEX log_user_idx ON log ( user_id );
CREATE INDEX log_building_idx ON log ( building_id );
