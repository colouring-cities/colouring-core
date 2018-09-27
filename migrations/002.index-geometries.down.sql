-- Drop geometric indexes

-- Spatial index over geometries
DROP INDEX IF EXISTS geometries_idx;

-- Source ID index over geometries
DROP INDEX IF EXISTS geometries_source_idx;

-- Index over building geometry_id (expect to look up building by geometry_id for map tiles)
DROP INDEX IF EXISTS building_geometry_idx;
