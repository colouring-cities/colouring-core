import * as React from 'react';
import { TileLayer } from 'react-leaflet';

import {getTileLayerUrl } from './get-tile-layer-url';

export function BuildingNumbersLayer({revisionId}: {revisionId: string}) {
    return <TileLayer
                key={`numbers-${revisionId}`} /* needed because TileLayer url is not mutable in react-leaflet v3 */
                url={getTileLayerUrl('number_labels', {rev: revisionId})}
                minZoom={17}
                maxZoom={19}
                detectRetina={true}
            />;
}
