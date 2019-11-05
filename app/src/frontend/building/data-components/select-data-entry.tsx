import React, { Fragment } from 'react';

import { DataTitleCopyable } from './data-title';
import { BaseDataEntryProps } from './data-entry';

interface SelectDataEntryProps extends BaseDataEntryProps {
    value: string;
    placeholder?: string;
    options: string[];
}


const SelectDataEntry: React.FunctionComponent<SelectDataEntryProps> = (props) => {
    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled}
                copy={props.copy}
            />
            <select className="form-control"
                id={props.slug} name={props.slug}
                value={props.value || ''}
                disabled={props.mode === 'view' || props.disabled}
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
                    props.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))
                }
            </select>
        </Fragment>
    );
}

export default SelectDataEntry;
