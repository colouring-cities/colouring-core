-- Building verification

-- Users can verify the correctness of individual building attribute values.

-- For a building, it's most useful to know the count of verifications of each
-- attribute with current (or past) values.

-- For a user, it's useful to show which attributes they have already verified
-- on a given building.


-- Store user-building-attribute verification
CREATE TABLE IF NOT EXISTS building_verification (
    verification_id serial PRIMARY KEY,
    verification_timestamp TIMESTAMP default NOW(),
    building_id integer REFERENCES buildings,
    user_id uuid REFERENCES users,
    attribute varchar, -- bit of a hack to refer to any `buildings` table column name
    verified_value jsonb -- bit of a hack to include "any" value
);
CREATE INDEX building_verification_idx ON building_verification ( building_id );
CREATE INDEX user_verification_idx ON building_verification ( user_id );
CREATE INDEX building_user_verification_idx ON building_verification ( building_id, user_id );

-- Enforce that a user only has one opinion about the correct value of an 
-- attribute for a given building (don't need to allow multiple verified_values)
ALTER TABLE building_verification ADD CONSTRAINT verify_building_attribute_once 
    UNIQUE ( building_id, user_id, attribute );
