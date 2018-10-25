-- Location fields

-- Building Name
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_name varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_location_name_len CHECK (length(location_name) < 90);
-- Building Number
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_number varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_location_number_len CHECK (length(location_number) < 10);
-- Street
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_street varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_location_street_len CHECK (length(location_street) < 90);
-- Address line 2
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_line_two varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_location_line_two_len CHECK (length(location_line_two) < 90);
-- Town
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_town varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_location_town_len CHECK (length(location_town) < 90);
-- Postcode
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_postcode varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_location_postcode_len CHECK (length(location_postcode) < 11);

-- Explicit coordinates (user-provided; see geometries table for polygons)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_latitude double precision;

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS location_longitude double precision;


-- Building age (main construction, facade)

-- Year built (best estimate)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS date_year smallint;
-- Year built (lower estimate)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS date_lower smallint;
-- Year built (upper estimate)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS date_upper smallint;
-- Date Source
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS date_source varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_date_source_len CHECK (length(date_source) < 150);
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS date_source_detail varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_date_source_detail_len CHECK (length(date_source_detail) < 500);

-- Facade date
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS facade_year smallint;
-- Facade date (upper)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS facade_upper smallint;
-- Facade date (lower)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS facade_lower smallint;
-- Facade date Source
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS facade_source varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_facade_source_len CHECK (length(facade_source) < 150);
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS facade_source_detail varchar;
ALTER TABLE buildings ADD CONSTRAINT buildings_facade_source_detail_len CHECK (length(facade_source_detail) < 500);


-- Size

-- Attic storeys
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS size_storeys_attic smallint DEFAULT 0;
-- Core storeys
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS size_storeys_core smallint DEFAULT 0;
-- Basement storeys
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS size_storeys_basement smallint DEFAULT 0;

-- Height to apex (m)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS size_height_apex real;
-- Ground floor area (m2)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS size_floor_area_ground real;
-- Total floor area (m2)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS size_floor_area_total real;
-- Frontage Width (m)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS size_width_frontage real;


-- Likes

-- Total likes (denormalised from up-to-one-vote-per-user)
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS likes_total integer DEFAULT 0;

-- Store users-buildings likes (many-to-many)
CREATE TABLE IF NOT EXISTS building_user_likes (
    building_like_id serial PRIMARY KEY,
    building_id integer REFERENCES buildings,
    user_id uuid REFERENCES users
);
CREATE INDEX building_likes_idx ON building_user_likes ( building_id );
CREATE INDEX user_likes_idx ON building_user_likes ( user_id );

-- One like per-building, per-user
-- ALTER TABLE building_user_likes ADD CONSTRAINT building_like_once UNIQUE (building_id, user_id);
