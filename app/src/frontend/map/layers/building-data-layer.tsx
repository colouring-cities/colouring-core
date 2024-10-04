import * as React from 'react';
import { TileLayer } from 'react-leaflet';

import { BuildingMapTileset } from '../../config/tileserver-config';
import { useDisplayPreferences } from '../../displayPreferences-context';
import {getTileLayerUrl } from './get-tile-layer-url';

export function BuildingDataLayer({tileset, revisionId} : { tileset: BuildingMapTileset, revisionId: string }) {
    const { editableBuildings } = useDisplayPreferences();

    if(editableBuildings == "enabled") {
        return <TileLayer
                key={`${tileset}-${revisionId}`} /* needed because TileLayer url is not mutable in react-leaflet v3 */
                url={getTileLayerUrl(tileset, {rev: revisionId})}
                minZoom={9}
                maxZoom={19}
                detectRetina={false}
            />;
    } else {
        return <div></div>
    }
}