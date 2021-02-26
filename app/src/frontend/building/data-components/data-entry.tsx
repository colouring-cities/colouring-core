import React, { Fragment } from 'react';

import { CopyProps } from '../data-containers/category-view-props';

import { DataEntryInput, TextDataEntryInputProps } from './data-entry-input';
import { DataTitleCopyable } from './data-title';

interface BaseDataEntryProps {
    slug: string;
    title: string;
    tooltip?: string;
    disabled?: boolean;
    copy?: CopyProps; // CopyProps clashes with propTypes
    mode?: 'view' | 'edit' | 'multi-edit';
    isUrl?: boolean;
    required?: boolean;
    onChange?: (key: string, value: any) => void;
}

interface DataEntryProps extends BaseDataEntryProps, TextDataEntryInputProps {
    value?: string;
}

const DataEntry: React.FC<DataEntryProps> = (props) => {
    return (
        <div>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined || props.value == ''}
                copy={props.copy}
            />
            <DataEntryInput
                slug={props.slug}
                value={props.value}
                onChange={props.onChange}
                disabled={props.mode === 'view' || props.disabled}

                maxLength={props.maxLength}
                placeholder={props.placeholder}
                isUrl={props.isUrl}
                required={props.required}
                valueTransform={props.valueTransform}
            />
        </div>
    );
};

export default DataEntry;
export {
    BaseDataEntryProps
};
