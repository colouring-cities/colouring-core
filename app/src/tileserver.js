/**
 * Tileserver routes for Express app
 *
 */
import express from 'express';

import { get_bbox, render_tile } from './tile';
import { strictParseInt } from './parse';

// tiles router
const router = express.Router()

// basic geometry tiles
router.get('/outline/:z/:x/:y.png', function(req, res) {
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
router.get('/highlight/:z/:x/:y.png', function(req, res) {
    const { highlight } = req.query
    const geometry_id = strictParseInt(highlight);
    if(isNaN(geometry_id)){
        res.status(400).send({error:'Bad parameter'})
        return
    }
    const bbox = get_bbox(req.params)
    const table_def = `(
        SELECT
            g.geometry_id = ${geometry_id} as focus,
            b.location_number as location_number,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as highlight`
    const style_def = ['highlight']
    render_tile(bbox, table_def, style_def, function(err, im) {
        if (err) throw err

        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(im.encodeSync('png'))
    })
});

// date_year choropleth
router.get('/date_year/:z/:x/:y.png', function(req, res) {
    const bbox = get_bbox(req.params)
    // const table_def = 'geometries'
    const table_def = `(
        SELECT
            b.date_year as date_year,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`
    const style_def = ['date_year']
    render_tile(bbox, table_def, style_def, function(err, im) {
        if (err) throw err

        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(im.encodeSync('png'))
    })
});

// date_year choropleth
router.get('/size_storeys/:z/:x/:y.png', function(req, res) {
    const bbox = get_bbox(req.params)
    // const table_def = 'geometries'
    const table_def = `(
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
    ) as outline`
    const style_def = ['size_storeys']
    render_tile(bbox, table_def, style_def, function(err, im) {
        if (err) throw err

        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(im.encodeSync('png'))
    })
});

export default router;
