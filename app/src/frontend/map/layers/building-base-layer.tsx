import * as React from 'react';
import { TileLayer } from 'react-leaflet';

import { MapTheme } from '../../config/map-config';
import { MapTileset } from '../../config/tileserver-config';

import {getTileLayerUrl } from './get-tile-layer-url';

export function BuildingBaseLayer({ theme }: {theme: MapTheme}) {
    const tileset = `base_${theme}` as const;

    return <TileLayer
                key={theme} /* needed because TileLayer url is not mutable in react-leaflet v3 */
                url={getTileLayerUrl(tileset)}
                minZoom={14}
                maxZoom={19}
                detectRetina={true}
            />;
}
