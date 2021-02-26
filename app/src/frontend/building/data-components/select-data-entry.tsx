import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';

interface SelectDataEntryProps extends BaseDataEntryProps {
    value: string;
    placeholder?: string;
    options: string[];
}


const SelectDataEntry: React.FunctionComponent<SelectDataEntryProps> = (props) => {
    return (
        <div>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined}
                copy={props.copy}
            />
            <select className="form-control"
                id={props.slug} name={props.slug}
                value={props.value || props.required ? undefined : ''}
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
                <option disabled={true} selected={true} value={null}>{props.placeholder}</option>
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
