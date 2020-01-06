import React, { useState } from 'react';

import { AutofillDropdown } from './autofill/autofillDropdown';

export interface TextDataEntryInputProps {
    slug: string;
    name?: string;
    onChange?: (key: string, val: any) => void;

    maxLength?: number;
    disabled?: boolean;
    placeholder?: string;
    valueTransform?: (val: string) => string;
    autofill?: boolean;
}

export const DataEntryInput: React.FC<TextDataEntryInputProps & {value?: string}> = props => {
    const [isEditing, setEditing] = useState(false);

    const handleChange = (value: string) => {
        console.log(value);
        const transform = props.valueTransform || (x => x);
        const transformedValue = value === '' ?
                        null :
                        transform(value);
        props.onChange(props.slug, transformedValue);
    };

    return (
        <div
            onFocus={e => setEditing(true)}
            onBlur={e => setEditing(false)}
        >
            <input className="form-control" type="text"
                name={props.slug}
                value={props.value || ''}
                maxLength={props.maxLength}
                disabled={props.disabled}
                placeholder={props.placeholder}
                onChange={e => handleChange(e.target.value)}
            />
            {
                props.autofill &&
                <AutofillDropdown
                    editing={isEditing}
                    onSelect={value => handleChange(value)}
                    onClose={() => setEditing(false)}
                    fieldName={props.slug}
                    fieldValue={props.value}
                />
            }
        </div>
    );
};
