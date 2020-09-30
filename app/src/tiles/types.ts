import { Image } from 'mapnik';
import { Sharp } from 'sharp';

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

interface DataConfig {
    table: string;
    geometry_field: string;
}

type TableDefinitionFunction = (tileset: string) => DataConfig;
type VariablesFunction = (tileset: string, dataParams: any) => object;

type Tile = Image | Sharp;
type RendererFunction = (tileParams: TileParams, dataParams: any) => Promise<Tile>;

interface TileRenderer {
    getTile: RendererFunction;
}

export {
    BoundingBox,
    TileParams,
    TileRenderer,
    Tile,
    RendererFunction,
    DataConfig, 
    TableDefinitionFunction,
    VariablesFunction
};
