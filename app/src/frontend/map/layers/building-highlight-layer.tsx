import * as React from 'react';
import { TileLayer } from 'react-leaflet';

import { BuildingMapTileset } from '../../config/tileserver-config';

import { getTileLayerUrl } from './get-tile-layer-url';

export function BuildingHighlightLayer({selectedBuildingId, baseTileset}: {selectedBuildingId: number, baseTileset: BuildingMapTileset}) {
    return <TileLayer
                key={`${selectedBuildingId}-${baseTileset}`} /* needed because TileLayer url is not mutable in react-leaflet v3 */
                url={getTileLayerUrl('highlight', {highlight: `${selectedBuildingId}`, base: baseTileset})}
                minZoom={13}
                maxZoom={19}
                detectRetina={true}
            />;
}
