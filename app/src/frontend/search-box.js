import React, { Component } from 'react';

import './search-box.css';

/**
 * Search for location
 */
class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            q: '',
            results: [],
            fetching: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.clearResults = this.clearResults.bind(this);
        this.clearQuery = this.clearQuery.bind(this);
    }

    // Update search term
    handleChange(e) {
        this.setState({
            q: e.target.value
        });
        // If the ‘clear’ icon has been clicked, clear results list as well 
        if(e.target.value === '') {
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

    // Query search endpoint
    search(e) {
        e.preventDefault();
        this.setState({
            fetching: true
        })

        fetch(
            '/search?q='+this.state.q
        ).then(
            (res) => res.json()
        ).then((data) => {
            if (data && data.results){
                this.setState({
                    results: data.results,
                    fetching: false
                })
            } else {
                console.error(data);

                this.setState({
                    results: [],
                    fetching: false
                })
            }
        }).catch((err) => {
            console.error(err)

            this.setState({
                results: [],
                fetching: false
            })
        })
    }

    render() {
        const resultsList = this.state.results.length?
            <ul className="search-box-results">
                {
                    this.state.results.map((result) => {
                        const label = result.attributes.label;
                        const lng = result.geometry.coordinates[0];
                        const lat = result.geometry.coordinates[1];
                        const zoom = result.attributes.zoom;
                        const href = `?lng=${lng}&lat=${lat}&zoom=${zoom}`
                        return (
                            <li key={result.attributes.label}>
                                <a
                                    className="search-box-result"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.onLocate(lat, lng, zoom);
                                    }}
                                    href={href}
                                >{`${label.substring(0,4)} ${label.substring(4, 7)}`}</a>
                            </li>
                        )
                    })
                }
            </ul>
            : null;
        return (
            <div className={`search-box ${this.props.is_building? 'building' : ''}`} onKeyDown={this.handleKeyPress}>
                <form action="/search" method="GET" onSubmit={this.search}
                    className="form-inline">
                    <input
                        className="form-control"
                        type="search"
                        id="search-box-q"
                        name="q"
                        value={this.state.q}
                        placeholder="Search for a postcode"
                        aria-label="Search for a postcode"
                        onChange={this.handleChange}
                    />
                    <button className="btn btn-outline-dark" type="submit">Search</button>
                </form>
                { resultsList }
            </div>
        )
    }
}

export default SearchBox;
