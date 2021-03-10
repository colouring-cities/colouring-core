import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';

interface SelectDataEntryProps extends BaseDataEntryProps {
    value: string;
    placeholder?: string;
    options: string[];
}


const SelectDataEntry: React.FunctionComponent<SelectDataEntryProps> = (props) => {
    const slugWithModifier = props.slug + (props.slugModifier ?? '');

    return (
        <div>
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
                value={props.value ?? ''}
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
                <option value=''>{props.placeholder}</option>
                {
                    props.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))
                }
            </select>
        </div>
    );
};

export default SelectDataEntry;
