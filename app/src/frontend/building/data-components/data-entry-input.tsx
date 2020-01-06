import React from 'react';

export interface TextDataEntryInputProps {
    slug: string;
    maxLength?: number;
    disabled?: boolean;
    placeholder?: string;
    valueTransform?: (val: string) => string;
    onChange?: (key: string, val: any) => void;
}

export const TextDataEntryInput: React.FC<TextDataEntryInputProps & {value?: string}> = props => {
    return (
        <input className="form-control" type="text"
            id={props.slug}
            name={props.slug}
            value={props.value || ''}
            maxLength={props.maxLength}
            disabled={props.disabled}
            placeholder={props.placeholder}
            onChange={e => {
                const transform = props.valueTransform || (x => x);
                const val = e.target.value === '' ?
                                null :
                                transform(e.target.value);
                props.onChange(props.slug, val);
            }}
        />
    );
};
