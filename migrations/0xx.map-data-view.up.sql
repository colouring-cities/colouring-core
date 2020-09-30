CREATE PROCEDURE update_map_data_view()
LANGUAGE SQL
AS $$
    CREATE OR REPLACE VIEW map_data AS
        SELECT g.geometry_geom AS geometry,
            b.*
        FROM buildings b
        JOIN geometries g ON b.geometry_id = g.geometry_id;
$$;

CALL update_map_data_view();