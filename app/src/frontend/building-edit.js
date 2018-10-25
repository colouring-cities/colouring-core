import React, { Component, Fragment } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import ErrorBox from './error-box';
import InfoBox from './info-box';
import Sidebar from './sidebar';
import Tooltip from './tooltip';
import { HelpIcon, CloseIcon, SaveIcon } from './icons';

import CONFIG from './fields-config.json';


const BuildingEdit = (props) => {
    if (!props.user){
        return <Redirect to="/sign-up.html" />
    }
    if (!props.building_id){
        return (
            <Sidebar title="Building Not Found" back="/map/age.html">
                <InfoBox msg="We can't find that one anywhere - try the map again?" />
                <div className="buttons-container">
                    <Link to="/map/age.html" className="btn btn-secondary">Back to maps</Link>
                </div>
            </Sidebar>
        );
    }

    const search = (props.location && props.location.search)?
        queryString.parse(props.location.search):
        {};
    return (
        <Sidebar title={`Building Data`}
            back={search.cat? `/building/${props.building_id}.html?cat=${search.cat}`: `/building//${props.building_id}.html`}>
            {
                CONFIG.map((conf_props) => {
                    return <EditForm
                        {...conf_props} {...props}
                        search={search} key={conf_props.slug} />
                })
            }
        </Sidebar>
    );
}

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        for (let field of props.fields) {
            this.state[field.slug] = props[field.slug]
        }
        this.state.error = this.props.error || undefined;
        this.state.like = this.props.like || undefined;

        this.handleChange = this.handleChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        let value = (target.value === '')? null : target.value;
        const name = target.name;

        // special transform - consider something data driven before adding 'else if's
        if (name === 'location_postcode' && value !== null) {
            value = value.toUpperCase();
        }

        this.setState({
            [name]: value
        });
    }

    handleLike(event) {
        event.preventDefault();

        fetch(`/building/like/${this.props.building_id}`, {
            method: 'POST',
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
                this.setState({
                    likes_total: res.likes_total
                })
            }
        }.bind(this)).catch(
            (err) => this.setState({error: err})
        );
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
                const new_cat = this.props.search.cat;
                this.props.history.push(`/building/${res.building_id}.html?cat=${new_cat}`);
            }
        }.bind(this)).catch(
            (err) => this.setState({error: err})
        );
    }

    render() {
        const match = this.props.search.cat === this.props.slug;
        if (!match) {
            return null
        }
        return (
            <section className={(this.props.inactive)? "data-section inactive": "data-section"}>
                <header className={(match? "active " : "") + " section-header edit"}>
                    <a><h3 className="h3">{this.props.title}</h3></a>
                    <nav className="icon-buttons">
                    {
                        this.props.help?
                        <a className="icon-button help" title="Find out more" href={this.props.help}>
                            Help
                            <HelpIcon />
                        </a>
                        : null
                    }
                    {
                        (this.props.slug === 'like')? // special-case for likes
                        <NavLink className="icon-button save" title="Done"
                        to={`/building/${this.props.building_id}.html?cat=${this.props.slug}`}>
                            Done
                            <SaveIcon />
                        </NavLink>
                        :
                        <Fragment>
                        <NavLink className="icon-button save" title="Save Changes"
                        onClick={this.handleSubmit}
                            to={`/building/${this.props.building_id}.html?cat=${this.props.slug}`}>
                            Save
                            <SaveIcon />
                        </NavLink>
                        <NavLink className="icon-button close-edit" title="Cancel"
                        to={`/building/${this.props.building_id}.html?cat=${this.props.slug}`}>
                            Cancel
                            <CloseIcon />
                        </NavLink>
                        </Fragment>
                    }
                    </nav>
                </header>

                <form action={`/building/${this.props.building_id}.html?cat=${this.props.slug}`}
                    method="GET" onSubmit={this.handleSubmit}>
                    <ErrorBox msg={this.state.error} />
                    {
                        this.props.fields.map((props) => {
                            var el;
                            switch (props.type) {
                                case "text":
                                    el = <TextInput {...props} handleChange={this.handleChange}
                                            value={this.state[props.slug]} key={props.slug} />
                                    break;
                                case "text_list":
                                    el = <TextListInput {...props} handleChange={this.handleChange}
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
                    }

                    <p className="alert alert-info">
                        Colouring may take a few seconds - try zooming the map or
                        hitting refresh after saving (we're working on making this
                        smoother).</p>

                    {
                        (this.props.slug === 'like')? // special-case for likes
                        <div className="buttons-container">
                            <Link to={`/building/${this.props.building_id}.html?cat=${this.props.slug}`}
                                className="btn btn-secondary">Done</Link>
                       </div>
                       :
                        <div className="buttons-container">
                            <Link to={`/building/${this.props.building_id}.html?cat=${this.props.slug}`}
                                className="btn btn-secondary">Cancel</Link>
                            <button type="submit" className="btn btn-primary">Save</button>
                       </div>
                    }
                </form>
            </section>
        )
    }
}

const TextInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} tooltip={props.tooltip} />
        <input className="form-control" type="text"
            id={props.slug} name={props.slug}
            value={props.value || ""}
            disabled={props.disabled}
            placeholder={props.placeholder}
            onChange={props.handleChange}
            />
    </Fragment>
);

const TextListInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} tooltip={props.tooltip} />
        <select className="form-control"
            id={props.slug} name={props.slug}
            value={props.value || ""}
            disabled={props.disabled}
            list={`${props.slug}_suggestions`}
            onChange={props.handleChange}>
            <option value="">Select a source</option>
            {
                props.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))
            }
        </select>
    </Fragment>
)

const NumberInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} tooltip={props.tooltip} />
        <input className="form-control" type="number" step={props.step}
            id={props.slug} name={props.slug}
            value={props.value || ""}
            disabled={props.disabled}
            onChange={props.handleChange}
            />
    </Fragment>
);

const LikeButton = (props) => (
    <Fragment>
        <p className="likes">{(props.value)? props.value : 0} likes</p>
        <button className="btn btn-success btn-like" onClick={props.handleLike}>Like this building!</button>
    </Fragment>
);

const Label = (props) => (
    <label htmlFor={props.slug}>
        {props.title}
        { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
    </label>
)

export default BuildingEdit;
