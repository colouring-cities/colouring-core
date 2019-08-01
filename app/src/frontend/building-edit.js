import React, { Component, Fragment } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ErrorBox from './error-box';
import InfoBox from './info-box';
import Sidebar from './sidebar';
import Tooltip from './tooltip';
import { SaveIcon } from './icons';

import CONFIG from './fields-config.json';

const BuildingEdit = (props) => {
    if (!props.user){
        return <Redirect to="/sign-up.html" />
    }
    const cat = props.match.params.cat;
    if (!props.building_id){
        return (
            <Sidebar title="Building Not Found" back={`/edit/${cat}.html`}>
                <InfoBox msg="We can't find that one anywhere - try the map again?" />
                <div className="buttons-container ml-3 mr-3">
                    <Link to={`/edit/${cat}.html`} className="btn btn-secondary">Back to maps</Link>
                </div>
            </Sidebar>
        );
    }
    return (
        <Sidebar
            key={props.building_id}
            title={'You are editing'}
            back={`/edit/${cat}.html`}>
            {
                CONFIG.map((section) => {
                    return <EditForm
                        {...section} {...props}
                        cat={cat} key={section.slug} />
                })
            }
        </Sidebar>
    );
}

BuildingEdit.propTypes = {
    user: PropTypes.object,
    match: PropTypes.object,
    building_id: PropTypes.number
}

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        for (const field of props.fields) {
            this.state[field.slug] = props[field.slug]
        }
        this.state.error = this.props.error || undefined;
        this.state.like = this.props.like || undefined;

        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
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
     * Handle changes on checkboxes
     * - e.g. input[type=checkbox]
     *
     * @param {DocumentEvent} event
     */
    handleCheck(event) {
        const target = event.target;
        const value = target.checked;
        const name = target.name;

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
        const like = event.target.checked;

        fetch(`/building/${this.props.building_id}/like.json`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({like: like})
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
        const cat = this.props.cat;
        const buildingLike = this.props.building_like;

        return (
            <section className={(this.props.inactive)? 'data-section inactive': 'data-section'}>
                <header className={`section-header edit ${this.props.slug} ${(match? 'active' : '')}`}>
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
                            Info
                                </a>
                                : null
                        }
                        {
                            (match && !this.props.inactive && this.props.slug !== 'like')? // special-case for likes
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
                        !this.props.inactive?
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
                                        case 'text':
                                            return <TextInput {...props} handleChange={this.handleChange}
                                                value={this.state[props.slug]} key={props.slug} cat={cat} />
                                        case 'text_list':
                                            return <TextListInput {...props} handleChange={this.handleChange}
                                                value={this.state[props.slug]} key={props.slug} cat={cat} />
                                        case 'text_long':
                                            return <LongTextInput {...props} handleChange={this.handleChange}
                                                value={this.state[props.slug]} key={props.slug} cat={cat} />
                                        case 'number':
                                            return <NumberInput {...props} handleChange={this.handleChange}
                                                value={this.state[props.slug]} key={props.slug} cat={cat} />
                                        case 'year_estimator':
                                            return <YearEstimator {...props} handleChange={this.handleChange}
                                                value={this.state[props.slug]} key={props.slug} cat={cat} />
                                        case 'text_multi':
                                            return <MultiTextInput {...props} handleChange={this.handleUpdate}
                                                value={this.state[props.slug]} key={props.slug} cat={cat} />
                                        case 'checkbox':
                                            return <CheckboxInput {...props} handleChange={this.handleCheck}
                                                value={this.state[props.slug]} key={props.slug} cat={cat} />
                                        case 'like':
                                            return <LikeButton {...props} handleLike={this.handleLike}
                                                building_like={buildingLike}
                                                value={this.state[props.slug]} key={props.slug} cat={cat} />
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
                            : <form>
                                <InfoBox msg={`We're not collecting data on ${this.props.title.toLowerCase()} yet - check back soon.`} />
                            </form>
                    ) : null
                }
            </section>
        )
    }
}

EditForm.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    cat: PropTypes.string,
    help: PropTypes.string,
    error: PropTypes.object,
    like: PropTypes.bool,
    building_like: PropTypes.bool,
    selectBuilding: PropTypes.func,
    building_id: PropTypes.number,
    inactive: PropTypes.bool,
    fields: PropTypes.array
}

const TextInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} tooltip={props.tooltip}
            cat={props.cat} disabled={props.disabled}
            value={props.value || ''}
        />
        <input className="form-control" type="text"
            id={props.slug} name={props.slug}
            value={props.value || ''}
            maxLength={props.max_length}
            disabled={props.disabled}
            placeholder={props.placeholder}
            onChange={props.handleChange}
        />
    </Fragment>
);

TextInput.propTypes = {
    slug: PropTypes.string,
    cat: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.string,
    max_length: PropTypes.number,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func
}

const LongTextInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} cat={props.cat}
            disabled={props.disabled} tooltip={props.tooltip} />
        <textarea className="form-control"
            id={props.slug} name={props.slug}
            disabled={props.disabled}
            placeholder={props.placeholder}
            onChange={props.handleChange}
            value={props.value || ''}></textarea>
    </Fragment>
)

