import React, { Component, Fragment } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';

import ErrorBox from './error-box';
import InfoBox from './info-box';
import Sidebar from './sidebar';

const CONFIG = [
    {
        title: "Location", slug: "location", fields: [
            { title: "Building name", slug: "location_name", type: "text" },
            { title: "Building number", slug: "location_number", type: "text" },
            { title: "Street", slug: "location_street", type: "text" },
            { title: "Address line 2", slug: "location_line_two", type: "text" },
            { title: "Town", slug: "location_town", type: "text" },
            { title: "Postcode", slug: "location_postcode", type: "text" },
        ]
    },
    { title: "Use", slug: "use", inactive: true, fields: [] },
    { title: "Type", slug: "type", inactive: true, fields: [] },
    {
        title: "Age", slug: "age", fields: [
            { title: "Year built (best estimate)", slug: "date_year", type: "number", step: 1 },
            { title: "Year built (upper estimate)", slug: "date_upper", type: "number", step: 1 },
            { title: "Year built (lower estimate)", slug: "date_lower", type: "number", step: 1 },
            { title: "Facade date", slug: "date_facade", type: "number", step: 1 },
            { title: "Source", slug: "date_source", type: "text" },
        ]
    },
    {
        title: "Size", slug: "size", fields: [
            { title: "Attic storeys", slug: "size_storeys_attic", type: "number", step: 1 },
            { title: "Core storeys", slug: "size_storeys_core", type: "number", step: 1 },
            { title: "Basement storeys", slug: "size_storeys_basement", type: "number", step: 1 },
            { title: "Height to apex (m)", slug: "size_height_apex", type: "number", step: 0.1 },
            { title: "Ground floor area (m²)", slug: "size_floor_area_ground", type: "number", step: 0.1 },
            { title: "Total floor area (m²)", slug: "size_floor_area_total", type: "number", step: 0.1 },
            { title: "Frontage Width (m)", slug: "size_width_frontage", type: "number", step: 0.1 },
        ]
    },
    { title: "Shape & Position", slug: "form", inactive: true, fields: [] },
    { title: "Build Team", slug: "build-team", inactive: true, fields: [] },
    { title: "Construction & Design", slug: "construction", inactive: true, fields: [] },
    { title: "Energy", slug: "energy", inactive: true, fields: [] },
    { title: "Greenery", slug: "greenery", inactive: true, fields: [] },
    { title: "Planning & Protection", slug: "planning", inactive: true, fields: [] },
    { title: "Demolition", slug: "demolition", inactive: true, fields: [] },
    {
        title: "Like Me!", slug: "like", fields: [
            { title: "Like", slug: "like", type: "like"  }
        ]
    },
];

class BuildingEdit extends Component {
    render() {
        if (!this.props.user){
            return <Redirect to="/sign-up.html" />
        }
        if (!this.props.building_id){
            return (
                <Sidebar title="Building Not Found">
                    <InfoBox msg="We can't find that one anywhere - try the map again?" />
                    <div className="buttons-container">
                        <Link to="/map/date_year.html" className="btn btn-secondary">Back to maps</Link>
                    </div>
                </Sidebar>
            );
        }
        return (
            <Sidebar title={`Edit Building`}>
                {
                    CONFIG.map((props) => {
                        return <EditForm {...props} {...this.props} key={props.slug} />
                    })
                }
            </Sidebar>
        );
    }
}

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {...props}
        this.state.error = this.state.error || undefined;

        this.handleChange = this.handleChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = (target.value === '')? null : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLike(event) {
        const liked = event.target.checked;
        this.setState({
            like: liked
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({error: undefined})

        fetch(`/building/${this.props.building_id}.json`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(
            res => res.json()
        ).then(function(res){
            if (res.error) {
                this.setState({error: res.error})
            } else {
                this.props.selectBuilding(res);
                this.props.history.push(`/building/${this.props.building_id}.html`);
            }
        }.bind(this)).catch(
            (err) => this.setState({error: err})
        );
    }

    render() {
        const match = true;
        return (
            <section className={(this.props.inactive)? "data-section inactive": "data-section"}>
                <NavLink className="bullet-prefix" to={(match)? '#': `#${this.props.slug}`}
                         isActive={() => match}>
                    <h3 className="h3">{this.props.title}</h3>
                </NavLink>
                <form action={`/building/${this.props.building_id}.html#${this.props.slug}`}
                    method="GET" onSubmit={this.handleSubmit}>
                    <ErrorBox msg={this.state.error} />
                    <Fragment>{
                        this.props.fields.map((props) => {
                            var el;
                            switch (props.type) {
                                case "text":
                                    el = <TextInput {...props} handleChange={this.handleChange}
                                            value={this.state[props.slug]} key={props.slug} />
                                    break;
                                case "number":
                                    el = <NumberInput {...props} handleChange={this.handleChange}
                                            value={this.state[props.slug]} key={props.slug} />
                                    break;
                                case "like":
                                    el = <LikeButton {...props} handleLike={this.handleLike}
                                            value={this.state[props.slug]} key={props.slug} />
                                    break;
                                default:
                                    el = null
                                    break;
                            }
                            return el
                        })
                    }</Fragment>
                    <Fragment>{
                        (this.props.inactive)?
                        null : (
                            <div className="buttons-container">
                                <Link to={`/building/${this.props.building_id}.html#${this.props.slug}`}
                                    className="btn btn-secondary">Cancel</Link>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        )
                    }</Fragment>
                </form>
            </section>
        )
    }
}

const TextInput = (props) => (
    <Fragment>
        <label htmlFor={props.slug}>{props.title}</label>
        <input className="form-control" type="text"
            id={props.slug} name={props.slug}
            value={props.value || ""}
            onChange={props.handleChange}
            />
    </Fragment>
);

const NumberInput = (props) => (
    <Fragment>
        <label htmlFor={props.slug}>{props.title}</label>
        <input className="form-control" type="number" step={props.step}
            id={props.slug} name={props.slug}
            value={props.value || ""}
            onChange={props.handleChange}
            />
    </Fragment>
);

const LikeButton = (props) => (
    <Fragment>
        <label htmlFor="likes">Like this building?</label>
        <div className="form-check">
            <input className="form-check-input position-static"
                type="checkbox"
                checked={props.value}
                onChange={props.handleLike}
                />
        </div>
    </Fragment>
);

export default BuildingEdit;
