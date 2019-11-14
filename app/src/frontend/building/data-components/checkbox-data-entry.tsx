import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';

interface CheckboxDataEntryProps extends BaseDataEntryProps {
    value: boolean;
}

const CheckboxDataEntry: React.FunctionComponent<CheckboxDataEntryProps> = (props) => {
    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled}
                copy={props.copy}
            />
            <div className="form-check">
                <input className="form-check-input" type="checkbox"
                    id={props.slug}
                    name={props.slug}
                    checked={!!props.value}
                    disabled={props.mode === 'view' || props.disabled}
                    onChange={e => props.onChange(props.slug, e.target.checked)}
                    />
                <label
                    htmlFor={props.slug}
                    className="form-check-label">
                    {props.title}
                </label>
            </div>
        </Fragment>
    );
};

export default CheckboxDataEntry;
