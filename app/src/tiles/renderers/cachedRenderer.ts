import { Image } from "mapnik";

import { TileParams, TileRenderer } from "../types";
import { TileCache } from "../tileCache";
import { formatParams } from "../util";

class CachedRenderer implements TileRenderer {
    constructor(
        /** Cache to use for tiles */
        public tileCache: TileCache,

        /** Renderer to use when tile hasn't been cached yet */
        public tileRenderer: TileRenderer
    ) {}

    async getTile(tileParams: TileParams, dataParams: any): Promise<Image> {
        try {
            const tile = await this.tileCache.get(tileParams);
            return tile;
        } catch(err) {
            const im = await this.tileRenderer.getTile(tileParams, dataParams);
            try {
                await this.tileCache.put(im, tileParams);
            } catch (err) {}
            return im;
        }
    }
}

export {
    CachedRenderer
};
