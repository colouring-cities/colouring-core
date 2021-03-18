import React, { useState } from 'react';

import { AutofillDropdown } from './autofill-dropdown/autofill-dropdown';

export interface TextDataEntryInputProps {
    slug: string;
    name?: string;
    id?: string;
    onChange?: (key: string, val: any) => void;
    onConfirm?: (key: string, val: any) => void;

    maxLength?: number;
    disabled?: boolean;
    placeholder?: string;
    isUrl?: boolean;
    required?: boolean;
    valueTransform?: (val: string) => string;
    confirmOnEnter?: boolean;

    autofill?: boolean;
    showAllOptionsOnEmpty?: boolean;
    confirmOnAutofillSelect?: boolean;
}

export const DataEntryInput: React.FC<TextDataEntryInputProps & {value?: string}> = props => {
    const [isEditing, setEditing] = useState(false);
    const nameAttr = props.name || props.slug;
    const idAttr = props.id || props.slug;

    const transformValue = (value: string) => {
        const transform = props.valueTransform || (x => x);
        const transformedValue = value === '' ?
                        null :
                        transform(value);
        return transformedValue;
    };

    const handleChange = (value: string) => {
        props.onChange?.(props.slug, transformValue(value));
    };
    
    const handleConfirm = () => {
        props.onConfirm?.(props.slug, props.value);
    };

    const handleAutofillSelect = (value: string) => {
        const transformedValue = transformValue(value);
        if(props.confirmOnAutofillSelect) {
            props.onConfirm?.(props.slug, transformedValue);
        } else {
            props.onChange?.(props.slug, transformedValue);
        }
    };

    return (
        <>
            <input className="form-control" type={props.isUrl? "url" : "text"}
                id={idAttr}
                name={nameAttr}
                value={props.value || ''}
                maxLength={props.maxLength}
                required={props.required}
                disabled={props.disabled}
                placeholder={props.placeholder}
                onKeyDown={e => {
                    if(e.keyCode === 13) {
                        if(props.confirmOnEnter) {
                            handleConfirm();
                        }
                    }
                }}
                onChange={e => handleChange(e.target.value)}
                onInput={e => setEditing(true)}
                onFocus={e => setEditing(true)}
                onBlur={e => setEditing(false)}
            />
            {
                props.autofill &&
                <AutofillDropdown
                    editing={isEditing}
                    onSelect={handleAutofillSelect}
                    onClose={() => setEditing(false)}
                    fieldName={props.slug}
                    fieldValue={props.value}
                    showAllOptionsOnEmpty={props.showAllOptionsOnEmpty}
                />
            }
        </>
    );
};
