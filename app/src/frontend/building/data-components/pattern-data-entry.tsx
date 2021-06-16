import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';


interface PatternDataEntryProps extends BaseDataEntryProps {
    value?: string;
    placeholder?: string;
    /**
     * This is not a JS RegExp, so there's no validation in code, because we're passing it to HTML input as a string
     */
    pattern: string;
    maxLength?: number;
}

export const PatternDataEntry: React.FC<PatternDataEntryProps> = props => {
    const handleChange = (value: string) => {
        props.onChange?.(props.slug, value);
    };

    return (
        <>
            <DataTitleCopyable
                slug={props.slug}
                slugModifier={props.slugModifier}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined || props.value == ''}
                copy={props.copy}
            />
            <input className="form-control" type={props.isUrl? "url" : "text"}
                value={props.value || ''}
                required={props.required}
                disabled={props.mode === 'view' || props.disabled}
                placeholder={props.placeholder}
                pattern={props.pattern}
                maxLength={props.maxLength}
                onChange={e => handleChange(e.target.value)}
            />
        </>
    );
}
