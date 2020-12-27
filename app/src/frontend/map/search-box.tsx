import { Point } from 'geojson';
import React, { Component } from 'react';

import './search-box.css';

import { apiGet } from '../apiHelpers';
import { SearchIcon } from '../components/icons';

interface SearchResult {
    type: string;
    attributes: {
        label: string;
        zoom: number;
    };
    geometry: Point;
}


interface SearchBoxProps {
    onLocate: (lat: number, lng: number, zoom: number) => void;
}

interface SearchBoxState {
    q: string;
    results: SearchResult[];
    fetching: boolean;
    collapsedSearch: boolean;
    smallScreen: boolean;
}

/**
 * Search for location
 */
class SearchBox extends Component<SearchBoxProps, SearchBoxState> {
    constructor(props) {
        super(props);
        this.state = {
            q: '',
            results: [],
            fetching: false,
            //track the state of the search box i.e. collapsed or expanded. Default to true
            collapsedSearch: true,
            //is this a small screen device? if not we will disable collapse option
            smallScreen: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.clearResults = this.clearResults.bind(this);
        this.clearQuery = this.clearQuery.bind(this);
        this.expandSearch = this.expandSearch.bind(this);
        this.onResize= this.onResize.bind(this);
    }

    // Update search term
    handleChange(e) {
        const targetValue = e.target.value;

        this.setState({
            q: targetValue
        });

        // Clear results if the query is changed sufficiently or deleted
        if(targetValue === '' || !this.state.q.startsWith(targetValue) ) {
            this.clearResults();
        }
    }

    // Clear search results on ESC
    handleKeyPress(e){
        if(e.keyCode === 27) {
            //ESC is pressed
            this.clearQuery();
            this.clearResults();
        }
    }

    clearResults(){
        this.setState({
            results: []
        });
    }

    clearQuery(){
        this.setState({
            q: ''
        });
    }

    expandSearch(e){
        this.setState(state => ({
            collapsedSearch: !state.collapsedSearch
        }));
    }

    // Query search endpoint
    search(e) {
        e.preventDefault();
        this.setState({
            fetching: true
        });

        apiGet(`/api/search?q=${this.state.q}`)
        .then((data) => {
            if (data && data.results){
                this.setState({
                    results: data.results,
                    fetching: false
                });
            } else {
                console.error(data);

                this.setState({
                    results: [],
                    fetching: false
                });
            }
        }).catch((err) => {
            console.error(err);

            this.setState({
                results: [],
                fetching: false
            });
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        if (window && window.innerHeight) {
            // if we're in the browser, pass in as though from event to initialise
            this.onResize({target: window});
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    // On a real mobile device onResize() gets called when the virtual keyboard pops up (e.g. when entering search text)
    // so be careful what states are changed in this method (i.e. don't collapse the search box here)
    onResize(e) {
        this.setState({smallScreen: (e.target.innerWidth < 990)});
    }

    render() {
        // if the current state is collapsed (and a mobile device) just render the icon
        if(this.state.collapsedSearch && this.state.smallScreen){
            return(
                <div className="search-box">
                    <div className="search-box-pane">
                        <div className="collapse-btn active" onClick={this.expandSearch}>
                            <SearchIcon />
                        </div>
                    </div>
                </div>
            );
        }

        const resultsList = this.state.results.length?
            <ul className="search-box-results">
                {
                    this.state.results.map((result) => {
                        const label = result.attributes.label;
                        const lng = result.geometry.coordinates[0];
                        const lat = result.geometry.coordinates[1];
                        const zoom = result.attributes.zoom;
                        const href = `?lng=${lng}&lat=${lat}&zoom=${zoom}`;
                        return (
                            <li key={result.attributes.label}>
                                <a
                                    className="search-box-result"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.onLocate(lat, lng, zoom);
                                    }}
                                    href={href}
                                >{`${label.substring(0, 4)} ${label.substring(4, 7)}`}</a>
                            </li>
                        );
                    })
                }
            </ul>
            : null;
        return (
            <div className="search-box" onKeyDown={this.handleKeyPress}>
                <div className="search-box-pane">
                    <div className={`collapse-btn ${this.state.smallScreen ? 'active' : ''}`} onClick={this.state.smallScreen ? this.expandSearch : null}>
                        <SearchIcon/>
                    </div>
                    <form onSubmit={this.search} className="form-inline d-flex flex-nowrap">
                        <input
                            className="form-control"
                            type="search"
                            id="search-box-q"
                            name="q"
                            value={this.state.q}
                            placeholder="Type a postcode..."
                            aria-label="Type a postcode..."
                            onChange={this.handleChange}
                            maxLength={8}
                        />
                        <button className="search-btn btn btn-outline-dark" type="submit">Search</button>
                    </form>
                </div>
                { resultsList }
            </div>
        );
    }
}

export default SearchBox;
