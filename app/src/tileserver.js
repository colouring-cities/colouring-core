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
router.get('/base_light/:z/:x/:y.png', function(req, res) {
    const bbox = get_bbox(req.params)
    const table_def = `(
        SELECT
            b.location_number as location_number,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`
    const style_def = ['base_light']
    render_tile(bbox, table_def, style_def, function(err, im) {
        if (err) throw err

        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(im.encodeSync('png'))
    })
});

// dark theme
router.get('/base_night/:z/:x/:y.png', function(req, res) {
    const bbox = get_bbox(req.params)
    const table_def = `(
        SELECT
            b.location_number as location_number,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`
    const style_def = ['base_night']
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

// location information depth
router.get('/location/:z/:x/:y.png', function(req, res) {
    const bbox = get_bbox(req.params)
    const table_def = `(
        SELECT
            (
                case when b.location_name is null then 0 else 1 end +
                case when b.location_number is null then 0 else 1 end +
                case when b.location_street is null then 0 else 1 end +
                case when b.location_line_two is null then 0 else 1 end +
                case when b.location_town is null then 0 else 1 end +
                case when b.location_postcode is null then 0 else 1 end +
                case when b.location_latitude is null then 0 else 1 end +
                case when b.location_longitude is null then 0 else 1 end
            ) as location_info_count,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as location`
    const style_def = ['location_info_count']
    render_tile(bbox, table_def, style_def, function(err, im) {
        if (err) throw err

        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(im.encodeSync('png'))
    })
});


// location information depth
router.get('/likes/:z/:x/:y.png', function(req, res) {
    const bbox = get_bbox(req.params)
    const table_def = `(
        SELECT
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
            AND b.likes_total > 0
    ) as location`
    const style_def = ['likes']
    render_tile(bbox, table_def, style_def, function(err, im) {
        if (err) throw err

        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(im.encodeSync('png'))
    })
});

export default router;
