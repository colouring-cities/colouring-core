import { TileCache } from "../tileCache";
import { RendererFunction, Tile, TileParams } from "../types";


async function getTileWithCaching(tileParams: TileParams, dataParams: any, tileCache: TileCache, renderTile: RendererFunction): Promise<Tile> {
    try {
        const tile = await tileCache.get(tileParams);
        return tile;
    } catch (err) {
        const im = await renderTile(tileParams, dataParams);
        try {
            await tileCache.put(im, tileParams);
        } catch (err) {}
        return im;
    }
}


export {
    getTileWithCaching
};
