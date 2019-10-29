import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../components/tooltip';


interface DataTitleProps {
    title: string;
    tooltip: string;
}

const DataTitle: React.FunctionComponent<DataTitleProps> = (props) => {
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


interface DataTitleCopyableProps {
    title: string;
    tooltip: string;
    slug: string;
    disabled?: boolean;
    copy?: any; // TODO: type should be CopyProps, but that clashes with propTypes in some obscure way
}

const DataTitleCopyable: React.FunctionComponent<DataTitleCopyableProps> = (props) => {
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
        toggleCopyAttribute: PropTypes.func,
        toggleCopying: PropTypes.func
    })
}

export default DataTitle;
export { DataTitleCopyable }
