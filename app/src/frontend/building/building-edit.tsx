import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tooltip from '../components/tooltip';

const TextInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} tooltip={props.tooltip}
            copying={props.copying}
            toggleCopyAttribute={props.toggleCopyAttribute}
            copy={props.copy}
            cat={props.cat}
            disabled={props.disabled} />
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
            copying={props.copying}
            toggleCopyAttribute={props.toggleCopyAttribute}
            copy={props.copy}
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

class MultiTextInput extends Component<any, any> { // TODO: add proper types
    static propTypes = { // TODO: generate propTypes from TS
        slug: PropTypes.string,
        title: PropTypes.string,
        tooltip: PropTypes.string,
        value: PropTypes.arrayOf(PropTypes.string),
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        handleChange: PropTypes.func,
        copy: PropTypes.bool,
        toggleCopyAttribute: PropTypes.func,
        copying: PropTypes.bool
    };

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
                <Label slug={this.props.slug} title={this.props.title} tooltip={this.props.tooltip}
                    cat={this.props.cat}
                    copying={this.props.copying}
                    disabled={this.props.disabled}
                    toggleCopyAttribute={this.props.toggleCopyAttribute}
                    copy={this.props.copy} />
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

const TextListInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} tooltip={props.tooltip}
            cat={props.cat} disabled={props.disabled}
            copying={props.copying}
            toggleCopyAttribute={props.toggleCopyAttribute}
            copy={props.copy} />
        <select className="form-control"
            id={props.slug} name={props.slug}
            value={props.value || ''}
            disabled={props.disabled}
            // list={`${props.slug}_suggestions`} TODO: investigate whether this was needed
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
            copying={props.copying}
            toggleCopyAttribute={props.toggleCopyAttribute}
            copy={props.copy} />
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

class YearEstimator extends Component<any, any> { // TODO: add proper types
    static propTypes = { // TODO: generate propTypes from TS
        slug: PropTypes.string,
        title: PropTypes.string,
        tooltip: PropTypes.string,
        date_year: PropTypes.number,
        date_upper: PropTypes.number,
        date_lower: PropTypes.number,
        value: PropTypes.number,
        disabled: PropTypes.bool,
        handleChange: PropTypes.func,
        copy: PropTypes.bool,
        toggleCopyAttribute: PropTypes.func,
        copying: PropTypes.bool
    };

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
            <NumberInput {...this.props}
                handleChange={this.props.handleChange}

                value={this.props.value}
                key={this.props.slug}
                 />
        )
    }
}

const CheckboxInput = (props) => (
    <Fragment>
        <Label slug={props.slug} title={props.title} tooltip={props.tooltip}
            cat={props.cat} disabled={props.disabled}
            copying={props.copying}
            toggleCopyAttribute={props.toggleCopyAttribute}
            copy={props.copy} />
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
    </Fragment>
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
                to={`/multi-edit/${props.cat}.html`}>
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

const Label: React.FunctionComponent<any> = (props) => { // TODO: remove any
    return (
        <label htmlFor={props.slug}>
            {props.title}
            { (props.copying && props.cat && props.slug && !props.disabled)?
                <div className="icon-buttons">
                    <label className="icon-button copy">
                        Copy
                        <input type="checkbox" checked={props.copy}
                            onChange={() => props.toggleCopyAttribute(props.slug)}/>
                    </label>
                </div> : null
            }
            { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
        </label>
    );
}

Label.propTypes = {
    slug: PropTypes.string,
    cat: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    tooltip: PropTypes.string
}

export default BuildingEdit;
