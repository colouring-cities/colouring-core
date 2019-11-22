import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';


interface NumericDataEntryProps extends BaseDataEntryProps {
    value?: number;
    placeholder?: string;
    step?: number;
    min?: number;
    max?: number;
}

const NumericDataEntry: React.FunctionComponent<NumericDataEntryProps> = (props) => {
    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled}
                copy={props.copy}
            />
            <input
                className="form-control"
                type="number"
                id={props.slug}
                name={props.slug}
                value={props.value == undefined ? '' : props.value}
                step={props.step == undefined ? 1 : props.step}
                max={props.max}
                min={props.min}
                disabled={props.mode === 'view' || props.disabled}
                placeholder={props.placeholder}
                onChange={e => 
                    props.onChange(
                        props.slug,
                        e.target.value === '' ? null : parseFloat(e.target.value)
                    )
                }
            />
        </Fragment>
    );
};

export default NumericDataEntry;
