

-- Spatial index over building outlines
CREATE INDEX geometries_idx ON geometries USING GIST ( geometry_geom );

-- Index over building geometry (expect to look up building by geometry_id)
CREATE INDEX building_geometry_idx ON buildings ( geometry_id );
