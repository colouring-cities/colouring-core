import React, { Component } from 'react';
import { Map, TileLayer, ZoomControl, AttributionControl } from 'react-leaflet-universal';

import '../../node_modules/leaflet/dist/leaflet.css'
import './map.css'

const OS_API_KEY = 'NVUxtY5r8eA6eIfwrPTAGKrAAsoeI9E9';

/**
 * Map area
 */
class ColouringMap extends Component {
    state = {
      lat: 51.5245255,
      lng: -0.1338422,
      zoom: 16,
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const key = OS_API_KEY
        const tilematrixSet = 'EPSG:3857'
        const layer = 'Night 3857'  // alternatively 'Light 3857'
        const url = `https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/${tilematrixSet}/${layer}/{z}/{x}/{y}.png?key=${key}`
        const attribution = 'Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines.'
        const outline = '/tiles/outline/{z}/{x}/{y}.png'
        return (
            <Map
                center={position}
                zoom={this.state.zoom}
                minZoom={10}
                maxZoom={18}
                doubleClickZoom={false}
                zoomControl={false}
                attributionControl={false}>
                <TileLayer url={url} attribution={attribution} />
                <TileLayer url={outline} />
                <ZoomControl position="topright" />
                <AttributionControl prefix="" />
            </Map>
        );
    }
};

export default ColouringMap;
