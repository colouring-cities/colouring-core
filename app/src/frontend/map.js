import React, { Component } from 'react';
import { Map, TileLayer, ZoomControl, AttributionControl } from 'react-leaflet-universal';

import '../../node_modules/leaflet/dist/leaflet.css'
import './map.css'

const OS_API_KEY = 'NVUxtY5r8eA6eIfwrPTAGKrAAsoeI9E9';

/**
 * Map area
 */
class ColouringMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 51.5245255,
            lng: -0.1338422,
            zoom: 16,
            highlight: undefined
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        var lat = e.latlng.lat
        var lng = e.latlng.lng
        fetch(
            '/buildings?lat='+lat+'&lng='+lng
        ).then(
            (res) => res.json()
        ).then(function(data){
            console.log(data)
            if (data.geometry_id){
                this.setState({highlight: data.geometry_id});
            } else {
                this.setState({highlight: undefined});
            }
        }.bind(this))
    }

    render() {

        var data_layer = undefined;
        if (this.props.match && this.props.match.params && this.props.match.params[1]) {
            data_layer = this.props.match.params[1].replace("/", "");
        } else {
            data_layer = 'outline';
        }

        const position = [this.state.lat, this.state.lng];
        const key = OS_API_KEY
        const tilematrixSet = 'EPSG:3857'
        const layer = 'Light 3857'  // alternatively 'Night 3857'
        const url = `https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/${tilematrixSet}/${layer}/{z}/{x}/{y}.png?key=${key}`
        const attribution = 'Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines.'

        const colour = `/tiles/${data_layer}/{z}/{x}/{y}.png`;
        const highlight = `/tiles/highlight/{z}/{x}/{y}.png?highlight=${this.state.highlight}`
        const highlightLayer = this.state.highlight ? (
            <TileLayer key={this.state.highlight} url={highlight} />
        ) : null;

        return (
            <Map
                center={position}
                zoom={this.state.zoom}
                minZoom={10}
                maxZoom={18}
                doubleClickZoom={false}
                zoomControl={false}
                attributionControl={false}
                onClick={this.handleClick}
                >
                <TileLayer url={url} attribution={attribution} />
                <TileLayer url={colour} />
                { highlightLayer }
                <ZoomControl position="topright" />
                <AttributionControl prefix="" />
            </Map>
        );
    }
};

export default ColouringMap;
