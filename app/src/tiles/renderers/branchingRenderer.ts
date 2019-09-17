import { Image } from "mapnik";

import { TileParams, TileRenderer } from "../types";

class BranchingRenderer {
    constructor(
        public branchTestFn: (tileParams: TileParams) => boolean,
        public trueResultTileRenderer: TileRenderer,
        public falseResultTileRenderer: TileRenderer
    ) {}

    getTile(tileParams: TileParams, dataParams: any): Promise<Image> {
        if(this.branchTestFn(tileParams)) {
            return this.trueResultTileRenderer.getTile(tileParams, dataParams);
        } else {
            return this.falseResultTileRenderer.getTile(tileParams, dataParams);
        }
    }
}

export {
    BranchingRenderer
};
