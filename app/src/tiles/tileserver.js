/**
 * Tileserver
 * - routes for Express app
 * - stitch tiles above a certain zoom level (compositing from sharply-rendered lower zooms)
 * - render empty tile outside extent of geographical area of interest
 *
 */
import express from 'express';
import sharp from 'sharp';

import { get, put } from './cache';
import { render_tile, get_bbox, get_xyz, TILE_SIZE } from './tile';
import { strictParseInt } from '../parse';

// zoom level when we switch from rendering direct from database to instead composing tiles
// from the zoom level below - gets similar effect, with much lower load on Postgres
const STITCH_THRESHOLD = 12

// Hard-code extent so we can short-circuit rendering and return empty/transparent tiles outside the area of interest
// bbox in CRS espg:3957 in form: [w, s, e, n]
const EXTENT_BBOX = [-61149.622628, 6667754.851372, 28128.826409, 6744803.375884]

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
        console.error('Missing x or y or z')
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
    if (outside_extent(z, x, y)) {
        return empty_tile()
    }
    return get(tileset, z, x, y).then((im) => {
        console.log(`From cache ${tileset}/${z}/${x}/${y}`)
        return im
    }).catch(() => {
        return render_or_stitch_tile(tileset, z, x, y)
    })
}

function render_or_stitch_tile(tileset, z, x, y) {
    if (z <= STITCH_THRESHOLD) {
        return stitch_tile(tileset, z, x, y).then(im => {
            return put(im, tileset, z, x, y).then(() => {
                console.log(`Stitch ${tileset}/${z}/${x}/${y}`)
                return im
            }).catch((err) => {
                console.error(err)
                return im
            })
        })
    } else {

        return new Promise((resolve, reject) => {
            render_tile(tileset, z, x, y, undefined, (err, im) => {
                if (err) {
                    reject(err)
                    return
                }
                put(im, tileset, z, x, y).then(() => {
                    console.log(`Render ${tileset}/${z}/${x}/${y}`)
                    resolve(im)
                }).catch((err) => {
                    console.error(err)
                    resolve(im)
                })
            })
        })
    }
}

function outside_extent(z, x, y) {
    const xy = get_xyz(EXTENT_BBOX, z);
    return xy.minY > y || xy.maxY < y || xy.minX > x || xy.maxX < x;
}

function empty_tile() {
    return sharp({
        create: {
            width: 1,
            height: 1,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    }).png().toBuffer()
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
                width: TILE_SIZE * 2,
                height: TILE_SIZE * 2,
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
            ).resize(TILE_SIZE, TILE_SIZE, { fit: 'inside' }
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
        console.error('Missing x or y or z')
        return { error: 'Bad parameter' }
    }

    // highlight layer uses geometry_id to outline a single building
    const { highlight } = req.query
    const geometry_id = strictParseInt(highlight);
    if (isNaN(geometry_id)) {
        res.status(400).send({ error: 'Bad parameter' })
        return
    }

    if (outside_extent(z, x, y)) {
        return empty_tile()
    }

    render_tile('highlight', int_z, int_x, int_y, geometry_id, function (err, im) {
        if (err) {throw err}

        res.writeHead(200, { 'Content-Type': 'image/png' })
        res.end(im)
    })
}

export default router;
