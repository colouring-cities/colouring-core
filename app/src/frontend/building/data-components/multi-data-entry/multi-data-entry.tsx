import React, { useCallback, useMemo, useState } from 'react';

import './multi-data-entry.css';

import { BaseDataEntryProps } from '../data-entry';
import { DataEntryInput, TextDataEntryInputProps } from '../data-entry-input';
import { DataTitleCopyable } from '../data-title';

interface MultiDataEntryProps extends BaseDataEntryProps, TextDataEntryInputProps {
    value: string[];
    copyable?: boolean;
    editableEntries?: boolean;
    confirmOnEnter?: boolean;
}

export const MultiDataEntry: React.FC<MultiDataEntryProps> = ({
    editableEntries = false,
    copyable = false,
    confirmOnEnter = true,
    ...props
}) => {
    const [newValue, setNewValue] = useState<string>();

    const values = useMemo(() => props.value ?? [], [props.value]);

    const edit = useCallback((index: number, value: string) => {
        const editedValues = values.slice();
        editedValues.splice(index, 1, value);
        props.onChange(props.slug, editedValues);
    }, [values, props.onChange, props.slug]);

    /* accept a newValue parameter to handle cases where the value is set and submitted at the same time
     * (like with autofill select enabled) - but otherwise use the current newValue saved in state
     */
    const addNew = useCallback((newValueArg?: string) => {
        const val = newValueArg ?? newValue;
        if(val == undefined) return;

        const editedValues = values.slice().concat(val);

        setNewValue(null);
        props.onChange(props.slug, editedValues);
    }, [newValue, values, props.onChange, props.slug]);


    const remove = useCallback((index: number) => {
        const editedValues = values.slice();
        editedValues.splice(index, 1);

        props.onChange(props.slug, editedValues);
    }, [values, props.onChange, props.slug]);


    const isEditing = props.mode === 'edit';
    const isDisabled = !isEditing || props.disabled;
    const slugWithModifier = props.slug + (props.slugModifier ?? '');

    return (<>
        <DataTitleCopyable
            slug={props.slug}
            slugModifier={props.slugModifier}
            title={props.title}
            tooltip={props.tooltip}
            disabled={props.disabled || props.value == undefined || props.value.length === 0}
            copy={copyable ? props.copy : undefined}
        />
        <div id={`${props.slug}-wrapper`}>
            <ul className="data-link-list">
                {
                    values.length === 0 && !isEditing &&
                    <div className="input-group">
                        <input className="form-control no-entries" type="text" value="No entries" disabled={true} />
                    </div>
                }
                {
                    values.map((val, i) => (
                        <li className="input-group" key={i /* i as key prevents input component recreation on edit */}>
                            <DataEntryInput
                                slug={props.slug}
                                name={`${slugWithModifier}-${i}`}
                                id={`${slugWithModifier}-${i}`}
                                value={val}
                                disabled={!editableEntries || isDisabled}
                                onChange={(_key, val) => edit(i, val)}

                                maxLength={props.maxLength}
                                isUrl={props.isUrl}
                                valueTransform={props.valueTransform}

                                autofill={props.autofill}
                                showAllOptionsOnEmpty={props.showAllOptionsOnEmpty}
                            />
                            {
                                !isDisabled &&
                                <div className="input-group-append">
                                    <button type="button" onClick={() => remove(i)}
                                        title="Remove"
                                        data-index={i} className="btn btn-outline-dark">✕</button>
                                </div>
                            }
                        </li>
                    ))
                }
            </ul>
            {
                !isDisabled &&
                    <div className="input-group">
                        <DataEntryInput
                            slug={props.slug}
                            name={slugWithModifier}
                            id={slugWithModifier}
                            value={newValue}
                            disabled={props.disabled}
                            required={props.required && values.length < 1}
                            onChange={(_key, val) => setNewValue(val)}
                            onConfirm={(_key, val) => addNew(val)}

                            maxLength={props.maxLength}
                            placeholder={props.placeholder}
                            isUrl={props.isUrl}
                            valueTransform={props.valueTransform}
                            confirmOnEnter={confirmOnEnter}

                            autofill={props.autofill}
                            showAllOptionsOnEmpty={props.showAllOptionsOnEmpty}
                            confirmOnAutofillSelect={true}
                        />
                        <div className="input-group-append">
                            <button type="button"
                                className="btn btn-outline-dark"
                                title="Add to list"
                                onClick={() => addNew()}
                                disabled={newValue == undefined}
                            >+</button>
                        </div>
                    </div>
            }
        </div>
    </>)
};
