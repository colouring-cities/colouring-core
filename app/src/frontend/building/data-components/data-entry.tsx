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
            <dd>
                {
                    (props.value != null && props.value !== '')?
                        (typeof(props.value) === 'boolean')?
                            (props.value)? 'Yes' : 'No'
                            : props.value
                        : '\u00A0'
                }
            </dd>
        </Fragment>
    );
}

DataEntry.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    tooltip: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    copy: PropTypes.shape({
        copying: PropTypes.bool,
        copyingKey: PropTypes.func,
        toggleCopyAttribute: PropTypes.func
    })
}

export default DataEntry;
