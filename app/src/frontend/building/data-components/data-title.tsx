import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../components/tooltip';

const DataTitle: React.FunctionComponent<any> = (props) => {
    return (
        <dt>
            { props.title }
            { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
        </dt>
    )
}

DataTitle.propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string
}

const DataTitleCopyable: React.FunctionComponent<any> = (props) => { // TODO: remove any
    return (
        <div className="data-title">
            { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
            { (props.copy && props.copy.copying && props.slug && !props.disabled)?
                <div className="icon-buttons">
                    <label className="icon-button copy">
                        Copy
                        <input
                            type="checkbox"
                            checked={props.copy.copyingKey(props.slug)}
                            onChange={() => props.copy.toggleCopyAttribute(props.slug)}/>
                    </label>
                </div>
                : null
            }
            <label htmlFor={props.slug}>
                { props.title }
            </label>
        </div>
    );
}

DataTitleCopyable.propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    slug: PropTypes.string,
    disabled: PropTypes.bool,
    copy: PropTypes.shape({
        copying: PropTypes.bool,
        copyingKey: PropTypes.func,
        toggleCopyAttribute: PropTypes.func
    })
}

export default DataTitle;
export { DataTitleCopyable }
