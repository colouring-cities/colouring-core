import React, { Component, Fragment } from 'react';

import './multi-data-entry.css';

import { BaseDataEntryProps } from '../data-entry';
import { DataEntryInput, TextDataEntryInputProps } from '../data-entry-input';
import { DataTitleCopyable } from '../data-title';


interface MultiDataEntryProps extends BaseDataEntryProps, TextDataEntryInputProps {
    value: string[];
    copyable: boolean;
    editableEntries: boolean;
    confirmOnEnter: boolean;

    addOnAutofillSelect: boolean;
    acceptAutofillValuesOnly: boolean;
}

interface MultiDataEntryState {
    newValue: string;
}

class MultiDataEntry extends Component<MultiDataEntryProps, MultiDataEntryState> {

    static defaultProps = {
        editableEntries: false,
        copyable: false,
        confirmOnEnter: true,
        addOnAutofillSelect: false,
        acceptAutofillValuesOnly: false
    };

    constructor(props) {
        super(props);
        this.state = {
            newValue: null
        };
        
        this.setNewValue = this.setNewValue.bind(this);
        this.edit = this.edit.bind(this);
        this.addNew = this.addNew.bind(this);
        this.remove = this.remove.bind(this);
    }

    getValues() {
        return this.props.value == undefined ? [] : this.props.value;
    }

    cloneValues() {
        return this.getValues().slice();
    }

    setNewValue(value: string) {
        this.setState({newValue: value});
    }

    edit(index: number, value: string) {
        let values = this.cloneValues();
        values.splice(index, 1, value);
        this.props.onChange(this.props.slug, values);
    }
    addNew(newValue?: string) {
        // accept a newValue parameter to handle cases where the value is set and submitted at the same time
        // (like with autofill select enabled) - but otherwise use the current newValue saved in state
        const val = newValue ?? this.state.newValue;
        if (val == undefined) return;
        const values = this.cloneValues().concat(val);
        this.setState({newValue: null});
        this.props.onChange(this.props.slug, values);
    }

    remove(index: number){
        const values = this.cloneValues();
        values.splice(index, 1);
        this.props.onChange(this.props.slug, values);
    }

    render() {
        const values = this.getValues();
        const props = this.props;
        const isEditing = props.mode === 'edit';
        const isDisabled = !isEditing || props.disabled;
        const slugWithModifier = props.slug + (props.slugModifier ?? '');

        return <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                slugModifier={props.slugModifier}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined || props.value.length === 0}
                copy={props.copyable ? props.copy : undefined}
            />
            <div id={`${props.slug}-wrapper`}>
                <ul className="data-link-list">
                {
                    values.length === 0 && !isEditing &&
                    <div className="input-group">
                        <input className="form-control no-entries" type="text" value="No entries" disabled={true} />
                    </div>
                }
                {
                    values.map((val, i) => (
                        <li className="input-group" key={i /* i as key prevents input component recreation on edit */}>
                            <DataEntryInput
                                slug={props.slug}
                                name={`${slugWithModifier}-${i}`}
                                id={`${slugWithModifier}-${i}`}
                                value={val}
                                disabled={!props.editableEntries || isDisabled}
                                onChange={(key, val) => this.edit(i, val)}

                                maxLength={props.maxLength}
                                isUrl={props.isUrl}
                                valueTransform={props.valueTransform}

                                autofill={props.autofill}
                                showAllOptionsOnEmpty={props.showAllOptionsOnEmpty}
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
                        <DataEntryInput
                            slug={props.slug}
                            name={slugWithModifier}
                            id={slugWithModifier}
                            value={this.state.newValue}
                            disabled={props.disabled}
                            required={props.required && values.length < 1}
                            onChange={(key, val) => this.setNewValue(val)}
                            onConfirm={(key, val) => this.addNew(val)}

                            maxLength={props.maxLength}
                            placeholder={props.placeholder}
                            isUrl={props.isUrl}
                            valueTransform={props.valueTransform}
                            confirmOnEnter={props.confirmOnEnter}

                            autofill={props.autofill}
                            showAllOptionsOnEmpty={props.showAllOptionsOnEmpty}
                            confirmOnAutofillSelect={true}
                        />
                        <div className="input-group-append">
                            <button type="button"
                                className="btn btn-outline-dark"
                                title="Add to list"
                                onClick={() => this.addNew()}
                                disabled={this.state.newValue == undefined}
                            >+</button>
                        </div>
                    </div>
                }
            </div>
        </Fragment>;
    }
}

export default MultiDataEntry;
