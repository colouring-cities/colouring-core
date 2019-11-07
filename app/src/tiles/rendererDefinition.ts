import { TileCache } from "./tileCache";
import { BoundingBox, TileParams, Tile } from "./types";
import { getBuildingsDataConfig, getHighlightDataConfig, getAllLayerNames, getBuildingLayerNames } from "./dataDefinition";
import { isOutsideExtent } from "./util";
import { renderDataSourceTile } from "./renderers/renderDataSourceTile";
import { getTileWithCaching } from "./renderers/getTileWithCaching";
import { stitchTile } from "./renderers/stitchTile";
import { createBlankTile } from "./renderers/createBlankTile";

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
const EXTENT_BBOX: BoundingBox = [-61149.622628, 6667754.851372, 28128.826409, 6744803.375884];

const tileCache = new TileCache(
    process.env.TILECACHE_PATH,
    {
        tilesets: getBuildingLayerNames(),
        minZoom: 9,
        maxZoom: 18,
        scales: [1, 2]
    },

    // cache age data and base building outlines for more zoom levels than other layers
    ({ tileset, z }: TileParams) => (tileset === 'date_year' && z <= 16) ||
        ((tileset === 'base_light' || tileset === 'base_night') && z <= 17) ||
        z <= 13,
    
    // don't clear base_light and base_night on bounding box cache clear
    (tileset: string) => tileset !== 'base_light' && tileset !== 'base_night'
);

const renderBuildingTile = (t: TileParams, d: any) => renderDataSourceTile(t, d, getBuildingsDataConfig);
const renderHighlightTile = (t: TileParams, d: any) => renderDataSourceTile(t, d, getHighlightDataConfig);

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
        return renderHighlightTile(tileParams, dataParams);
    }

    return cacheOrCreateBuildingTile(tileParams, dataParams);
}

export {
    allTilesets,
    renderTile,
    tileCache
};
