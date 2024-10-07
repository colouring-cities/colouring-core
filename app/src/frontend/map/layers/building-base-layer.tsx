import * as React from 'react';
import { TileLayer } from 'react-leaflet';

import { MapTheme } from '../../config/map-config';
import { MapTileset } from '../../config/tileserver-config';
import { useDisplayPreferences } from '../../displayPreferences-context';
import {getTileLayerUrl } from './get-tile-layer-url';

export function BuildingBaseLayer({ theme }: {theme: MapTheme}) {
    const tileset = `base_${theme}` as const;
    const { editableBuildings } = useDisplayPreferences();

    if(editableBuildings == "enabled") {
        return <TileLayer
                key={theme} /* needed because TileLayer url is not mutable in react-leaflet v3 */
                url={getTileLayerUrl(tileset)}
                minZoom={14}
                maxZoom={19}
                detectRetina={false}
            />;
    } else {
        return <div></div>
    }
}
