import { TileCache } from "./tileCache";
import { BoundingBox, TileParams } from "./types";
import { StitchRenderer } from "./renderers/stitchRenderer";
import { CachedRenderer } from "./renderers/cachedRenderer";
import { BranchingRenderer } from "./renderers/branchingRenderer";
import { WindowedRenderer } from "./renderers/windowedRenderer";
import { BlankRenderer } from "./renderers/blankRenderer";
import { DatasourceRenderer } from "./renderers/datasourceRenderer";
import { getBuildingsDataConfig, getHighlightDataConfig, BUILDING_LAYER_DEFINITIONS } from "./dataDefinition";

/**
 * A list of all tilesets handled by the tile server
 */
const allTilesets = ['highlight', ...Object.keys(BUILDING_LAYER_DEFINITIONS)];

const buildingDataRenderer = new DatasourceRenderer(getBuildingsDataConfig);

const stitchRenderer = new StitchRenderer(undefined); // depends recurrently on cache, so parameter will be set later

/**
 * Zoom level when we switch from rendering direct from database to instead composing tiles
 * from the zoom level below - gets similar effect, with much lower load on Postgres
 */
const STITCH_THRESHOLD = 12;

const renderOrStitchRenderer = new BranchingRenderer(
    ({ z }) => z <= STITCH_THRESHOLD,
    stitchRenderer, // refer to the prepared stitch renderer
    buildingDataRenderer
);

const tileCache = new TileCache(
    process.env.TILECACHE_PATH,
    {
        tilesets: ['date_year', 'size_storeys', 'location', 'likes', 'conservation_area'],
        minZoom: 9,
        maxZoom: 18,
        scales: [1, 2]
    },
    ({ tileset, z }: TileParams) => (tileset === 'date_year' && z <= 16) ||
        ((tileset === 'base_light' || tileset === 'base_night') && z <= 17) ||
        z <= 13
);

const cachedRenderer = new CachedRenderer(
    tileCache,
    renderOrStitchRenderer
);

// set up stitch renderer to use the data renderer with caching
stitchRenderer.tileRenderer = cachedRenderer;

const highlightRenderer = new DatasourceRenderer(getHighlightDataConfig);

const highlightOrBuildingRenderer = new BranchingRenderer(
    ({ tileset }) => tileset === 'highlight',
    highlightRenderer,
    cachedRenderer
);

const blankRenderer = new BlankRenderer();

/**
 * Hard-code extent so we can short-circuit rendering and return empty/transparent tiles outside the area of interest
 * bbox in CRS epsg:3857 in form: [w, s, e, n]
 */
const EXTENT_BBOX: BoundingBox = [-61149.622628, 6667754.851372, 28128.826409, 6744803.375884];
const mainRenderer = new WindowedRenderer(
    EXTENT_BBOX,
    highlightOrBuildingRenderer,
    blankRenderer
);

export {
    allTilesets,
    mainRenderer,
    tileCache
};
