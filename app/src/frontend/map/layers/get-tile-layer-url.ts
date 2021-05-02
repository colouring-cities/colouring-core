import { MapTileset } from '../../config/tileserver-config';

/**
 * Formats a CL tileserver URL for a tileset and a set of parameters
 * @param tileset the name of the tileset
 * @param parameters (optional) dictionary of parameter values
 * @returns A string with the formatted URL
 */
export function getTileLayerUrl<T extends MapTileset = MapTileset>(tileset: T, parameters?: Record<string, string>) {
    let paramString = parameters && new URLSearchParams(parameters).toString();
    paramString = paramString == undefined ? '' : `?${paramString}`;

    return `/tiles/${tileset}/{z}/{x}/{y}{r}.png${paramString}`;
}