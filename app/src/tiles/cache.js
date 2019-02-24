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

// const CACHE_PATH = process.env.CACHE_PATH
const CACHE_PATH = '/home/tom/projects/colouring-london/colouring-london/app/tilecache'

function get(tileset, z, x, y, cb){
    if (!should_try_cache(tileset, z)) {
        cb("Skip cache", null)
        return
    }
    const dir = `${CACHE_PATH}/${tileset}/${z}/${x}`
    const fname = `${dir}/${y}.png`
    fs.readFile(fname, cb)
}

function put(im, tileset, z, x, y, cb){
    if (!should_try_cache(tileset, z)) {
        cb("Skip cache")
        return
    }
    const dir = `${CACHE_PATH}/${tileset}/${z}/${x}`
    const fname = `${dir}/${y}.png`
    fs.writeFile(fname, im, 'binary', (err) => {
        if (err && err.code === 'ENOENT') {
            fs.mkdir(dir, 0o755, true, (err) => {
                if (err){
                    cb(err);
                } else {
                    fs.writeFile(fname, im, 'binary', cb);
                }
            });
        } else {
            cb(err)
        }
    });
}

function should_try_cache(tileset, z) {
    if (tileset === 'base_light' ||  tileset === 'base_night') {
        // cache for higher zoom levels (unlikely to change)
        return z <= 15
    }
    // else cache for lower zoom levels (change slowly)
    return z <= 12
}

export { get, put };
