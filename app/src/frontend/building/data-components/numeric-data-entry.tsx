import React, { Fragment } from 'react';

import { DataTitleCopyable } from './data-title';
import { BaseDataEntryProps } from './data-entry';


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
                value={props.value || ''}
                step={props.step || 1}
                max={props.max}
                min={props.min || 0}
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
}

export default NumericDataEntry;
