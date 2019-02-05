--
-- Set up search table for text search over locations
--
-- uses extension: CREATE EXTENSION pg_trgm;
--

CREATE TABLE IF NOT EXISTS search_locations (
    -- internal unique id
    search_id serial PRIMARY KEY,
    -- string to match against in search (E1 0AB / Hackney / Commercial Road...)
    search_str text,
    -- search class for hint (postcode / borough / road name...)
    search_class text,
    -- geometry as EPSG:4326 (lat-long) to be used in front end directly
    center geometry(POINT, 4326),
    -- zoom level
    zoom int
);

-- Index for fuzzy match
-- see https://www.postgresql.org/docs/current/pgtrgm.html
-- and https://www.postgresql.org/docs/current/textsearch-indexes.html
--
-- Should support (I)LIKE or similarity searches:
-- - SELECT * FROM search_locations WHERE search_str ILIKE 'e1%'
-- - SELECT *, search_str <-> 'searchterm' AS dist FROM search_locations ORDER BY dist LIMIT 5;
-- - SELECT *, similarity(search_str, 'searchterm') AS dist FROM search_locations
--       WHERE t % 'searchterm' ORDER BY dist ASC, t LIMIT 5;
-- Docs suggest the '<->' query will perform better than the 'similarity', when only a small
-- number of closest matches are desired, if combined with a GIST index,
CREATE INDEX trgm_gist_idx_search_str ON search_locations USING GIST (search_str gist_trgm_ops);
