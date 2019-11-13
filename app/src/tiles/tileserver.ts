/**
 * Tileserver
 * - routes for Express app
 * - see rendererDefinition for actual rules of rendering
 */
import express from 'express';

import asyncController from '../api/routes/asyncController';
import { strictParseInt } from '../parse';

import { allTilesets, renderTile } from './rendererDefinition';
import { TileParams } from './types';

const handleTileRequest = asyncController(async function (req: express.Request, res: express.Response) {
    try {
        var tileParams = parseTileParams(req.params);
        var dataParams = req.query;
    } catch(err) {
        console.error(err);
        return res.status(400).send({error: err.message});
    }
    
    try {
        const im = await renderTile(tileParams, dataParams);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(im);
    } catch(err) {
        console.error(err);
        res.status(500).send({ error: err });
    }
});

// tiles router
const router = express.Router();

router.get('/:tileset/:z/:x/:y(\\d+):scale(@\\dx)?.png', handleTileRequest);

function parseTileParams(params: any): TileParams {
    const { tileset, z, x, y, scale } = params;

    if (!allTilesets.includes(tileset)) throw new Error('Invalid value for tileset');
    
    const intZ = strictParseInt(z);
    if (isNaN(intZ)) throw new Error('Invalid value for z');

    const intX = strictParseInt(x);
    if (isNaN(intX)) throw new Error('Invalid value for x');

    const intY = strictParseInt(y);
    if (isNaN(intY)) throw new Error('Invalid value for y');

    let intScale: number;
    if (scale === '@2x') {
        intScale = 2;
    } else if (scale === '@1x' || scale == undefined) {
        intScale = 1;
    } else {
        throw new Error('Invalid value for scale');
    }

    return {
        tileset,
        z: intZ,
        x: intX,
        y: intY,
        scale: intScale
    };
}

router.use((req, res) => {
    return res.status(404).send('Tile not found');
});

export default router;
