import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectDataEntryProps extends BaseDataEntryProps {
    value: string;
    placeholder?: string;
    options: (string | SelectOption)[];
}

function makeOption(option: string | SelectOption): SelectOption {
    if(typeof option !== 'string' && 'value' in option && 'label' in option) {
        return option;
    } else return {
        value: option,
        label: option
    }
}

const SelectDataEntry: React.FunctionComponent<SelectDataEntryProps> = (props) => {
    const slugWithModifier = props.slug + (props.slugModifier ?? '');

    const options = props.options.map(makeOption);

    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                slugModifier={props.slugModifier}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined}
                copy={props.copy}
            />
            <select className="form-control"
                id={slugWithModifier} name={slugWithModifier}
                value={props.value || ''}
                disabled={props.mode === 'view' || props.disabled}
                required={props.required}
                onChange={e => 
                    props.onChange(
                        props.slug,
                        e.target.value === '' ?
                            null :
                            e.target.value
                    )}
            >
                <option value="">{props.placeholder}</option>
                {
                    options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </Fragment>
    );
};

export default SelectDataEntry;
