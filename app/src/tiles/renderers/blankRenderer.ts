import { Image } from "mapnik";
import sharp from 'sharp';

import { TileParams, TileRenderer } from "../types";

class BlankRenderer implements TileRenderer {
    getTile(tileParams: TileParams): Promise<Image> {
        return sharp({
            create: {
                width: 1,
                height: 1,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        }).png().toBuffer();
    }
}

export {
    BlankRenderer
};
