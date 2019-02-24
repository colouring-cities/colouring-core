/**
 * Tileserver routes for Express app
 *
 */
import express from 'express';
import sharp from 'sharp';

import { get, put } from './cache';
import { render_tile, get_bbox, get_xyz } from './tile';
import { strictParseInt } from '../parse';

// tiles router
const router = express.Router()

router.get('/highlight/:z/:x/:y.png', handle_highlight_tile_request);

router.get('/base_light/:z/:x/:y.png', (req, res) => {
    handle_tile_request('base_light', req, res)
});

router.get('/base_night/:z/:x/:y.png', (req, res) => {
    handle_tile_request('base_night', req, res)
});

router.get('/date_year/:z/:x/:y.png', (req, res) => {
    handle_tile_request('date_year', req, res)
});

router.get('/size_storeys/:z/:x/:y.png', (req, res) => {
    handle_tile_request('size_storeys', req, res)
});

router.get('/location/:z/:x/:y.png', (req, res) => {
    handle_tile_request('location', req, res)
});

router.get('/likes/:z/:x/:y.png', (req, res) => {
    handle_tile_request('likes', req, res)
});

router.get('/conservation_area/:z/:x/:y.png', (req, res) => {
    handle_tile_request('conservation_area', req, res)
});

function handle_tile_request(tileset, req, res) {
    const { z, x, y } = req.params
    const int_z = strictParseInt(z);
    const int_x = strictParseInt(x);
    const int_y = strictParseInt(y);

    if (isNaN(int_x) || isNaN(int_y) || isNaN(int_z)) {
        console.error("Missing x or y or z")
        return { error: 'Bad parameter' }
    }

    load_tile(tileset, int_z, int_x, int_y).then((im) => {
        res.writeHead(200, { 'Content-Type': 'image/png' })
        res.end(im)
    }).catch((err) => {
        console.error(err)
        res.status(500).send({ error: err })
    })
}

function load_tile(tileset, z, x, y) {
    return new Promise((resolve) => {
        get(tileset, z, x, y, (err, im) => {
            if (err) {
                render_or_stitch_tile(tileset, z, x, y)
                    .then((im) => {
                        resolve(im)
                    })
            } else {
                console.log(`From cache ${tileset}/${z}/${x}/${y}`)
                resolve(im)
            }
        })
    })
}

function render_or_stitch_tile(tileset, z, x, y) {
    const STITCH_THRESHOLD = 12
    if (z <= STITCH_THRESHOLD) {

        return stitch_tile(tileset, z, x, y).then(im => {
            return new Promise((resolve, reject) => {
                put(im, tileset, z, x, y, (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log(`Stitch ${tileset}/${z}/${x}/${y}`)
                    }
                    resolve(im)
                })
            })
        })
    } else {

        return new Promise((resolve, reject) => {
            render_tile(tileset, z, x, y, undefined, (err, im) => {
                if (err) {
                    reject(err)
                    return
                }
                put(im, tileset, z, x, y, (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log(`Render ${tileset}/${z}/${x}/${y}`)
                    }
                    resolve(im)
                })
            })
        })
    }
}

function stitch_tile(tileset, z, x, y) {
    const bbox = get_bbox(z, x, y)
    const next_z = z + 1
    const next_xy = get_xyz(bbox, next_z)

    return Promise.all([
        // recurse down through zoom levels, using cache if available...
        load_tile(tileset, next_z, next_xy.minX, next_xy.minY),
        load_tile(tileset, next_z, next_xy.maxX, next_xy.minY),
        load_tile(tileset, next_z, next_xy.minX, next_xy.maxY),
        load_tile(tileset, next_z, next_xy.maxX, next_xy.maxY)
    ]).then(([
        top_left,
        top_right,
        bottom_left,
        bottom_right
    ]) => {
        // not possible to chain overlays in a single pipeline, but there may still be a better
        // way to create image buffer here (four tiles resize to one at the next zoom level)
        // instead of repeatedly creating `sharp` objects, to png, to buffer...
        return sharp({
            create: {
                width: 512,
                height: 512,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        }).overlayWith(
            top_left, { gravity: sharp.gravity.northwest }
        ).png().toBuffer().then((buf) => {
            return sharp(buf).overlayWith(
                top_right, { gravity: sharp.gravity.northeast }
            ).png().toBuffer()
        }).then((buf) => {
            return sharp(buf).overlayWith(
                bottom_left, { gravity: sharp.gravity.southwest }
            ).png().toBuffer()
        }).then((buf) => {
            return sharp(buf).overlayWith(
                bottom_right, { gravity: sharp.gravity.southeast }
            ).png().toBuffer()
        }).then((buf) => {
            return sharp(buf
            ).resize(256, 256, { fit: 'inside' }
            ).png().toBuffer()
        })
    });
}


function handle_highlight_tile_request(req, res) {
    const { z, x, y } = req.params
    const int_z = strictParseInt(z);
    const int_x = strictParseInt(x);
    const int_y = strictParseInt(y);

    if (isNaN(int_x) || isNaN(int_y) || isNaN(int_z)) {
        console.error("Missing x or y or z")
        return { error: 'Bad parameter' }
    }

    // highlight layer uses geometry_id to outline a single building
    const { highlight } = req.query
    const geometry_id = strictParseInt(highlight);
    if (isNaN(geometry_id)) {
        res.status(400).send({ error: 'Bad parameter' })
        return
    }

    render_tile('highlight', int_z, int_x, int_y, geometry_id, function (err, im) {
        if (err) throw err

        res.writeHead(200, { 'Content-Type': 'image/png' })
        res.end(im)
    })
}

export default router;
