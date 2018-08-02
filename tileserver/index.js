/**
 * Serve tiles
 */
const path = require('path')

const express = require('express')
const mapnik = require('mapnik')
const SphericalMercator = require('@mapbox/sphericalmercator')

// config file with connection details
const config = require('../config.json')
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

// set up convertor (tile tms -> lat-lon envelope)
const mercator = new SphericalMercator({
    size: TILE_SIZE
});

// register datasource adapters for mapnik
if (mapnik.register_default_input_plugins) mapnik.register_default_input_plugins();

// set up app
const app = express()

function get_bbox(params){
    const { z, x, y } = params

    const int_z = parseInt(z);
    const int_x = parseInt(x);
    const int_y = parseInt(y);

    if (!int_x || !int_y || !int_z){
        console.error("Missing x or y or z")
        res.status(400).send({error:'Bad parameter'})
        return
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

    const postgis = new mapnik.Datasource(conf);
    layer.datasource = postgis;
    layer.styles = style_def

    map.load(
        path.join(__dirname, 'map_styles', 'polygon.xml'),
        { strict: true },
        function(err, map){
            if (err) throw err

            map.add_layer(layer)
            const im = new mapnik.Image(map.width, map.height)
            map.extent = bbox
            map.render(im, cb);
        }
    )
}

// basic geometry tiles
app.get('/outline/:z/:x/:y.png', function(req, res) {
    const bbox = get_bbox(req.params)
    const table_def = 'geometries'
    const style_def = ['polygon']
    render_tile(bbox, table_def, style_def, function(err, im) {
        if (err) throw err

        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(im.encodeSync('png'))
    })
});

// highlight single geometry
app.get('/highlight/:z/:x/:y.png', function(req, res) {
    const { highlight } = req.query
    const geometry_id = parseInt(highlight);
    if(!geometry_id) res.status(400).send({error:'Bad parameter'})
    const bbox = get_bbox(req.params)
    const table_def = `(
        select * from geometries 
        where geometry_id = ${geometry_id}
    ) as highlight`
    const style_def = ['highlight']
    render_tile(bbox, table_def, style_def, function(err, im) {
        if (err) throw err

        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(im.encodeSync('png'))
    })
});

// date_year choropleth
app.get('/date_year/:z/:x/:y.png', function(req, res) {
    const bbox = get_bbox(req.params)
    // const table_def = 'geometries'
    const table_def = `(
        SELECT 
            cast(
                b.building_doc->>'date_year'
                as integer
            ) as date_year,
            g.geometry_geom
        FROM 
            geometries as g, 
            buildings as b
        WHERE 
            g.geometry_id = b.geometry_id
        AND
            b.building_doc ? 'date_year'
    ) as outline`
    const style_def = ['date_year']
    render_tile(bbox, table_def, style_def, function(err, im) {
        if (err) throw err

        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(im.encodeSync('png'))
    })
});

app.listen(8082, () => console.log('Tile server listening on port 8082'))
