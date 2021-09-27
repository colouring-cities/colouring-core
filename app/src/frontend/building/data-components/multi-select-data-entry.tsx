import React, { ChangeEvent } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';

interface MultiSelectOption {
    key: string;
    label: string;
}

interface MultiSelectDataEntryProps extends BaseDataEntryProps {
    value: {[key: string]: boolean};
    options: (MultiSelectOption)[];
    showTitle?: boolean; // TODO make it an option for all input types
}

export const MultiSelectDataEntry: React.FunctionComponent<MultiSelectDataEntryProps> = (props) => {
    const slugWithModifier = props.slug + (props.slugModifier ?? '');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const changedKey = e.target.name;
        const checked = e.target.checked;

        const newVal = {...props.value, [changedKey]: checked || null};

        props.onChange(slugWithModifier, newVal);
    }

    return (
        <>
        {props.showTitle !== false &&
            <DataTitleCopyable
                slug={props.slug}
                slugModifier={props.slugModifier}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined}
                copy={props.copy}
            />
        }
            {
                props.options.map(o => (
                    <label>
                        <input
                            type="checkbox"
                            disabled={props.mode === 'view' || props.disabled}
                            name={o.key}
                            checked={props.value && props.value[o.key]}
                            onChange={handleChange}
                        />
                        {o.label}
                    </label>
                ))
            }
        </>
    );
};
