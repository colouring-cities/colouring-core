import React, { Component, Fragment } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';

import ErrorBox from './error-box';
import InfoBox from './info-box';
import Sidebar from './sidebar';
import Tooltip from './tooltip';
import { SaveIcon } from './icons';
import { parseCategoryURL } from '../parse';

import CONFIG from './fields-config.json';


const BuildingEdit = (props) => {
    if (!props.user){
        return <Redirect to="/sign-up.html" />
    }
    const cat = parseCategoryURL(props.match.url);
    if (!props.building_id){
        return (
            <Sidebar title="Building Not Found" back={`/edit/${cat}.html`}>
                <InfoBox msg="We can't find that one anywhere - try the map again?" />
                <div className="buttons-container">
                    <Link to={`/edit/${cat}.html`} className="btn btn-secondary">Back to maps</Link>
                </div>
            </Sidebar>
        );
    }
    return (
        <Sidebar
            key={props.building_id}
            title={`You are editing`}
            back={`/edit/${cat}.html`}>
            {
                CONFIG.map((conf_props) => {
                    return <EditForm
                        {...conf_props} {...props}
                        cat={cat} key={conf_props.slug} />
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
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    /**
     * Handle changes on typical inputs
     * - e.g. input[type=text], radio, select, textare
     *
     * @param {DocumentEvent} event
     */
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

    /**
     * Handle update directly
     * - e.g. as callback from MultiTextInput where we set a list of strings
     *
     * @param {String} key
     * @param {*} value
     */
    handleUpdate(key, value) {
        this.setState({
            [key]: value
        });
    }

    /**
     * Handle likes separately
     * - like/love reaction is limited to set/unset per user
     *
     * @param {DocumentEvent} event
     */
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
            }
        }.bind(this)).catch(
            (err) => this.setState({error: err})
        );
    }

    render() {
        const match = this.props.cat === this.props.slug;
        return (
            <section className={(this.props.inactive)? "data-section inactive": "data-section"}>
                <header className={(match? "active " : "") + " section-header edit"}>
                    <NavLink
                        to={`/edit/${this.props.slug}/building/${this.props.building_id}.html`}
                        title={(this.props.inactive)? 'Coming soon… Click the ? for more info.' :
                            (match)? 'Hide details' : 'Show details'}
                        isActive={() => match}>
                        <h3 className="h3">{this.props.title}</h3>
                    </NavLink>
                    <nav className="icon-buttons">
                    {
                        this.props.help?
                        <a className="icon-button help" title="Find out more" href={this.props.help}>
                            More info
                        </a>
                        : null
                    }
                    {
                        (match && this.props.slug !== 'like')? // special-case for likes
                        <NavLink className="icon-button save" title="Save Changes"
                        onClick={this.handleSubmit}
                            to={`/edit/${this.props.slug}/building/${this.props.building_id}.html`}>
                            Save
                            <SaveIcon />
                        </NavLink>
                        : null
                    }
                    </nav>
                </header>
                {
                match? (
                <form action={`/edit/${this.props.slug}/building/${this.props.building_id}.html`}
                    method="GET" onSubmit={this.handleSubmit}>
                    {
                        this.props.slug === 'location'?
                        <InfoBox msg="Text-based address fields are disabled at the moment. We're looking into how best to collect this data." />
                        : null
                    }
                    <ErrorBox msg={this.state.error} />
                    {
                        this.props.fields.map((props) => {
                            switch (props.type) {
                                case "text":
                                    return <TextInput {...props} handleChange={this.handleChange}
                                            value={this.state[props.slug]} key={props.slug} />
                                case "text_list":
                                    return <TextListInput {...props} handleChange={this.handleChange}
                                            value={this.state[props.slug]} key={props.slug} />
                                case "text_long":
                                    return <LongTextInput {...props} handleChange={this.handleChange}
                                            value={this.state[props.slug]} key={props.slug} />
                                case "number":
                                    return <NumberInput {...props} handleChange={this.handleChange}
                                            value={this.state[props.slug]} key={props.slug} />
                                case "text_multi":
                                    return <MultiTextInput {...props} handleChange={this.handleUpdate}
                                            value={this.state[props.slug]} key={props.slug} />
                                case "checkbox":
                                    return null // TODO checkbox input
                                case "like":
                                    return <LikeButton {...props} handleLike={this.handleLike}
                                            value={this.state[props.slug]} key={props.slug} />
                                default:
                                    return null
                            }
                        })
                    }
                    <InfoBox msg="Colouring may take a few seconds - try zooming the map or hitting refresh after saving (we're working on making this smoother)." />

                    {
                        (this.props.slug === 'like')? // special-case for likes
                        null :
                        <div className="buttons-container">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    }
                </form>
                ) : null
            }
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
            maxlength={props.max_length}
            disabled={props.disabled}
            placeholder={props.placeholder}
            onChange={props.handleChange}
            />
    </Fragment>
);

const LongTextInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} tooltip={props.tooltip} />
        <textarea className="form-control"
            id={props.slug} name={props.slug}
            disabled={props.disabled}
            placeholder={props.placeholder}
            onChange={props.handleChange}
            value={props.value || ""}></textarea>
    </Fragment>
)


class MultiTextInput extends Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.getValues = this.getValues.bind(this);
    }

    getValues() {
        return (this.props.value && this.props.value.length)? this.props.value : [null];
    }

    edit(event) {
        const edit_i = +event.target.dataset.index;
        const edit_item = event.target.value;
        const old_values = this.getValues();
        const values = old_values.map((item, i) => {
            return i === edit_i ? edit_item : item;
        });
        this.props.handleChange(this.props.slug, values);
    }

    add(event) {
        event.preventDefault();
        const values = this.getValues().concat("");
        this.props.handleChange(this.props.slug, values);
    }

    remove(event){
        const remove_i = +event.target.dataset.index;
        const values = this.getValues().filter((_, i) => {
            return i !== remove_i;
        });
        this.props.handleChange(this.props.slug, values);
    }

    render() {
        const values = this.getValues();
        return (
        <Fragment>
            <Label slug={this.props.slug} title={this.props.title} tooltip={this.props.tooltip} />
            {
                values.map((item, i) => (
                <div class="input-group">
                    <input className="form-control" type="text"
                        key={`${this.props.slug}-${i}`} name={`${this.props.slug}-${i}`}
                        data-index={i}
                        value={item || ""}
                        placeholder={this.props.placeholder}
                        disabled={this.props.disabled}
                        onChange={this.edit}
                        />
                    <div class="input-group-append">
                        <button type="button" onClick={this.remove}
                                title="Remove"
                                data-index={i} class="btn btn-outline-dark">✕</button>
                    </div>
                </div>
                ))
            }
            <button type="button" title="Add" onClick={this.add}
                    class="btn btn-outline-dark">+</button>
        </Fragment>
        )
    }
}

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
