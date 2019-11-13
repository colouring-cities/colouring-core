import sharp from 'sharp';

import { RendererFunction, Tile, TileParams } from "../types";
import { getBbox, getXYZ, TILE_SIZE } from "../util";


async function stitchTile({ tileset, z, x, y, scale }: TileParams, dataParams: any, renderTile: RendererFunction): Promise<Tile> {
    const bbox = getBbox(z, x, y);
    const nextZ = z + 1;
    const nextXY = getXYZ(bbox, nextZ);
    const tileSize = TILE_SIZE * scale;


    const [topLeft, topRight, bottomLeft, bottomRight] = await Promise.all([
        [nextXY.minX, nextXY.minY],
        [nextXY.maxX, nextXY.minY],
        [nextXY.minX, nextXY.maxY],
        [nextXY.maxX, nextXY.maxY]
    ].map(([x, y]) => renderTile({ tileset, z: nextZ, x, y, scale }, dataParams)));

    const compositedBuffer = await sharp({
        create: {
            width: tileSize * 2,
            height: tileSize * 2,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    }).composite([
        {input: topLeft, gravity: sharp.gravity.northwest},
        {input: topRight, gravity: sharp.gravity.northeast},
        {input: bottomLeft, gravity: sharp.gravity.southwest},
        {input: bottomRight, gravity: sharp.gravity.southeast}
    ]).png().toBuffer();
    
    return sharp(compositedBuffer)
        .resize(tileSize, tileSize, {fit: 'inside'})
        .png()
        .toBuffer();
}

export {
    stitchTile
};
