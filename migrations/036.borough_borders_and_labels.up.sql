CREATE TABLE IF NOT EXISTS external_data_borough_boundary (
        -- internal unique id
        planning_entry_id serial PRIMARY KEY,

        -- geometry as EPSG:3857 avoiding reprojection for tiles
        geometry_id integer REFERENCES geometries,
        name VARCHAR(50)
);
