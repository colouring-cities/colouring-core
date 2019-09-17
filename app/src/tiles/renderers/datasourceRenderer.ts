import path from 'path';

import mapnik from "mapnik";

import { TileParams, TileRenderer } from "../types";
import { getBbox, TILE_SIZE } from "../util";
import { promisify } from "util";

interface DataConfig {
    table: string;
    geometry_field: string;
}

const TILE_BUFFER_SIZE = 64;
const PROJ4_STRING = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs +over';

// connection details from environment variables
const DATASOURCE_CONFIG = {
    'host': process.env.PGHOST,
    'dbname': process.env.PGDATABASE,
    'user': process.env.PGUSER,
    'password': process.env.PGPASSWORD,
    'port': process.env.PGPORT,
    'extent': '-20005048.4188,-9039211.13765,19907487.2779,17096598.5401',
    'srid': 3857,
    'type': 'postgis'
};

// register datasource adapters for mapnik database connection
if (mapnik.register_default_input_plugins) {
    mapnik.register_default_input_plugins();
}
// register fonts for text rendering
mapnik.register_default_fonts();


class DatasourceRenderer implements TileRenderer {
    constructor(private getTableDefinitionFn: (tileset: string, dataParams: any) => DataConfig) {}

    async getTile({tileset, z, x, y, scale}: TileParams, dataParams: any): Promise<mapnik.Image> {
        const bbox = getBbox(z, x, y);

        const tileSize = TILE_SIZE * scale;
        let map = new mapnik.Map(tileSize, tileSize, PROJ4_STRING);
        map.bufferSize = TILE_BUFFER_SIZE;
        const layer = new mapnik.Layer('tile', PROJ4_STRING);

        const dataSourceConfig = this.getTableDefinitionFn(tileset, dataParams);

        const conf = Object.assign(dataSourceConfig, DATASOURCE_CONFIG);

        const postgis = new mapnik.Datasource(conf);
        layer.datasource = postgis;
        layer.styles = [tileset];

        const stylePath = path.join(__dirname, '..', 'map_styles', 'polygon.xml');

        map = await promisify(map.load.bind(map))(stylePath, {strict: true});

        map.add_layer(layer);
        const im = new mapnik.Image(map.width, map.height);
        map.extent = bbox;
        const rendered = await promisify(map.render.bind(map))(im, {});

        return await promisify(rendered.encode.bind(rendered))('png');
    }
}

function promiseHandler(resolve, reject) {
    return function(err, result) {
        if(err) reject(err);
        else resolve(result);
    }
}

/**
 * Utility function which promisifies a method of an object and binds it to the object
 * This makes it easier to use callback-based object methods in a promise-based way
 * @param obj Object containing the target method
 * @param methodName Method name to promisify and return
 */
function promisifyMethod<T, F>(obj: T, methodName: keyof T);
/**
 * @param methodGetter accessor function to get the method from the object
 */
function promisifyMethod<T, S>(obj: T, methodGetter: (o: T) => S);
function promisifyMethod<T, S>(obj: T, paramTwo: keyof T | ((o: T) => S)) {
    let method;
    if (typeof paramTwo === 'string') {
        method = obj[paramTwo];
    } else if (typeof paramTwo === 'function') {
        method = paramTwo(obj);
    }

    if (typeof method === 'function') {
        return promisify(method.bind(obj));
    } else {
        throw new Error(`Cannot promisify non-function property '${paramTwo}'`);
    }
}

export {
    DatasourceRenderer,
    DataConfig
};
