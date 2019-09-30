import { Image } from "mapnik";

import { BoundingBox, TileParams, TileRenderer } from "../types";
import { getXYZ } from "../util";

class WindowedRenderer implements TileRenderer {
    constructor(
        /** Bounding box defining the renderer window */
        public bbox: BoundingBox,
        
        /** Renderer to use for tile requests inside window */
        public insideWindowRenderer: TileRenderer,

        /** Renderer to use for tile requests outside window */
        public outsideWindowRenderer: TileRenderer
    ) {}

    getTile(tileParams: TileParams, dataParams: any): Promise<Image> {
        if(this.isOutsideExtent(tileParams)) {
            return this.outsideWindowRenderer.getTile(tileParams, dataParams);
        } else {
            return this.insideWindowRenderer.getTile(tileParams, dataParams);
        }
    }

    private isOutsideExtent({x, y, z}: TileParams) {
        const xy = getXYZ(this.bbox, z);
        return xy.minY > y || xy.maxY < y || xy.minX > x || xy.maxX < x;
    }
}

export {
    WindowedRenderer
};
