import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { DataTitleCopyable } from './data-title';

interface BaseDataEntryProps {
    slug: string;
    title: string;
    tooltip?: string;
    disabled?: boolean;
    copy: any; // CopyProps clashes with propTypes
    mode: 'view' | 'edit' | 'multi-edit';
    onChange: (key: string, value: any) => void;
}

interface DataEntryProps extends BaseDataEntryProps {
    value: string;
    maxLength?: number;
    placeholder?: string;
}

const DataEntry: React.FunctionComponent<DataEntryProps> = (props) => {
    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled}
                copy={props.copy}
            />
            <input className="form-control" type="text"
                id={props.slug}
                name={props.slug}
                value={props.value || ''}
                maxLength={props.maxLength}
                disabled={props.mode === 'view' || props.disabled}
                placeholder={props.placeholder}
                onChange={e =>
                    props.onChange(
                        props.slug,
                        e.target.value === '' ?
                            null :
                            e.target.value
                    )
                }
            />
        </Fragment>
    );
}

DataEntry.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    tooltip: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func,
    copy: PropTypes.shape({
        copying: PropTypes.bool,
        copyingKey: PropTypes.func,
        toggleCopyAttribute: PropTypes.func
    })
}

export default DataEntry;
export {
    BaseDataEntryProps
};
