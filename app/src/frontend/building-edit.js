import React, { Component, Fragment } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';

import ErrorBox from './error-box';
import InfoBox from './info-box';
import Sidebar from './sidebar';

import CONFIG from './fields-config.json';


class BuildingEdit extends Component {
    render() {
        if (!this.props.user){
            return <Redirect to="/sign-up.html" />
        }
        if (!this.props.building_id){
            return (
                <Sidebar title="Building Not Found" back="/map/date_year.html">
                    <InfoBox msg="We can't find that one anywhere - try the map again?" />
                    <div className="buttons-container">
                        <Link to="/map/date_year.html" className="btn btn-secondary">Back to maps</Link>
                    </div>
                </Sidebar>
            );
        }
        return (
            <Sidebar title={`Edit Building`} back={`/building/${this.props.building_id}.html`}>
                {
                    CONFIG.map((conf_props) => {
                        return <EditForm {...conf_props} {...this.props} key={conf_props.slug} />
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
