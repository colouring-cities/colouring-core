import React, { useCallback, useMemo, useState } from 'react'

import { BuildingAttributes } from '../../../models/building';
import { FieldRow } from '../field-row';
import { BaseDataEntryProps } from '../data-entry';
import NumericDataEntry from '../numeric-data-entry';
import { DataTitleCopyable } from '../data-title';
import { dataFields } from '../../../config/data-fields-config';
import SelectDataEntry from '../select-data-entry';
import MultiDataEntry from '../multi-data-entry/multi-data-entry';

import './dynamics-data-entry.css';

const percentOverlapOption = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];

type PastBuilding = (BuildingAttributes['past_buildings'][number]);

export const DynamicsBuildingPane: React.FC<{className?: string}> = ({children, className}) => (
    <div className={`dynamics-building-pane ${className ?? ''}`} >
        {children}
    </div>
);

interface DynamicsDataRowProps {
    value: PastBuilding;
    onChange?: (value: PastBuilding) => void;
    disabled?: boolean;
    maxYear?: number;
    minYear?: number;
    mode?: 'view' | 'edit' | 'multi-edit';
    required?: boolean;
    validateForm?: boolean;
}
const DynamicsDataRow: React.FC<DynamicsDataRowProps> = ({
    value = {} as PastBuilding,
    onChange,
    disabled = false,
    maxYear,
    minYear,
    mode,
    required = false,
    validateForm = false,
}) => {

    const onFieldChange = useCallback((key: string, val: any) => {
        const changedValue = {...value};
        changedValue[key] = val;
        onChange(changedValue);
    }, [value, onChange]);

    return (
        <>
            <FieldRow>
                <NumericDataEntry
                    slug='year_constructed'
                    title={dataFields.past_buildings.items.year_constructed.title}
                    onChange={onFieldChange}
                    value={value.year_constructed}
                    disabled={disabled}
                    max={value.year_demolished ?? maxYear}
                    min={minYear}
                    required={required}
                />
                <NumericDataEntry
                    slug='year_demolished'
                    title={dataFields.past_buildings.items.year_demolished.title}
                    onChange={onFieldChange}
                    value={value.year_demolished}
                    disabled={disabled}
                    max={maxYear}
                    min={value.year_constructed ?? minYear}
                    required={required}
                />
                <NumericDataEntry
                    slug=''
                    title={dataFields.past_buildings.items.lifespan.title}
                    value={(value.year_demolished - value.year_constructed) || undefined}
                    disabled={true}
                />
            </FieldRow>
            <SelectDataEntry
                slug='overlap_present'
                title={dataFields.past_buildings.items.overlap_present.title}
                onChange={onFieldChange}
                value={value.overlap_present}
                options={percentOverlapOption}
                disabled={disabled}
                required={required}
            />
            <MultiDataEntry
                slug='links'
                title={dataFields.past_buildings.items.links.title}
                onChange={onFieldChange}
                value={value.links}
                disabled={disabled}
                editableEntries={true}
                mode={mode}
                isUrl={true}
            />
        </>
    )
};

interface DynamicsDataEntryProps extends BaseDataEntryProps {
    value: PastBuilding[];
    editableEntries: boolean;
    maxYear: number;
    minYear: number;
}

type WithId<T> = T & { _id: number };

function withIds<T>(values: T[]) : WithId<T>[] {
    return values.map((x, i) => ({...x, ...{_id: i * 3}}));
}

function dropId<T>(valueWithId: WithId<T>): T {
    const valueWithoutId = {...valueWithId};
    delete valueWithoutId._id;
    return valueWithoutId;
}

function isValid(val: PastBuilding) {
    if(val == undefined) return false;

    if(typeof val.year_constructed !== 'number') return false;
    if(typeof val.year_demolished !== 'number') return false;

    if(val.overlap_present == undefined) return false;

    return true;
}

export const DynamicsDataEntry: React.FC<DynamicsDataEntryProps> = (props) => {
    const [newValue, setNewValue] = useState<PastBuilding>();

    const values: PastBuilding[] = props.value ?? [];
    const isEditing = props.mode === 'edit';
    const isDisabled = !isEditing || props.disabled;

    const addNew = useCallback(() => {
        const val = {...newValue};
        
        // fill in required array field if not present
        val.links = val.links ?? [];

        const newValues = [...values, val];

        setNewValue(undefined);
        props.onChange(props.slug, newValues);
    }, [values, newValue]);
    
    const edit = useCallback((id: number, val: PastBuilding) => {
        const editedValues = [...values];
        editedValues.splice(id, 1, val);

        props.onChange(props.slug, editedValues);
    }, [values]);

    const remove = useCallback((id: number) => {
        const editedValues = [...values];
        editedValues.splice(id, 1);

        props.onChange(props.slug, editedValues);
    }, [values]);

    return (
        <>
            {/* <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || values == undefined || values.length === 0}
                copy={props.copy}
            /> */}
            <div>
                <ul className="data-link-list">
                    {
                        values.length === 0 && !isEditing &&
                        <div className="input-group">
                            <input className="form-control no-entries" type="text" value="No past buildings" disabled={true} />
                        </div>
                    }
                    {
                        values.map((pastBuilding, id) => (
                            <li key={id}>
                                <DynamicsBuildingPane>
                                    <label>Past building</label>
                                    {
                                        !isDisabled &&
                                            <button type="button" className="btn btn-outline-dark delete-record-button"
                                                title="Delete Record"
                                                onClick={() => remove(id)}
                                                data-index={id}
                                            >x</button>
                                    }
                                    <DynamicsDataRow
                                        value={pastBuilding}
                                        disabled={!props.editableEntries || isDisabled}
                                        onChange={(value) => edit(id, value)}
                                        minYear={props.minYear}
                                        maxYear={props.maxYear}
                                        mode={props.mode}
                                        required={true}
                                    />
                                </DynamicsBuildingPane>
                            </li>
                        ))
                    }
                </ul>
                {
                    !isDisabled &&
                    <div className='new-record-section'>
                        <h6 className="h6">Add a new historical record</h6>
                        <DynamicsBuildingPane className='new-record'>
                            <DynamicsDataRow
                                value={newValue}
                                onChange={setNewValue}
                                disabled={isDisabled}
                                minYear={props.minYear}
                                maxYear={props.maxYear}
                                mode={props.mode}
                            />
                            <button type="button"
                                className="btn btn-outline-dark btn-block add-record-button"
                                title="Add to list"
                                onClick={addNew}
                                disabled={!isValid(newValue)}
                            >Add record</button>
                        </DynamicsBuildingPane>
                    </div>
                }
            </div>
        </>
    );
};
