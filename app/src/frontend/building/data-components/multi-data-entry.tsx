import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { sanitiseURL } from '../../helpers';
import { DataTitleCopyable } from './data-title';


class MultiDataEntry extends Component<any, any> { // TODO: add proper types
    static propTypes = { // TODO: generate propTypes from TS
        slug: PropTypes.string,
        title: PropTypes.string,
        tooltip: PropTypes.string,
        value: PropTypes.arrayOf(PropTypes.string),
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
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
        this.props.onChange(this.props.slug, values);
    }

    add(event) {
        event.preventDefault();
        const values = this.getValues().concat('');
        this.props.onChange(this.props.slug, values);
    }

    remove(event){
        const removeIndex = +event.target.dataset.index;
        const values = this.getValues().filter((_, i) => {
            return i !== removeIndex;
        });
        this.props.onChange(this.props.slug, values);
    }

    render() {
        const values = this.getValues();
        const props = this.props;
        return <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled}
            />
            {
                (props.mode === 'view')?
                    (props.value && props.value.length)?
                        <ul className="data-link-list">
                        {
                            props.value.map((item, index) => {
                                return <li
                                    key={index}
                                    className="form-control">
                                    <a href={sanitiseURL(item)}>{item}</a>
                                </li>
                            })
                        }
                        </ul>
                    :'\u00A0'
                : values.map((item, i) => (
                    <div className="input-group" key={i}>
                        <input className="form-control" type="text"
                            key={`${props.slug}-${i}`} name={`${props.slug}-${i}`}
                            data-index={i}
                            value={item || ''}
                            placeholder={props.placeholder}
                            disabled={props.disabled}
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
            <button
                type="button"
                title="Add"
                onClick={this.add}
                disabled={props.mode === 'view'}
                className="btn btn-outline-dark">+</button>
        </Fragment>
    }
}

export default MultiDataEntry;
