import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DataPickerDataEntryProps extends BaseDataEntryProps {
    value: string;
    placeholder?: string;
    maxLength?: number;
}

const DataPickerDataEntry: React.FunctionComponent<DataPickerDataEntryProps> = (props) => {

    let date = props.value == null ? null : new Date(props.value);

    return (
        <Fragment>
            <div className="row date-picker">
                <div className='column date-picker-label'>
                    <label>{props.title}</label>
                </div>
                <div className='column date-picker-dropdown'>
                    <DatePicker 
                        showIcon
                        dateFormat="dd/MM/yyyy"
                        slug={props.slug}
                        selected={date}
                        onChange={e => {
                            props.onChange(
                                props.slug,
                                e === null ?
                                    null :
                                    e
                            )
                        }
                        }
                        title={props.tooltip}
                        isClearable={!(props.mode === 'view' || props.disabled)}
                        placeholderText="Select a date"
                        maxDate={new Date()}
                        disabled={props.mode === 'view' || props.disabled}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default DataPickerDataEntry;
