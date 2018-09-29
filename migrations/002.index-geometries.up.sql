-- Create indexes after bulk loading geometries and building records

-- Spatial index over geometries
CREATE INDEX IF NOT EXISTS geometries_idx ON geometries USING GIST ( geometry_geom );

-- Source ID index over geometries
CREATE INDEX IF NOT EXISTS geometries_source_idx ON geometries ( source_id );

-- Index over building geometry_id (expect to look up building by geometry_id for map tiles)
CREATE INDEX IF NOT EXISTS building_geometry_idx ON buildings ( geometry_id );
