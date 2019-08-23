import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { DataTitleCopyable } from './data-title';

const NumericDataEntry: React.FunctionComponent<any> = (props) => { // TODO: remove any
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
                onChange={props.onChange}
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