LongTextInput.propTypes = {
    slug: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func
}

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
        const editIndex = +event.target.dataset.index;
        const editItem = event.target.value;
        const oldValues = this.getValues();
        const values = oldValues.map((item, i) => {
            return i === editIndex ? editItem : item;
        });
        this.props.handleChange(this.props.slug, values);
    }

    add(event) {
        event.preventDefault();
        const values = this.getValues().concat('');
        this.props.handleChange(this.props.slug, values);
    }

    remove(event){
        const removeIndex = +event.target.dataset.index;
        const values = this.getValues().filter((_, i) => {
            return i !== removeIndex;
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
                        <div className="input-group" key={i}>
                            <input className="form-control" type="text"
                                key={`${this.props.slug}-${i}`} name={`${this.props.slug}-${i}`}
                                data-index={i}
                                value={item || ''}
                                placeholder={this.props.placeholder}
                                disabled={this.props.disabled}
                                onChange={this.edit}
                            />
                            <div className="input-group-append">
                                <button type="button" onClick={this.remove}
                                    title="Remove"
                                    data-index={i} className="btn btn-outline-dark">✕</button>
                            </div>
                        </div>
                    ))
                }
                <button type="button" title="Add" onClick={this.add}
                    className="btn btn-outline-dark">+</button>
            </Fragment>
        )
    }
}

MultiTextInput.propTypes = {
    slug: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    handleChange: PropTypes.func
}

const TextListInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} tooltip={props.tooltip}
            cat={props.cat} disabled={props.disabled}
            value={props.value || ''}
        />
        <select className="form-control"
            id={props.slug} name={props.slug}
            value={props.value || ''}
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

TextListInput.propTypes = {
    slug: PropTypes.string,
    cat: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    disabled: PropTypes.bool,
    handleChange: PropTypes.func
}

const NumberInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} tooltip={props.tooltip}
            cat={props.cat} disabled={props.disabled}
            value={props.value || ''}
        />
        <input className="form-control" type="number" step={props.step}
            id={props.slug} name={props.slug}
            value={props.value || ''}
            disabled={props.disabled}
            onChange={props.handleChange}
        />
    </Fragment>
);

NumberInput.propTypes = {
    slug: PropTypes.string,
    cat: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    step: PropTypes.number,
    value: PropTypes.number,
    disabled: PropTypes.bool,
    handleChange: PropTypes.func
}

class YearEstimator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: props.date_year,
            upper: props.date_upper,
            lower: props.date_lower,
            decade: Math.floor(props.date_year / 10) * 10,
            century: Math.floor(props.date_year / 100) * 100
        }
    }
    // TODO add dropdown for decade, century
    // TODO roll in first/last year estimate
    // TODO handle changes internally, reporting out date_year, date_upper, date_lower
    render() {
        return (
            <NumberInput {...this.props} handleChange={this.props.handleChange}
                value={this.props.value} key={this.props.slug} />
        )
    }
}

YearEstimator.propTypes = {
    slug: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    date_year: PropTypes.number,
    date_upper: PropTypes.number,
    date_lower: PropTypes.number,
    value: PropTypes.number,
    disabled: PropTypes.bool,
    handleChange: PropTypes.func
}

const CheckboxInput = (props) => (
    <div className="form-check">
        <input className="form-check-input" type="checkbox"
            id={props.slug} name={props.slug}
            checked={!!props.value}
            disabled={props.disabled}
            onChange={props.handleChange}
        />
        <label htmlFor={props.slug} className="form-check-label">
            {props.title}
            { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
        </label>
    </div>
)

CheckboxInput.propTypes = {
    slug: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    handleChange: PropTypes.func
}

const LikeButton = (props) => (
    <Fragment>
        <p className="likes">{(props.value)? props.value : 0} likes</p>
        <div className="form-check">
            <input className="form-check-input" type="checkbox"
                id={props.slug} name={props.slug}
                checked={!!props.building_like}
                disabled={props.disabled}
                onChange={props.handleLike}
            />
            <label htmlFor={props.slug} className="form-check-label">
                I like this building and think it contributes to the city!
                { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
            </label>
        </div>
        <p>
            <NavLink
                to={`/multi-edit/${props.cat}.html?k=like&v=${true}`}>
                Like more buildings
            </NavLink>
        </p>
    </Fragment>
);

LikeButton.propTypes = {
    slug: PropTypes.string,
    cat: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.number,
    building_like: PropTypes.bool,
    disabled: PropTypes.bool,
    handleLike: PropTypes.func
}

const Label = (props) => {
    const data = {};
    data[props.slug] = props.value;
    const data_string = JSON.stringify(data);
    return (
        <label htmlFor={props.slug}>
            {props.title}
            { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
            { (props.cat && props.slug && !props.disabled)?
                <div className="icon-buttons">
                    <NavLink
                        to={`/multi-edit/${props.cat}.html?data=${data_string}`}
                        className="icon-button copy">
                        Copy
                    </NavLink>
                </div> : null
            }
        </label>
    );
}

Label.propTypes = {
    slug: PropTypes.string,
    cat: PropTypes.string,
    value: PropTypes.any,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    tooltip: PropTypes.string
}

export default BuildingEdit;
