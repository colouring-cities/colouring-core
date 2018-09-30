-- Drop all tables
ALTER TABLE buildings DROP COLUMN IF EXISTS revision_id;
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS user_categories;
DROP TABLE IF EXISTS user_access_levels;
DROP TABLE IF EXISTS building_properties;
DROP TABLE IF EXISTS buildings;
DROP TABLE IF EXISTS geometries;
