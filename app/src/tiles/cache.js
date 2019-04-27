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
import fs from 'node-fs';

import { get_xyz } from './tile';

// Use an environment variable to configure the cache location, somewhere we can read/write to.
const CACHE_PATH = process.env.TILECACHE_PATH

/**
 * Get a tile from the cache
 *
 * @param {String} tileset
 * @param {number} z zoom level
 * @param {number} x
 * @param {number} y
 */
function get(tileset, z, x, y) {
    if (!should_try_cache(tileset, z)) {
        return Promise.reject(`Skip cache get ${tileset}/${z}/${x}/${y}`);
    }
    const location = cache_location(tileset, z, x, y);
    return new Promise((resolve, reject) => {
        fs.readFile(location.fname, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    });
}

/**
 * Put a tile in the cache
 *
 * @param {Buffer} im image data
 * @param {String} tileset
 * @param {number} z zoom level
 * @param {number} x
 * @param {number} y
 */
function put(im, tileset, z, x, y) {
    if (!should_try_cache(tileset, z)) {
        return Promise.reject(`Skip cache put ${tileset}/${z}/${x}/${y}`);
    }
    const location = cache_location(tileset, z, x, y);
    return new Promise((resolve, reject) => {
        fs.writeFile(location.fname, im, 'binary', (err) => {
            if (err && err.code === 'ENOENT') {
                // recursively create tile directory if it didn't previously exist
                fs.mkdir(location.dir, 0o755, true, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        // then write the file
                        fs.writeFile(location.fname, im, 'binary', (err) => {
                            (err)? reject(err): resolve()
                        });
                    }
                });
            } else {
                (err)? reject(err): resolve()
            }
        });
    })
}

/**
 * Remove a single cached tile
 *
 * @param {String} tileset
 * @param {number} z zoom level
 * @param {number} x
 * @param {number} y
 */
function remove(tileset, z, x, y) {
    const location = cache_location(tileset, z, x, y)
    return new Promise(resolve => {
        fs.unlink(location.fname, (err) => {
            if(err){
                // pass
            } else {
                console.log("Expire cache", tileset, z, x, y)
            }
            resolve()
        })
    })
}

/**
 * Remove all cached data-visualising tiles which intersect a bbox
 * - initially called directly after edits; may be better on a worker process?
 *
 * @param {String} tileset
 * @param {Array} bbox [w, s, e, n] in EPSG:3857 coordinates
 */
function remove_all_at_bbox(bbox) {
    // magic numbers for min/max zoom
    const min_zoom = 9;
    const max_zoom = 18;
    // magic list of tilesets - see tileserver, other cache rules
    const tilesets = ['date_year', 'size_storeys', 'location', 'likes', 'conservation_area'];
    let tile_bounds;
    const remove_promises = [];
    for (let ti = 0; ti < tilesets.length; ti++) {
        const tileset = tilesets[ti];
        for (let z = min_zoom; z <= max_zoom; z++) {
            tile_bounds = get_xyz(bbox, z)
            for (let x = tile_bounds.minX; x <= tile_bounds.maxX; x++){
                for (let y = tile_bounds.minY; y <= tile_bounds.maxY; y++){
                    remove_promises.push(remove(tileset, z, x, y))
                }
            }
        }
    }
    Promise.all(remove_promises)
}

/**
 * Cache location for a tile
 *
 * @param {String} tileset
 * @param {number} z zoom level
 * @param {number} x
 * @param {number} y
 * @returns {object} { dir: <directory>, fname: <full filepath> }
 */
function cache_location(tileset, z, x, y) {
    const dir = `${CACHE_PATH}/${tileset}/${z}/${x}`
    const fname = `${dir}/${y}.png`
    return {dir, fname}
}

/**
 * Check rules for caching tiles
 *
 * @param {String} tileset
 * @param {number} z zoom level
 * @returns {boolean} whether to use the cache (or not)
 */
function should_try_cache(tileset, z) {
    if (tileset === 'date_year') {
        // cache high zoom because of front page hits
        return z <= 16
    }
    if (tileset === 'base_light' || tileset === 'base_night') {
        // cache for higher zoom levels (unlikely to change)
        return z <= 17
    }
    // else cache for lower zoom levels (change slowly)
    return z <= 13
}

export { get, put, remove, remove_all_at_bbox };
