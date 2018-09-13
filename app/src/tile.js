import path from 'path';
import mapnik from 'mapnik';
import SphericalMercator from '@mapbox/sphericalmercator';

import { strictParseInt } from './parse';

// config file with connection details
const config = require('../../config.json')
const DATASOURCE_CONFIG = {
    'dbname': config.database.dbname,
    'user': config.database.user,
    'password': config.database.password,
    'port': config.database.port,
    'geometry_field': 'geometry_geom',
    'extent' : '-20005048.4188,-9039211.13765,19907487.2779,17096598.5401',
    'srid': 3857,
    'type': 'postgis'
}

const TILE_SIZE = 256
const TILE_BUFFER_SIZE = 64
const PROJ4_STRING = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs +over';

// register datasource adapters for mapnik
if (mapnik.register_default_input_plugins) mapnik.register_default_input_plugins();
mapnik.register_default_fonts();

const mercator = new SphericalMercator({
    size: TILE_SIZE
});

function get_bbox(params){
    const { z, x, y } = params
    const int_z = strictParseInt(z);
    const int_x = strictParseInt(x);
    const int_y = strictParseInt(y);

    if (isNaN(int_x) || isNaN(int_y) || isNaN(int_z)){
        console.error("Missing x or y or z")
        return {error:'Bad parameter'}
    }

    return mercator.bbox(
        int_x,
        int_y,
        int_z,
        false,
        '900913'
    );
}

function render_tile(bbox, table_def, style_def, cb){
    const map = new mapnik.Map(TILE_SIZE, TILE_SIZE, PROJ4_STRING);
    map.bufferSize = TILE_BUFFER_SIZE;

    const layer = new mapnik.Layer('tile', PROJ4_STRING);
    const conf = Object.assign({table: table_def}, DATASOURCE_CONFIG)

    var postgis;
    try {
        postgis = new mapnik.Datasource(conf);
        layer.datasource = postgis;
        layer.styles = style_def

        map.load(
            path.join(__dirname, '..', 'map_styles', 'polygon.xml'),
            { strict: true },
            function(err, map){
                if (err) {
                    console.error(err);
                    return
                }

                map.add_layer(layer)
                const im = new mapnik.Image(map.width, map.height)
                map.extent = bbox
                map.render(im, cb);
            }
        )
    } catch(err) {
        console.error(err);
    }
}

export { get_bbox, render_tile };
