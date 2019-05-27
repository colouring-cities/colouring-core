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
import { renderTile, getBbox, getXYZ, TILE_SIZE } from './tile';
import { strictParseInt } from '../parse';

// zoom level when we switch from rendering direct from database to instead composing tiles
// from the zoom level below - gets similar effect, with much lower load on Postgres
const STITCH_THRESHOLD = 12

// Hard-code extent so we can short-circuit rendering and return empty/transparent tiles outside the area of interest
// bbox in CRS espg:3957 in form: [w, s, e, n]
const EXTENT_BBOX = [-61149.622628, 6667754.851372, 28128.826409, 6744803.375884]

// tiles router
const router = express.Router()

router.get('/highlight/:z/:x/:y.png', handleHighlightTileRequest);

router.get('/base_light/:z/:x/:y.png', (req, res) => {
    handleTileRequest('base_light', req, res)
});

router.get('/base_night/:z/:x/:y.png', (req, res) => {
    handleTileRequest('base_night', req, res)
});

router.get('/date_year/:z/:x/:y.png', (req, res) => {
    handleTileRequest('date_year', req, res)
});

router.get('/size_storeys/:z/:x/:y.png', (req, res) => {
    handleTileRequest('size_storeys', req, res)
});

router.get('/location/:z/:x/:y.png', (req, res) => {
    handleTileRequest('location', req, res)
});

router.get('/likes/:z/:x/:y.png', (req, res) => {
    handleTileRequest('likes', req, res)
});

router.get('/conservation_area/:z/:x/:y.png', (req, res) => {
    handleTileRequest('conservation_area', req, res)
});

function handleTileRequest(tileset, req, res) {
    const { z, x, y } = req.params
    const intZ = strictParseInt(z);
    const intX = strictParseInt(x);
    const intY = strictParseInt(y);

    if (isNaN(intX) || isNaN(intY) || isNaN(intZ)) {
        console.error('Missing x or y or z')
        return { error: 'Bad parameter' }
    }

    loadTile(tileset, intZ, intX, intY).then((im) => {
        res.writeHead(200, { 'Content-Type': 'image/png' })
        res.end(im)
    }).catch((err) => {
        console.error(err)
        res.status(500).send({ error: err })
    })
}

function loadTile(tileset, z, x, y) {
    if (outsideExtent(z, x, y)) {
        return emptyTile()
    }
    return get(tileset, z, x, y).then((im) => {
        console.log(`From cache ${tileset}/${z}/${x}/${y}`)
        return im
    }).catch(() => {
        return renderOrStitchTile(tileset, z, x, y)
    })
}

function renderOrStitchTile(tileset, z, x, y) {
    if (z <= STITCH_THRESHOLD) {
        return StitchTile(tileset, z, x, y).then(im => {
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
            renderTile(tileset, z, x, y, undefined, (err, im) => {
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

function outsideExtent(z, x, y) {
    const xy = getXYZ(EXTENT_BBOX, z);
    return xy.minY > y || xy.maxY < y || xy.minX > x || xy.maxX < x;
}

function emptyTile() {
    return sharp({
        create: {
            width: 1,
            height: 1,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    }).png().toBuffer()
}

function StitchTile(tileset, z, x, y) {
    const bbox = getBbox(z, x, y)
    const nextZ = z + 1
    const nextXY = getXYZ(bbox, nextZ)

    return Promise.all([
    // recurse down through zoom levels, using cache if available...
        loadTile(tileset, nextZ, nextXY.minX, nextXY.minY),
        loadTile(tileset, nextZ, nextXY.maxX, nextXY.minY),
        loadTile(tileset, nextZ, nextXY.minX, nextXY.maxY),
        loadTile(tileset, nextZ, nextXY.maxX, nextXY.maxY)
    ]).then(([
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
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
            topLeft, { gravity: sharp.gravity.northwest }
        ).png().toBuffer().then((buf) => {
            return sharp(buf).overlayWith(
                topRight, { gravity: sharp.gravity.northeast }
            ).png().toBuffer()
        }).then((buf) => {
            return sharp(buf).overlayWith(
                bottomLeft, { gravity: sharp.gravity.southwest }
            ).png().toBuffer()
        }).then((buf) => {
            return sharp(buf).overlayWith(
                bottomRight, { gravity: sharp.gravity.southeast }
            ).png().toBuffer()
        }).then((buf) => {
            return sharp(buf
            ).resize(TILE_SIZE, TILE_SIZE, { fit: 'inside' }
            ).png().toBuffer()
        })
    });
}


function handleHighlightTileRequest(req, res) {
    const { z, x, y } = req.params
    const intZ = strictParseInt(z);
    const intX = strictParseInt(x);
    const intY = strictParseInt(y);

    if (isNaN(intX) || isNaN(intY) || isNaN(intZ)) {
        console.error('Missing x or y or z')
        return { error: 'Bad parameter' }
    }

    // highlight layer uses geometry_id to outline a single building
    const { highlight } = req.query
    const geometryId = strictParseInt(highlight);
    if (isNaN(geometryId)) {
        res.status(400).send({ error: 'Bad parameter' })
        return
    }

    if (outsideExtent(z, x, y)) {
        return emptyTile()
    }

    renderTile('highlight', intZ, intX, intY, geometryId, function (err, im) {
        if (err) {throw err}

        res.writeHead(200, { 'Content-Type': 'image/png' })
        res.end(im)
    })
}

export default router;
