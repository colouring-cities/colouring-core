import React, { Component } from 'react';
import { Map, TileLayer, ZoomControl, AttributionControl } from 'react-leaflet-universal';

import '../../node_modules/leaflet/dist/leaflet.css'
import './map.css'
import ThemeSwitcher from './theme-switcher';

const OS_API_KEY = 'NVUxtY5r8eA6eIfwrPTAGKrAAsoeI9E9';

/**
 * Map area
 */
class ColouringMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: 'light',
            lat: 51.5245255,
            lng: -0.1338422,
            zoom: 16
        };
        this.handleClick = this.handleClick.bind(this);
        this.themeSwitch = this.themeSwitch.bind(this);
    }

    handleClick(e) {
        var lat = e.latlng.lat
        var lng = e.latlng.lng
        fetch(
            '/buildings.json?lat='+lat+'&lng='+lng
        ).then(
            (res) => res.json()
        ).then(function(data){
            if (data.geometry_id && data.id){
                this.props.history.push(`/building/${data.id}.html`);
                this.props.selectBuilding(data);
            } else {
                // this.props.selectBuilding(undefined);  // TODO follow through back to maps
            }
        }.bind(this)).catch(
            (err) => console.error(err)
        )
    }

    themeSwitch(e) {
        e.preventDefault();
        const newTheme = (this.state.theme === 'light')? 'night' : 'light';
        this.setState({theme: newTheme});
    }

    render() {
        const data_layer = (
            this.props.match && this.props.match.params && this.props.match.params[1]
        )? this.props.match.params[1].replace("/", "")
        : 'date_year';

        const position = [this.state.lat, this.state.lng];
        const key = OS_API_KEY
        const tilematrixSet = 'EPSG:3857'
        const layer = (this.state.theme === 'light')? 'Light 3857' : 'Night 3857';
        const url = `https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/${tilematrixSet}/${layer}/{z}/{x}/{y}.png?key=${key}`
        const attribution = 'Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines.'

        const colour = `/tiles/${data_layer}/{z}/{x}/{y}.png`;

        const geometry_id = (this.props.building) ? this.props.building.geometry_id : undefined;
        const highlight = `/tiles/highlight/{z}/{x}/{y}.png?highlight=${geometry_id}`
        const highlightLayer = this.props.building ? (
            <TileLayer key={data_layer} url={highlight} />
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
                <ThemeSwitcher onSubmit={this.themeSwitch} currentTheme={this.state.theme} />
            </Map>
        );
    }
};

export default ColouringMap;
