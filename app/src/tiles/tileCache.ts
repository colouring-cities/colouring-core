/**
 * Cache tiles (PNG images generated from database)
 *
 * Frequency of change:
 * - base layer tiles change rarely - on changes to underlying geometry table
 * - visualisation layer tiles change frequently - with almost any edit to the buildings table
 *
 * Cost of generation and storage:
 * - low zoom tiles are more expensive to render, containing more features from the database
 * - high zoom tiles are cheaper to rerender, and changes are more visible
 * - there are many more high zoom tiles than low: 4 tiles at zoom level n+1 for each tile
 *   at zoom level n
 *
 */

// Using node-fs package to patch fs
// for node >10 we could drop this in favour of fs.mkdir (which has recursive option)
// and then use stdlib `import fs from 'fs';`
import { Image } from 'mapnik';
import fs from 'node-fs';
import { promisify } from 'util';

import { BoundingBox, TileParams } from './types';
import { formatParams, getXYZ } from './util';

// TODO: switch to modern node and use built-in fs with promise-based API
const readFile = promisify(fs.readFile),
    writeFile = promisify(fs.writeFile),
    mkdir = promisify(fs.mkdir),
    unlink = promisify(fs.unlink);

interface CacheLocation {
    /**
     * Cache file directory path
     */
    dir: string;

    /**
     * Full path to cache file
     */
    fname: string;
}

interface CacheDomain {
    /**
     * An array of tileset names to cache
     */
    tilesets: string[];

    /**
     * The lowest zoom level to cache
     */
    minZoom: number;

    /**
     * The highest zoom level to cache
     */
    maxZoom: number;

    /**
     * An array of scale factors to cache
     */
    scales: number[];
}

class TileCache {
    constructor(
        /** Base path in filesystem to store the cache */
        private basePath: string,
        /** Domain definition for the cache */
        private cacheDomain: CacheDomain,
        /** Function for defining custom caching rules (optional) */
        private shouldCacheFn?: (TileParams) => boolean,
        /** Function for defining whether the tileset should be cleared when clearing cache for bounding box */
        private shouldBulkClearTilesetFn?: (tileset: string) => boolean
    ) {}

    async get(tileParams: TileParams): Promise<Image> {
        if (!this.shouldUseCache(tileParams)) {
            throw new Error(`Skip cache get ${formatParams(tileParams)}`);
        }
        const location = this.cacheLocation(tileParams);
        return readFile(location.fname);
    }

    async put(im: Image, tileParams: TileParams): Promise<void> {
        if (!this.shouldUseCache(tileParams)) {
            throw new Error(`Skip cache put ${formatParams(tileParams)}`);
        }
        
        const location = this.cacheLocation(tileParams);
        try {
            await writeFile(location.fname, im, 'binary');
        } catch(err) {
            if(err.code === 'ENOENT') {
                await mkdir(location.dir, 0o755, true);
                await writeFile(location.fname, im, 'binary');
            } else throw err;
        }
    }

    async remove(tileParams: TileParams): Promise<void> {
        const location = this.cacheLocation(tileParams);
        try {
            await unlink(location.fname);
        } catch(err) {}
        console.log(`Expire cache ${formatParams(tileParams)}`);
    }

    async removeAllAtBbox(bbox: BoundingBox): Promise<void[]> {
        const removePromises: Promise<void>[] = [];
        for (const tileset of this.cacheDomain.tilesets) {
            if(!this.shouldBulkClearTileset(tileset)) continue;

            for (let z = this.cacheDomain.minZoom; z <= this.cacheDomain.maxZoom; z++) {
                let tileBounds = getXYZ(bbox, z);
                for (let x = tileBounds.minX; x <= tileBounds.maxX; x++) {
                    for (let y = tileBounds.minY; y <= tileBounds.maxY; y++) {
                        for (const scale of this.cacheDomain.scales) {
                            removePromises.push(this.remove({tileset, z, x, y, scale}));
                        }
                    }
                }
            }
        }
        return Promise.all(removePromises);
    }
    

    private cacheLocation({tileset, z, x, y, scale}: TileParams): CacheLocation {
        const dir = `${this.basePath}/${tileset}/${z}/${x}`;
        const scaleSuffix = scale === 1 ? '' : `@${scale}x`;
        const fname = `${dir}/${y}${scaleSuffix}.png`;
        return { dir, fname };
    }

    private shouldUseCache(tileParams: TileParams): boolean {
        return this.cacheDomain.tilesets.includes(tileParams.tileset) &&
            this.cacheDomain.minZoom <= tileParams.z &&
            this.cacheDomain.maxZoom >= tileParams.z &&
            this.cacheDomain.scales.includes(tileParams.scale) &&
            (this.shouldCacheFn == undefined || this.shouldCacheFn(tileParams));
    }

    private shouldBulkClearTileset(tileset: string): boolean {
        return this.shouldCacheFn == undefined || this.shouldBulkClearTilesetFn(tileset);
    }
}

export {
    TileCache
};
