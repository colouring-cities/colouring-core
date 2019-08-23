import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { DataTitleCopyable } from './data-title';

const DataEntry: React.FunctionComponent<any> = (props) => { // TODO: remove any
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
                    onChange={props.onChange}
                    />
                <label
                    htmlFor={props.slug}
                    className="form-check-label">
                    {props.title}
                </label>
            </div>
        </Fragment>
    );
}

DataEntry.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    tooltip: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func,
    copy: PropTypes.shape({
        copying: PropTypes.bool,
        copyingKey: PropTypes.func,
        toggleCopyAttribute: PropTypes.func
    })
}

export default DataEntry;
