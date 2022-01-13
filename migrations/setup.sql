-- role for server-side of front end (HTTP POST)
CREATE ROLE echalstrey WITH LOGIN;
-- create/update, authenticate and authorise users
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE users, user_sessions TO echalstrey;
-- join users against categories and access levels
GRANT SELECT ON TABLE user_access_levels, user_categories TO echalstrey;
-- read/write building data
GRANT SELECT, UPDATE ON TABLE buildings TO echalstrey;
GRANT SELECT, INSERT, DELETE ON TABLE building_user_likes TO echalstrey;
GRANT SELECT ON TABLE building_properties TO echalstrey;
-- read geometry data
GRANT SELECT ON TABLE geometries TO echalstrey;
-- read/append to logs
GRANT SELECT, INSERT ON TABLE logs to echalstrey;
-- use id sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public to echalstrey;
-- use postgis/pgcrypto functions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO echalstrey;
-- read map search locations
GRANT SELECT ON TABLE search_locations to echalstrey;
-- add/save user building attribute verification
GRANT SELECT, INSERT, DELETE ON TABLE building_verification TO echalstrey;