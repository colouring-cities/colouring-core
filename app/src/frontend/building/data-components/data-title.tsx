import Markdown from 'markdown-to-jsx';
import React from 'react';

import Tooltip from '../../components/tooltip';
import { CopyProps } from '../data-containers/category-view-props';

import './data-title.css';

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
    slugModifier?: string | number;
    disabled?: boolean;
    copy?: CopyProps;
}

const DataTitleCopyable: React.FunctionComponent<DataTitleCopyableProps> = (props) => {
    return (
        <div className="data-title">
            <div className="data-title-text">
                <label htmlFor={`${props.slug}${props.slugModifier ?? ''}`}>
                    <Markdown>
                        { props.title }
                    </Markdown>
                </label>
            </div>
            <div className="data-title-actions icon-buttons">
                { (props.copy && props.copy.copying && props.slug && !props.disabled)?
                        <label className="icon-button copy">
                            Copy
                            <input
                                type="checkbox"
                                checked={props.copy.copyingKey(props.slug)}
                                onChange={() => props.copy.toggleCopyAttribute(props.slug)}/>
                        </label>
                    : null
                }
                { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
            </div>
        </div>
    );
};

export default DataTitle;
export { DataTitleCopyable };
