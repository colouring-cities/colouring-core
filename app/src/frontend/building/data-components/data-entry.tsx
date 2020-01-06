import React, { Fragment } from 'react';

import { CopyProps } from '../data-containers/category-view-props';

import { TextDataEntryInput, TextDataEntryInputProps } from './data-entry-input';
import { DataTitleCopyable } from './data-title';

interface BaseDataEntryProps {
    slug: string;
    title: string;
    tooltip?: string;
    disabled?: boolean;
    copy?: CopyProps; // CopyProps clashes with propTypes
    mode?: 'view' | 'edit' | 'multi-edit';
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
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined || props.value == ''}
                copy={props.copy}
            />
            <TextDataEntryInput
                slug={props.slug}
                value={props.value}
                onChange={props.onChange}
                disabled={props.mode === 'view' || props.disabled}
                
                maxLength={props.maxLength}
                placeholder={props.placeholder}
                valueTransform={props.valueTransform}
            />
        </Fragment>
    );
};

export default DataEntry;
export {
    BaseDataEntryProps
};
