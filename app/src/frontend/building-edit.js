import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';

class BuildingEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location_name: props.location_name,
            location_number: props.location_number,
            location_line_two: props.location_line_two,
            location_street: props.location_street,
            location_postcode: props.location_postcode,
            date_year: props.date_year,
            date_lower: props.date_lower,
            date_upper: props.date_upper,
            date_source: props.date_source,
            date_facade: props.date_facade,
            size_attic: props.size_attic,
            size_core: props.size_core,
            size_basement: props.size_basement,
            likes: props.likes || [],
            liked: this.user_likes(props.user_id, props.likes)
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    user_likes(user_id, likes) {
        return likes && likes.indexOf(user_id) !== -1;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLike(event) {
        const liked = event.target.checked;
        const likes = this.state.likes || [];
        if (liked) {
            this.setState({
                likes: likes.concat([this.props.user_id]),
                liked: true
            });
        } else {
            this.setState({
                likes: likes.filter(id => id !== this.props.user_id),
                liked: false
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(`/building/${this.props.id}`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(
            res => res.json()
        ).then(function(res){
            if (res.error) {
                console.error(res.error);  // tell user
            } else {
                console.log(res);  // redirect back
            }
        }).catch(
            err => console.error(err)
        );
    }

    render() {
        return (
            <Sidebar title="Edit building data">
                <form action="building-view.html" method="GET" onSubmit={this.handleSubmit}>
                    <fieldset className="data-section">
                        <legend className="h3 bullet-prefix location toggled-on">Location</legend>
                        <div id="data-list-location" className="data-list">

                            <label htmlFor="location_name">Building name</label>
                            <input className="form-control" type="text"
                                   id="location_name" name="location_name"
                                   value={this.state.location_name}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="location_number">Building number</label>
                            <input className="form-control" type="text"
                                   id="location_number" name="location_number"
                                   value={this.state.location_number}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="location_street">Street</label>
                            <input className="form-control" type="text"
                                   id="location_street" name="location_street"
                                   value={this.state.location_street}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="location_line_two">Address line 2</label>
                            <input className="form-control" type="text"
                                   id="location_line_two" name="location_line_two"
                                   value={this.state.location_line_two}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="location_town">Town</label>
                            <input className="form-control" type="text"
                                   id="location_town" name="location_town"
                                   value={this.state.location_town}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="location_postcode">Postcode</label>
                            <input className="form-control" type="text"
                                   id="location_postcode" name="location_postcode"
                                   value={this.state.location_postcode}
                                   onChange={this.handleChange}
                                   />

                        </div>
                    </fieldset>
                    <fieldset className="data-section">
                        <legend className="h3 bullet-prefix age">Age</legend>
                        <div id="data-list-age" className="data-list">

                            <label htmlFor="date_year">Year built (best estimate)</label>
                            <input className="form-control" type="number" step="1"
                                   id="date_year" name="date_year"
                                   value={this.state.date_year}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="date_upper">Year built (upper estimate)</label>
                            <input className="form-control" type="number" step="1"
                                   id="date_upper" name="date_upper"
                                   value={this.state.date_upper}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="date_lower">Year built (lower estimate)</label>
                            <input className="form-control" type="number" step="1"
                                   id="date_lower" name="date_lower"
                                   value={this.state.date_lower}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="date_facade">Facade date</label>
                            <input className="form-control" type="number" step="1"
                                   id="date_facade" name="date_facade"
                                   value={this.state.date_facade}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="date_source">Source</label>
                            <input className="form-control" type="text"
                                   id="date_source" name="date_source"
                                   value={this.state.date_source}
                                   onChange={this.handleChange}
                                   />
                        </div>
                    </fieldset>
                    <fieldset className="data-section">
                        <legend className="h3 bullet-prefix size">Size</legend>
                        <div id="data-list-size" className="data-list">

                            <label htmlFor="size_attic">Attic storeys</label>
                            <input className="form-control" type="number" step="1"
                                   id="size_attic" name="size_attic"
                                   value={this.state.size_attic}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="size_core">Core storeys</label>
                            <input className="form-control" type="number" step="1"
                                   id="size_core" name="size_core"
                                   value={this.state.size_core}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="size_basement">Basement storeys</label>
                            <input className="form-control" type="number" step="1"
                                   id="size_basement" name="size_basement"
                                   value={this.state.size_basement}
                                   onChange={this.handleChange}
                                   />
                        </div>
                    </fieldset>
                    <fieldset className="data-section">
                        <legend className="h3 bullet-prefix like">Like Me!</legend>
                        <div id="data-list-like" className="data-list">
                            <label htmlFor="likes">Like this building?</label>
                            <div className="form-check">
                                <input className="form-check-input position-static"
                                       type="checkbox"
                                       checked={this.state.liked}
                                       onChange={this.handleLike}
                                       />
                            </div>
                        </div>
                    </fieldset>
                    <div className="buttons-container">
                        <Link to={`/building/${this.props.id}.html`} className="btn btn-secondary">Cancel</Link>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </Sidebar>
        );
    }
}

export default BuildingEdit;
