import React, { Fragment } from 'react';

import { CopyProps } from '../data-containers/category-view-props';

import { DataEntryInput, TextDataEntryInputProps } from './data-entry-input';
import { DataTitleCopyable } from './data-title';

interface BaseDataEntryProps {
    slug: string;
    slugModifier?: string | number; // string used with slug with array items (ensures the form labels link to the input for the correct item)
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
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                slugModifier={props.slugModifier}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined || props.value == ''}
                copy={props.copy}
            />
            <DataEntryInput
                slug={props.slug}
                name={props.slug + props.slugModifier ?? ''}
                value={props.value}
                onChange={props.onChange}
                disabled={props.mode === 'view' || props.disabled}

                maxLength={props.maxLength}
                placeholder={props.placeholder}
                isUrl={props.isUrl}
                required={props.required}
                valueTransform={props.valueTransform}
            />
        </Fragment>
    );
};

export default DataEntry;
export {
    BaseDataEntryProps
};
