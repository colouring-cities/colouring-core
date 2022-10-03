import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';
import './numeric-data-entry-with-formatted-link.css';
import { FieldRow } from './field-row';

interface NumericDataEntryWithFormattedLinkProps extends BaseDataEntryProps {
    value?: string;
    placeholder?: string;
    step?: number;
    min?: number;
    max?: number;
    linkTargetFunction: (val: string) => string;
    linkDescriptionFunction: (val: string) => string;
}

const NumericDataEntryWithFormattedLink: React.FunctionComponent<NumericDataEntryWithFormattedLinkProps> = (props) => {
    const slugWithModifier = props.slug + (props.slugModifier ?? '');

    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                slugModifier={props.slugModifier}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined}
                copy={props.copy}
            />
            <FieldRow>
                <input
                    className="form-control narrow-input-form"
                    type="number"
                    id={slugWithModifier}
                    name={slugWithModifier}
                    value={props.value == undefined ? '' : props.value}
                    step={props.step == undefined ? 1 : props.step}
                    max={props.max}
                    min={props.min}
                    disabled={props.mode === 'view' || props.disabled}
                    placeholder={props.placeholder}
                    required={props.required}
                    onChange={e =>
                        props.onChange(
                            props.slug,
                            e.target.value === '' ? null : parseFloat(e.target.value)
                        )
                    }
                />
                <div className="input-lookalike with-margin">
                    {props.value == undefined ? <div></div> : <a className="with-margin" href={props.linkTargetFunction(props.value)} target="_blank">{props.linkDescriptionFunction(props.value)}</a>}
                </div>
            </FieldRow>
        </Fragment>
    );
};

export default NumericDataEntryWithFormattedLink;
