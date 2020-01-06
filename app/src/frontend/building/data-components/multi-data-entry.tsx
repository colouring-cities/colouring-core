import React, { Component, Fragment } from 'react';

import { sanitiseURL } from '../../helpers';

import { BaseDataEntryProps } from './data-entry';
import { TextDataEntryInput, TextDataEntryInputProps } from './data-entry-input';
import { DataTitleCopyable } from './data-title';


interface MultiDataEntryProps extends BaseDataEntryProps, TextDataEntryInputProps {
    value: string[];
}

interface MultiDataEntryState {
    newValue: string;
}

class MultiDataEntry extends Component<MultiDataEntryProps, MultiDataEntryState> {

    constructor(props) {
        super(props);
        this.state = {
            newValue: ''
        };
        
        this.setNewValue = this.setNewValue.bind(this);
        this.edit = this.edit.bind(this);
        this.addNew = this.addNew.bind(this);
        this.remove = this.remove.bind(this);
        this.getValues = this.getValues.bind(this);
    }

    getValues() {
        return this.props.value == undefined ? [] : this.props.value;
    }

    setNewValue(value: string) {
        this.setState({newValue: value});
    }

    edit(index: number, value: string) {
        let values = this.getValues();
        values.splice(index, 1, value);
        this.props.onChange(this.props.slug, values);
    }
    addNew(event) {
        event.preventDefault();
        const values = this.getValues().concat(this.state.newValue);
        this.setState({newValue: ''});
        this.props.onChange(this.props.slug, values);
    }

    remove(index: number){
        const values = this.getValues();
        values.splice(index, 1);
        this.props.onChange(this.props.slug, values);
    }

    render() {
        const values = this.getValues();
        const props = this.props;
        const isDisabled = props.mode === 'view' || props.disabled;
        return <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined || props.value.length === 0}
            />
            <ul className="data-link-list">
            {
                values.length === 0 &&
                <div>No elements</div>
            }
            {
                values.map((val, i) => (
                    <li className="input-group" key={i}>
                        <TextDataEntryInput
                            slug={`${props.slug}-${i}`}
                            value={val}
                            disabled={isDisabled}
                            onChange={(key, val) => this.edit(i, val)}

                            maxLength={props.maxLength}
                            placeholder={props.placeholder}
                            valueTransform={props.valueTransform}
                        />
                        {
                            !isDisabled &&
                            <div className="input-group-append">
                                <button type="button" onClick={e => this.remove(i)}
                                    title="Remove"
                                    data-index={i} className="btn btn-outline-dark">✕</button>
                            </div>
                        }
                    </li>
                ))
            }
            </ul>
            {
                !isDisabled &&
                <div className="input-group">
                    <TextDataEntryInput 
                        slug='new'
                        value={this.state.newValue}
                        disabled={props.disabled}
                        onChange={(key, val) => this.setNewValue(val)}

                        maxLength={props.maxLength}
                        placeholder={props.placeholder}
                        valueTransform={props.valueTransform}
                    />
                    <div className="input-group-append">
                        <button type="button" onClick={this.addNew}
                            title="Add to list"
                            className="btn btn-outline-dark">Add to list</button>
                    </div>
                </div>
            }
        </Fragment>;
    }
}

export default MultiDataEntry;
