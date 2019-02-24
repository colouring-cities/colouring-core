/**
 * Tileserver routes for Express app
 *
 */
import express from 'express';

import { get, put } from './cache';
import { render_tile } from './tile';
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

    if (isNaN(int_x) || isNaN(int_y) || isNaN(int_z)){
        console.error("Missing x or y or z")
        return {error:'Bad parameter'}
    }

    get(tileset, int_z, int_x, int_y, (err, im) => {
        if (err) {
            render_tile(tileset, int_z, int_x, int_y, undefined, (err, im) => {
                if (err) throw err

                put(im, tileset, z, x, y, (err) => {
                    if (err) {
                        console.error(err)
                    }

                    res.writeHead(200, {'Content-Type': 'image/png'})
                    res.end(im)
                })

            })
        } else {
            res.writeHead(200, {'Content-Type': 'image/png'})
            res.end(im)
        }
    })

}

function handle_highlight_tile_request(req, res) {
    const { z, x, y } = req.params
    const int_z = strictParseInt(z);
    const int_x = strictParseInt(x);
    const int_y = strictParseInt(y);

    if (isNaN(int_x) || isNaN(int_y) || isNaN(int_z)){
        console.error("Missing x or y or z")
        return {error:'Bad parameter'}
    }

    // highlight layer uses geometry_id to outline a single building
    const { highlight } = req.query
    const geometry_id = strictParseInt(highlight);
    if(isNaN(geometry_id)){
        res.status(400).send({error:'Bad parameter'})
        return
    }

    render_tile('highlight', int_z, int_x, int_y, geometry_id, function(err, im) {
        if (err) throw err

        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(im)
    })
}

export default router;
