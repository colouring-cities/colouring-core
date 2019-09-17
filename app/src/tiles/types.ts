import { Image } from 'mapnik';

/**
 * Bounding box in the format [w, s, e, n]
 */
type BoundingBox = [number, number, number, number];

interface TileParams {
    /**
     * Name of tileset to which the tile belongs
     */
    tileset: string;

    /**
     * Zoom level
     */
    z: number;

    /**
     * X coordinate of tile (corresponds to longitude)
     */
    x: number;

    /**
     * Y coordinate of tile (corresponds to latitude)
     */
    y: number;

    /**
     * Resolution scale factor for higher pixel density tiles (e.g. x2)
     */
    scale: number;
}

interface TileRenderer {
    getTile(tileParams: TileParams, dataParams: any): Promise<Image>
}

export {
    BoundingBox,
    TileParams,
    TileRenderer
};
