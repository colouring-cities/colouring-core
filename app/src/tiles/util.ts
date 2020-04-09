import SphericalMercator from '@mapbox/sphericalmercator';

import { BoundingBox, TileParams } from './types';

const TILE_SIZE = 256;

const mercator = new SphericalMercator({
    size: TILE_SIZE
});

function getBbox(z, x, y) {
    return mercator.bbox(x, y, z, false, '900913');
}

function getXYZ(bbox, z) {
    return mercator.xyz(bbox, z, false, '900913');
}

function formatParams({ tileset, z, x, y, scale }: TileParams): string {
    return `${tileset}/${z}/${x}/${y}@${scale}x`;
}

function isOutsideExtent({ x, y, z }: TileParams, bbox: BoundingBox) {
    const xy = getXYZ(bbox, z);
    return xy.minY > y || xy.maxY < y || xy.minX > x || xy.maxX < x;
}

export {
    TILE_SIZE,
    getBbox,
    getXYZ,
    formatParams,
    isOutsideExtent
};
