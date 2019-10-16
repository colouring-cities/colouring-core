import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { DataTitleCopyable } from './data-title';


interface NumericDataEntryProps {
    slug: string;
    title: string;
    tooltip?: string;
    disabled?: boolean;
    copy: any; // CopyProps clashes with propTypes
    mode: 'view' | 'edit' | 'multi-edit';
    onChange: (key: string, value: any) => void;

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

NumericDataEntry.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    tooltip: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
    copy: PropTypes.shape({
        copying: PropTypes.bool,
        copyingKey: PropTypes.func,
        toggleCopyAttribute: PropTypes.func
    })
}

export default NumericDataEntry;
