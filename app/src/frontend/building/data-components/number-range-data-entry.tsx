import React, { useCallback, useState } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';
import { FieldRow } from './field-row';
import './number-range-data-entry.css';

interface NumberRangeDataEntryProps extends BaseDataEntryProps {
    value?: {
        min: number;
        max: number;
    };
    placeholderMin?: string;
    placeholderMax?: string;
    titleMin?: string;
    titleMax?: string;
    step?: number;
    min?: number;
    max?: number;
}

export const NumberRangeDataEntry: React.FC<NumberRangeDataEntryProps> = (props) => {
    const {min: minValue, max: maxValue} = props.value ?? {};
    const [minEdited, setMinEdited] = useState(minValue != undefined);
    const [maxEdited, setMaxEdited] = useState(maxValue != undefined);

    const isDisabled = props.mode === 'view' || props.disabled;

    const slugWithModifier = props.slug + (props.slugModifier ?? '');

    return (
        <div>
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
                    className="form-control min-number-input"
                    type="number"
                    id={slugWithModifier}
                    name={slugWithModifier}
                    value={minValue ?? ''}
                    step={props.step ?? 1}
                    max={(maxEdited ? maxValue : null) ?? props.max}
                    min={props.min}
                    disabled={isDisabled}
                    placeholder={props.placeholderMin}
                    title={props.titleMin}
                    required={props.required}
                    onChange={e => {
                        const val = e.target.value === '' ? null : parseFloat(e.target.value);
                        setMinEdited(val != undefined);
                        props.onChange(
                            props.slug,
                            {
                                min: val,
                                max: maxEdited ? maxValue : val
                            }
                        );
                    }
                    }
                />
                <input
                    className="form-control max-number-input"
                    type="number"
                    id={`${props.slug}-max`}
                    name={`${props.slug}-max`}
                    value={maxValue ?? ''}
                    step={props.step ?? 1}
                    max={props.max}
                    min={(minEdited ? minValue : null) ?? props.min}
                    disabled={isDisabled}
                    placeholder={props.placeholderMax}
                    title={props.titleMax}
                    required={props.required}
                    onChange={e => {
                        const val = e.target.value === '' ? null : parseFloat(e.target.value);
                        setMaxEdited(val != undefined);
                        props.onChange(
                            props.slug,
                            {
                                min: minEdited ? minValue : val,
                                max: val
                            }
                        );
                    }
                    }
                />
            </FieldRow>
        </div>
    );
};