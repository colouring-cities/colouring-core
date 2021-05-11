import { parseBooleanExact } from '../helpers';
import { getAllLayerNames, getBuildingLayerNames, getDataConfig, getLayerVariables } from "./dataDefinition";
import { createBlankTile } from "./renderers/createBlankTile";
import { getTileWithCaching } from "./renderers/getTileWithCaching";
import { renderDataSourceTile } from "./renderers/renderDataSourceTile";
import { stitchTile } from "./renderers/stitchTile";
import { TileCache } from "./tileCache";
import { BoundingBox, Tile, TileParams } from "./types";
import { isOutsideExtent } from "./util";

/**
 * A list of all tilesets handled by the tile server
 */
const allTilesets = getAllLayerNames();

/**
 * Zoom level when we switch from rendering direct from database to instead composing tiles
 * from the zoom level below - gets similar effect, with much lower load on Postgres
 */
const STITCH_THRESHOLD = 12;

/**
 * Hard-code extent so we can short-circuit rendering and return empty/transparent tiles outside the area of interest
 * bbox in CRS epsg:3857 in form: [w, s, e, n]
 */
const EXTENT_BBOX: BoundingBox = [-61149.622628, 6667754.851372, 37183, 6744803.375884];

const allLayersCacheSwitch = parseBooleanExact(process.env.CACHE_TILES) ?? true;
const dataLayersCacheSwitch = parseBooleanExact(process.env.CACHE_DATA_TILES) ?? true;
let shouldCacheFn: (t: TileParams) => boolean;

if(!allLayersCacheSwitch) {
    shouldCacheFn = t => false;
} else if(dataLayersCacheSwitch) {
    // cache age data and base building outlines for more zoom levels than other layers
    shouldCacheFn = ({ tileset, z }: TileParams) =>
        (tileset === 'date_year' && z <= 16) ||
        (['base_light', 'base_night'].includes(tileset) && z <= 17) ||
        z <= 13;
} else {
    shouldCacheFn = ({ tileset, z }: TileParams) =>
        ['base_light', 'base_night'].includes(tileset) && z <= 17;
}

const tileCache = new TileCache(
    process.env.TILECACHE_PATH,
    {
        tilesets: getBuildingLayerNames(),
        minZoom: 9,
        maxZoom: 19,
        scales: [1, 2]
    },
    shouldCacheFn,
    
    // don't clear base_light and base_night on bounding box cache clear
    (tileset: string) => tileset !== 'base_light' && tileset !== 'base_night'
);

const renderBuildingTile = (t: TileParams, d: any) => renderDataSourceTile(t, d, getDataConfig, getLayerVariables);

function cacheOrCreateBuildingTile(tileParams: TileParams, dataParams: any): Promise<Tile> {
    return getTileWithCaching(tileParams, dataParams, tileCache, stitchOrRenderBuildingTile);
}

function stitchOrRenderBuildingTile(tileParams: TileParams, dataParams: any): Promise<Tile> {
    if (tileParams.z <= STITCH_THRESHOLD) {
        // stitch tile, using cache recursively
        return stitchTile(tileParams, dataParams, cacheOrCreateBuildingTile);
    } else {
        return renderBuildingTile(tileParams, dataParams);
    }
}

function renderTile(tileParams: TileParams, dataParams: any): Promise<Tile> {
    if (isOutsideExtent(tileParams, EXTENT_BBOX)) {
        return createBlankTile();
    }

    if (tileParams.tileset === 'highlight') {
        return renderBuildingTile(tileParams, dataParams);
    }

    return cacheOrCreateBuildingTile(tileParams, dataParams);
}

export {
    allTilesets,
    renderTile,
    tileCache
};
