import SphericalMercator from '@mapbox/sphericalmercator';

import { TileParams } from './types';

const TILE_SIZE = 256;

const mercator = new SphericalMercator({
    size: TILE_SIZE
});

function getBbox(z, x, y) {
    return mercator.bbox(x, y, z, false, '900913');
}

function getXYZ(bbox, z) {
    return mercator.xyz(bbox, z, false, '900913')
}

function formatParams({ tileset, z, x, y, scale }: TileParams): string {
    return `${tileset}/${z}/${x}/${y}@${scale}x`;
}

export {
    TILE_SIZE,
    getBbox,
    getXYZ,
    formatParams
};
