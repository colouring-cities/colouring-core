import React, { Component, Fragment } from 'react';
import { Map, TileLayer, ZoomControl, AttributionControl } from 'react-leaflet-universal';

import '../../node_modules/leaflet/dist/leaflet.css'
import './map.css'
import ThemeSwitcher from './theme-switcher';
import { parseCategoryURL } from '../parse';

const OS_API_KEY = 'NVUxtY5r8eA6eIfwrPTAGKrAAsoeI9E9';

/**
 * Map area
 */
class ColouringMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: 'night',
            lat: 51.5245255,
            lng: -0.1338422,
            zoom: 16
        };
        this.handleClick = this.handleClick.bind(this);
        this.themeSwitch = this.themeSwitch.bind(this);
    }

    handleClick(e) {
        const is_edit = this.props.match.url.match('edit')
        const mode = is_edit? 'edit': 'view';
        const lat = e.latlng.lat
        const lng = e.latlng.lng
        const new_cat = parseCategoryURL(this.props.match.url);
        const map_cat = new_cat || 'age';
        fetch(
            '/buildings/locate?lat='+lat+'&lng='+lng
        ).then(
            (res) => res.json()
        ).then(function(data){
            if (data && data.length){
                const building = data[0];
                this.props.selectBuilding(building);
                this.props.history.push(`/${mode}/${map_cat}/building/${building.building_id}.html`);
            } else {
                // deselect but keep/return to expected colour theme
                this.props.selectBuilding(undefined);
                this.props.history.push(`/${mode}/${map_cat}.html`);
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
        const position = [this.state.lat, this.state.lng];

        // baselayer
        const key = OS_API_KEY
        const tilematrixSet = 'EPSG:3857'
        const layer = (this.state.theme === 'light')? 'Light 3857' : 'Night 3857';
        const url = `https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/${tilematrixSet}/${layer}/{z}/{x}/{y}.png?key=${key}`
        const attribution = 'Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines.'

        // colour-data tiles
        const is_building = /building/.test(this.props.match.url);
        const cat = parseCategoryURL(this.props.match.url);
        const tileset_by_cat = {
            age: 'date_year',
            size: 'size_storeys',
            location: 'location',
            like: 'likes',
        }
        const data_tileset = tileset_by_cat[cat];
        // pick revision id to bust browser cache
        const rev = this.props.building? this.props.building.revision_id : '';
        const dataLayer = data_tileset?
            <TileLayer key={data_tileset} url={`/tiles/${data_tileset}/{z}/{x}/{y}.png?rev=${rev}`} />
            : null;

        // highlight
        const geometry_id = (this.props.building) ? this.props.building.geometry_id : undefined;
        const highlight = `/tiles/highlight/{z}/{x}/{y}.png?highlight=${geometry_id}`
        const highlightLayer = (is_building && this.props.building) ?
            <TileLayer key={this.props.building.building_id} url={highlight} />
            : null;

        const base_layer_url = (this.state.theme === 'light')?
            `/tiles/base_light/{z}/{x}/{y}.png`
            : `/tiles/base_night/{z}/{x}/{y}.png`

        return (
            <Fragment>
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
                    <TileLayer url={base_layer_url} />
                    { dataLayer }
                    { highlightLayer }
                    <ZoomControl position="topright" />
                    <AttributionControl prefix="" />
                </Map>
                <ThemeSwitcher onSubmit={this.themeSwitch} currentTheme={this.state.theme} />
            </Fragment>
        );
    }
};

export default ColouringMap;
