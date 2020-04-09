import React, { Fragment } from 'react';

import { CopyProps } from '../data-containers/category-view-props';

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

interface DataEntryProps extends BaseDataEntryProps {
    value?: string;
    maxLength?: number;
    placeholder?: string;
    valueTransform?: (string) => string;
}

const DataEntry: React.FunctionComponent<DataEntryProps> = (props) => {
    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined || props.value == ''}
                copy={props.copy}
            />
            <input className="form-control" type="text"
                id={props.slug}
                name={props.slug}
                value={props.value || ''}
                maxLength={props.maxLength}
                disabled={props.mode === 'view' || props.disabled}
                placeholder={props.placeholder}
                onChange={e => {
                    const transform = props.valueTransform || (x => x);
                    const val = e.target.value === '' ?
                                    null :
                                    transform(e.target.value);
                    props.onChange(props.slug, val);
                }}
            />
        </Fragment>
    );
};

export default DataEntry;
export {
    BaseDataEntryProps
};
