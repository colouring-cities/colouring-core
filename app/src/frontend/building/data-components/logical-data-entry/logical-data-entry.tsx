import React from 'react';

import { BaseDataEntryProps } from '../data-entry';
import { DataTitleCopyable } from '../data-title';

interface ToggleButtonProps {
    value: string;
    checked: boolean;
    disabled: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checkedClassName: string;
    uncheckedClassName: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
    value,
    checked,
    disabled,
    onChange,
    checkedClassName,
    uncheckedClassName,
    children
}) => {

    return (
        /**
         * If the toggle button is both checked and disabled, we can't set disabled CSS class
         * because then Bootstrap makes the button look like it wasn't checked.
         * So we skip the class and force cursor type manually so it doesn't look clickable.
         */ 
        <label className={`btn ${checked ? checkedClassName : uncheckedClassName} ${disabled && !checked && 'disabled'}`}
            {...disabled && checked && {
                style: { cursor: 'default'}
            }}
        >
            <input type="radio" name="options" value={value + ''}
                autoComplete="off"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            {children}
        </label>
    );
}

interface LogicalDataEntryProps extends BaseDataEntryProps {
    value: boolean;
    disallowTrue?: boolean;
    disallowFalse?: boolean;
    disallowNull?: boolean;
}

export const LogicalDataEntry: React.FC<LogicalDataEntryProps> = (props) => {
    function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.onChange?.(props.slug, e.target.value === 'null' ? null : e.target.value === 'true');
    }

    const isDisabled = props.mode === 'view' || props.disabled;

    return (
        <>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined}
                copy={props.copy}
            />
            <div className="btn-group btn-group-toggle">
                <ToggleButton
                    value="true"
                    checked={props.value === true}
                    disabled={isDisabled || props.disallowTrue}
                    checkedClassName='btn-outline-dark active'
                    uncheckedClassName='btn-outline-dark'
                    onChange={handleValueChange}
                >Yes</ToggleButton>

                <ToggleButton
                    value="null"
                    checked={props.value == null}
                    disabled={isDisabled || props.disallowNull}
                    checkedClassName='btn-secondary active'
                    uncheckedClassName='btn-outline-dark'
                    onChange={handleValueChange}
                >?</ToggleButton>

                <ToggleButton
                    value="false"
                    checked={props.value === false}
                    disabled={isDisabled || props.disallowFalse}
                    checkedClassName='btn-outline-dark active'
                    uncheckedClassName='btn-outline-dark'
                    onChange={handleValueChange}
                >No</ToggleButton>
            </div>
        </>
    );
};
