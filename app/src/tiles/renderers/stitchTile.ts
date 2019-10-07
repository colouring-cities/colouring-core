import sharp from 'sharp';

import { TileParams, RendererFunction, Tile } from "../types";
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
        {
            input: topLeft,
            top: 0,
            left: 0
        },
        {
            input: topRight,
            top: 0, 
            left: tileSize
        },
        {
            input: bottomLeft,
            top: tileSize,
            left: 0
        },
        {
            input: bottomRight,
            top: tileSize,
            left: tileSize
        }
    ]).png().toBuffer();
    
    return sharp(compositedBuffer)
        .resize(tileSize, tileSize, {fit: 'inside'})
        .png()
        .toBuffer();
}

export {
    stitchTile
};
