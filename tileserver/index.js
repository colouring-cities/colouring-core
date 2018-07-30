/**
 * Serve tiles
 */
const path = require('path')

const express = require('express')
const mapnik = require('mapnik')
const SphericalMercator = require('@mapbox/sphericalmercator')

// config file with connection details
const config = require('./config')
// db connection pool
const db = require('./db')

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

// send static files if the match stuff in 'public'
app.use(express.static('public'))

// root is index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname,'public', 'index.html')))

// building geometry by lat/lon - TODO join geometry against buildings, move to apiserver
app.get('/buildings', function(req, res){
    const { lng, lat } = req.query
    db.query(
        `SELECT geometry_id
        FROM geometries
        WHERE
        ST_Intersects(
            ST_Transform(
                ST_SetSRID(ST_MakePoint($1, $2), 4326),
                3857
            ),
            geometries.geometry_geom
        )
        `,
        [lng, lat]
    ).then(function(data){
        const rows = data.rows
        if (rows.length){
            res.send({geometry_id: rows[0].geometry_id})
        } else {
            res.status(404).send({error:'Not Found'})
        }
    }).catch(function(error){
        console.error('Error:', error)
        res.status(500).send({error:'Database error'})
    })
})

// basic geometry tiles - TODO join against buildings and start parameterising with style
app.get('/tiles/:z/:x/:y.png', function(req, res) {
    const { z, x, y } = req.params
    const { highlight } = req.query
    const geometry_id = parseInt(highlight);
    console.log(z, x, y, highlight)

    const int_z = parseInt(z);
    const int_x = parseInt(x);
    const int_y = parseInt(y);

    if (!int_x || !int_y || !int_z){
        console.error("Missing x or y or z")
        res.status(400).send({error:'Bad parameter'})
        return
    }

    var bbox = mercator.bbox(
        int_x,
        int_y,
        int_z,
        false,
        '900913'
    );

    var map = new mapnik.Map(TILE_SIZE, TILE_SIZE, PROJ4_STRING);
    map.bufferSize = TILE_BUFFER_SIZE;

    var layer = new mapnik.Layer('tile', PROJ4_STRING);
    var postgis = new mapnik.Datasource(get_datasource_config());
    layer.datasource = postgis;
    layer.styles = ['polygon'];

    if (geometry_id){
        var layer_h = new mapnik.Layer('highlight', PROJ4_STRING);
        var conf_h = get_datasource_config()
        conf_h.table = '(select * from geometries where geometry_id = '+geometry_id+') as highlight'

        var postgis_h = new mapnik.Datasource(conf_h);
        layer_h.datasource = postgis_h;
        layer_h.styles = ['highlight'];
    }

    map.load(
        path.join(__dirname, 'map_styles', 'polygon.xml'),
        { strict: true },
        function(err, map){
            if (err) throw err

            map.add_layer(layer)

            if(geometry_id){
                map.add_layer(layer_h)
            }

            var im = new mapnik.Image(map.width, map.height)

            map.extent = bbox
            map.render(im, function(err, im) {
                if (err) throw err

                res.writeHead(200, {'Content-Type': 'image/png'})
                res.end(im.encodeSync('png'))
            });
        }
    )
});

function get_datasource_config(){
    return {
        'table': 'geometries',
        'dbname': config.database.dbname,
        'user': config.database.user,
        'password': config.database.password,
        'port': config.database.port,
        'geometry_field': 'geometry_geom',
        'extent' : '-20005048.4188,-9039211.13765,19907487.2779,17096598.5401',
        'srid': 3857,
        'type': 'postgis'
    }
}

app.listen(3000, () => console.log('App listening on port 3000'))
