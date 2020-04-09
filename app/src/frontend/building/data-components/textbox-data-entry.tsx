import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';

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
                disabled={props.disabled || props.value == undefined}
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
};

export default TextboxDataEntry;
