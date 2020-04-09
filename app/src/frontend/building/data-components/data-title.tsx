import React from 'react';

import Tooltip from '../../components/tooltip';
import { CopyProps } from '../data-containers/category-view-props';


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
    );
};


interface DataTitleCopyableProps {
    title: string;
    tooltip?: string;
    slug: string;
    disabled?: boolean;
    copy?: CopyProps;
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
};

export default DataTitle;
export { DataTitleCopyable };
