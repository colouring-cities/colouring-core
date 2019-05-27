/**
 * Render tiles
 *
 * Use mapnik to render map tiles from the database
 *
 * Styles have two sources of truth for colour ranges (could generate from single source?)
 * - XML style definitions in app/map_styles/polygon.xml
 * - front-end legend in app/src/frontend/legend.js
 *
 * Data is provided by the queries in MAP_STYLE_TABLE_DEFINITIONS below.
 *
 */
import path from 'path';
import mapnik from 'mapnik';
import SphericalMercator from '@mapbox/sphericalmercator';

// connection details from environment variables
const DATASOURCE_CONFIG = {
    'host': process.env.PGHOST,
    'dbname': process.env.PGDATABASE,
    'user': process.env.PGUSER,
    'password': process.env.PGPASSWORD,
    'port': process.env.PGPORT,
    'geometry_field': 'geometry_geom',
    'extent': '-20005048.4188,-9039211.13765,19907487.2779,17096598.5401',
    'srid': 3857,
    'type': 'postgis'
}

const TILE_SIZE = 256
const TILE_BUFFER_SIZE = 64
const PROJ4_STRING = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs +over';

// Mapnik uses table definitions to query geometries and attributes from PostGIS.
// The queries here are eventually used as subqueries when Mapnik fetches data to render a
// tile - so given a table definition like:
//      (SELECT geometry_geom FROM geometries) as def
// Mapnik will wrap it in a bbox query and PostGIS will eventually see something like:
//      SELECT AsBinary("geometry") AS geom from
//          (SELECT geometry_geom FROM geometries) as def
//      WHERE "geometry" && SetSRID('BOX3D(0,1,2,3)'::box3d, 3857)
// see docs: https://github.com/mapnik/mapnik/wiki/OptimizeRenderingWithPostGIS
const MAP_STYLE_TABLE_DEFINITIONS = {
    base_light: `(
        SELECT
            b.location_number as location_number,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`,
    base_night: `(
        SELECT
            b.location_number as location_number,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`,
    date_year: `(
        SELECT
            b.date_year as date_year,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`,
    size_storeys: `(
        SELECT
            (
                coalesce(b.size_storeys_attic, 0) +
                coalesce(b.size_storeys_core, 0)
            ) as size_storeys,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`,
    location: `(
        SELECT
            (
                case when b.location_name is null then 0 else 1 end +
                case when b.location_number is null then 0 else 1 end +
                case when b.location_street is null then 0 else 1 end +
                case when b.location_line_two is null then 0 else 1 end +
                case when b.location_town is null then 0 else 1 end +
                case when b.location_postcode is null then 0 else 1 end +
                case when b.location_latitude is null then 0 else 1 end +
                case when b.location_longitude is null then 0 else 1 end +
                case when b.ref_toid is null then 0 else 1 end +
                case when b.ref_osm_id is null then 0 else 1 end
            ) as location_info_count,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as location`,
    likes: `(
        SELECT
            g.geometry_geom,
            b.likes_total as likes
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
            AND b.likes_total > 0
    ) as location`,
    conservation_area: `(
        SELECT
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
            AND b.planning_in_conservation_area = true
    ) as conservation_area`
}

// register datasource adapters for mapnik database connection
if (mapnik.register_default_input_plugins) {
    mapnik.register_default_input_plugins();
}
// register fonts for text rendering
mapnik.register_default_fonts();

const mercator = new SphericalMercator({
    size: TILE_SIZE
});

function getBbox(z, x, y) {
    return mercator.bbox(x, y, z, false, '900913');
}

function getXYZ(bbox, z) {
    return mercator.xyz(bbox, z, false, '900913')
}

function renderTile(tileset, z, x, y, geometryId, cb) {
    const bbox = getBbox(z, x, y)

    const map = new mapnik.Map(TILE_SIZE, TILE_SIZE, PROJ4_STRING);
    map.bufferSize = TILE_BUFFER_SIZE;
    const layer = new mapnik.Layer('tile', PROJ4_STRING);

    const tableDefinition = (tileset === 'highlight') ?
        getHighlightTableDefinition(geometryId)
        : MAP_STYLE_TABLE_DEFINITIONS[tileset];

    const conf = Object.assign({ table: tableDefinition }, DATASOURCE_CONFIG)

    var postgis;
    try {
        postgis = new mapnik.Datasource(conf);
        layer.datasource = postgis;
        layer.styles = [tileset]

        map.load(
            path.join(__dirname, '..', 'map_styles', 'polygon.xml'),
            { strict: true },
            function (err, map) {
                if (err) {throw err}

                map.add_layer(layer)
                const im = new mapnik.Image(map.width, map.height)
                map.extent = bbox
                map.render(im, {}, (err, rendered) => {
                    if (err) {throw err}
                    rendered.encode('png', cb)
                });
            }
        )
    } catch (err) {
        console.error(err);
    }
}

// highlight single geometry, requires geometryId in the table query
function getHighlightTableDefinition(geometryId) {
    return `(
        SELECT
            g.geometry_geom
        FROM
            geometries as g
        WHERE
            g.geometry_id = ${geometryId}
    ) as highlight`
}


export { getBbox, getXYZ, renderTile, TILE_SIZE };
