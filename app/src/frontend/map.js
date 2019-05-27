import React, { Component, Fragment } from 'react';
import { Map, TileLayer, ZoomControl, AttributionControl } from 'react-leaflet-universal';

import '../../node_modules/leaflet/dist/leaflet.css'
import './map.css'

import { HelpIcon } from './icons';
import Legend from './legend';
import { parseCategoryURL } from '../parse';
import SearchBox from './search-box';
import ThemeSwitcher from './theme-switcher';

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
        this.handleLocate = this.handleLocate.bind(this);
        this.themeSwitch = this.themeSwitch.bind(this);
    }

    handleLocate(lat, lng, zoom){
        this.setState({
            lat: lat,
            lng: lng,
            zoom: zoom
        })
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
        const is_edit = /edit/.test(this.props.match.url);
        const cat = parseCategoryURL(this.props.match.url);
        const tileset_by_cat = {
            age: 'date_year',
            size: 'size_storeys',
            location: 'location',
            like: 'likes',
            planning: 'conservation_area',
        }
        const data_tileset = tileset_by_cat[cat];
        // pick revision id to bust browser cache
        const rev = this.props.building? this.props.building.revision_id : '';
        const dataLayer = data_tileset?
            <TileLayer
                key={data_tileset}
                url={`/tiles/${data_tileset}/{z}/{x}/{y}.png?rev=${rev}`}
                minZoom={9} />
            : null;

        // highlight
        const geometry_id = (this.props.building) ? this.props.building.geometry_id : undefined;
        const highlight = `/tiles/highlight/{z}/{x}/{y}.png?highlight=${geometry_id}`
        const highlightLayer = (is_building && this.props.building) ?
            <TileLayer
                key={this.props.building.building_id}
                url={highlight}
                minZoom={14} />
            : null;

        const base_layer_url = (this.state.theme === 'light')?
            '/tiles/base_light/{z}/{x}/{y}.png'
            : '/tiles/base_night/{z}/{x}/{y}.png'

        return (
            <Fragment>
                <Map
                    center={position}
                    zoom={this.state.zoom}
                    minZoom={9}
                    maxZoom={18}
                    doubleClickZoom={false}
                    zoomControl={false}
                    attributionControl={false}
                    onClick={this.handleClick}
                >
                    <TileLayer url={url} attribution={attribution} />
                    <TileLayer url={base_layer_url} minZoom={14} />
                    { dataLayer }
                    { highlightLayer }
                    <ZoomControl position="topright" />
                    <AttributionControl prefix="" />
                </Map>
                {
                    !is_building && this.props.match.url !== '/'? (
                        <div className="map-notice">
                            <HelpIcon /> {is_edit? 'Click a building to edit' : 'Click a building for details'}
                        </div>
                    ) : null
                }
                {
                    this.props.match.url !== '/'? (
                        <Fragment>
                            <Legend slug={cat} />
                            <ThemeSwitcher onSubmit={this.themeSwitch} currentTheme={this.state.theme} />
                            <SearchBox onLocate={this.handleLocate} is_building={is_building} />
                        </Fragment>
                    ) : null
                }
            </Fragment>
        );
    }
}

export default ColouringMap;
