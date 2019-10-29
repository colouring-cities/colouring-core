import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { DataTitleCopyable } from './data-title';
import { BaseDataEntryProps } from './data-entry';

interface TextboxDataEntryProps extends BaseDataEntryProps {
    value: string;
    placeholder?: string;
    maxLength?: number;
}

const TextboxDataEntry: React.FunctionComponent<TextboxDataEntryProps> = (props) => {
    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled}
                copy={props.copy}
            />
            <textarea
                className="form-control"
                id={props.slug}
                name={props.slug}
                value={props.value || ''}
                maxLength={props.maxLength}
                rows={5}
                disabled={props.mode === 'view' || props.disabled}
                placeholder={props.placeholder}
                onChange={e => 
                    props.onChange(
                        props.slug,
                        e.target.value === '' ?
                            null :
                            e.target.value
                    )
                }
                ></textarea>
        </Fragment>
    );
}

TextboxDataEntry.propTypes = {
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

export default TextboxDataEntry;
