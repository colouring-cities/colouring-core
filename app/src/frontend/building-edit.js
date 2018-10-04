import React, { Component, Fragment } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import ErrorBox from './error-box';
import InfoBox from './info-box';
import Sidebar from './sidebar';
import { HelpIcon, CloseIcon, SaveIcon } from './icons';

import CONFIG from './fields-config.json';


const BuildingEdit = (props) => {
    if (!props.user){
        return <Redirect to="/sign-up.html" />
    }
    if (!props.building_id){
        return (
            <Sidebar title="Building Not Found" back="/map/date_year.html">
                <InfoBox msg="We can't find that one anywhere - try the map again?" />
                <div className="buttons-container">
                    <Link to="/map/date_year.html" className="btn btn-secondary">Back to maps</Link>
                </div>
            </Sidebar>
        );
    }

    const search = (props.location && props.location.search)?
        queryString.parse(props.location.search):
        {};
    return (
        <Sidebar title={`Edit Building`} back={`/building/${props.building_id}.html`}>
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
        const match = this.props.search.cat === this.props.slug;
        return (
            <section className={(this.props.inactive)? "data-section inactive": "data-section"}>
                <header className={(match? "active " : "") + "bullet-prefix section-header"}>
                    <NavLink
                        to={`/building/${this.props.building_id}/edit.html` + ((match)? '': `?cat=${this.props.slug}`)}
                        isActive={() => match}>
                        <h3 className="h3">{this.props.title}</h3>
                    </NavLink>
                    {
                        this.props.help?
                        <a className="icon-button help" title="Find out more" href={this.props.help}
                            target="_blank" rel="noopener noreferrer">
                            <HelpIcon />
                        </a>
                        : null
                    }
                    {
                        match?
                        <Fragment>
                            <NavLink className="icon-button save" title="Save Changes"
                                to={`/building/${this.props.building_id}.html?cat=${this.props.slug}`}>
                                <SaveIcon />
                            </NavLink>
                            <NavLink className="icon-button close" title="Cancel"
                                to={`/building/${this.props.building_id}.html?cat=${this.props.slug}`}>
                                <CloseIcon />
                            </NavLink>
                        </Fragment>
                        : null
                    }
                </header>
                { (match && this.props.intro)? <p className="data-intro">{ this.props.intro }</p> : null }
                {
                    match?
                    <form action={`/building/${this.props.building_id}.html?cat=${this.props.slug}`}
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
                : null
            }
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
