import React, { useCallback, useState } from 'react'
import _ from 'lodash';

import { BuildingAttributes } from '../../../models/building';
import { FieldRow } from '../../data-components/field-row';
import DataEntry, { BaseDataEntryProps } from '../../data-components/data-entry';
import { dataFields } from '../../../config/data-fields-config';
import SelectDataEntry from '../../data-components/select-data-entry';
import { MultiDataEntry } from '../../data-components/multi-data-entry/multi-data-entry';
import { NumberRangeDataEntry } from './number-range-data-entry';

import './dynamics-data-entry.css';
import { CloseIcon } from '../../../components/icons';
import DataTitle, { DataTitleCopyable } from '../../data-components/data-title';

type DemolishedBuilding = (BuildingAttributes['demolished_buildings'][number]);

export const DynamicsBuildingPane: React.FC<{className?: string}> = ({children, className}) => (
    <div className={`dynamics-building-pane ${className ?? ''}`} >
        {children}
    </div>
);

function lifespan(a: number, b: number): number {
    if(a == undefined || b == undefined) return undefined;

    const diff = a - b;

    return Math.max(diff, 0);
}

function formatRange(minSpan: number, maxSpan: number): string {
    if(minSpan == undefined || maxSpan == undefined) return '';

    if(minSpan === maxSpan) return minSpan + '';

    return `${minSpan}-${maxSpan}`;
}

interface DynamicsDataRowProps {
    value: DemolishedBuilding;
    onChange?: (value: DemolishedBuilding) => void;
    disabled?: boolean;
    maxYear?: number;
    minYear?: number;
    mode?: 'view' | 'edit' | 'multi-edit';
    required?: boolean;
    validateForm?: boolean;
    index?: number;
}
const DynamicsDataRow: React.FC<DynamicsDataRowProps> = ({
    value = {} as DemolishedBuilding,
    onChange,
    disabled = false,
    maxYear,
    minYear,
    mode,
    required = false,
    validateForm = false,
    index
}) => {

    const onFieldChange = useCallback((key: string, val: any) => {
        const changedValue = {...value};
        changedValue[key] = val;
        onChange(changedValue);
    }, [value, onChange]);

    const maxLifespan = lifespan(value.year_demolished?.max, value.year_constructed?.min);
    const minLifespan = lifespan(value.year_demolished?.min, value.year_constructed?.max);

    return (
        <>
            <FieldRow>
                <div>
                    <NumberRangeDataEntry
                        slug='year_constructed'
                        slugModifier={index}
                        title={dataFields.demolished_buildings.items.year_constructed.title}
                        onChange={onFieldChange}
                        value={value.year_constructed}
                        disabled={disabled}
                        max={value.year_demolished?.min ?? maxYear}
                        min={minYear}
                        placeholderMin='Earliest'
                        placeholderMax='Latest'
                        titleMin={`${dataFields.demolished_buildings.items.year_constructed.title}: earliest estimate`}
                        titleMax={`${dataFields.demolished_buildings.items.year_constructed.title}: latest estimate`}
                        required={required}
                    />
                </div>
                <div>
                    <NumberRangeDataEntry
                        slug='year_demolished'
                        slugModifier={index}
                        title={dataFields.demolished_buildings.items.year_demolished.title}
                        onChange={onFieldChange}
                        value={value.year_demolished}
                        disabled={disabled}
                        max={maxYear}
                        min={value.year_constructed?.max ?? minYear}
                        placeholderMin='Earliest'
                        placeholderMax='Latest'
                        titleMin={`${dataFields.demolished_buildings.items.year_demolished.title}: earliest estimate`}
                        titleMax={`${dataFields.demolished_buildings.items.year_demolished.title}: latest estimate`}
                        required={required}
                    />
                </div>
                <div className='lifespan-entry'>
                    <DataEntry
                        slug='lifespan'
                        slugModifier={index}
                        title={dataFields.demolished_buildings.items.lifespan.title}
                        value={formatRange(minLifespan, maxLifespan)}
                        disabled={true}
                    />
                </div>
            </FieldRow>
            <SelectDataEntry
                slug='overlap_present'
                slugModifier={index}
                title={dataFields.demolished_buildings.items.overlap_present.title}
                onChange={onFieldChange}
                value={value.overlap_present}
                options={[
                    {value: '1%', label: '1% - almost no overlap with current site'},
                    '25%',
                    '50%',
                    '75%',
                    {value: '100%', label: '100% - fully contained in current site'}
                ]}
                disabled={disabled}
                required={required}
            />
            <MultiDataEntry
                slug='links'
                slugModifier={index}
                title={dataFields.demolished_buildings.items.links.title}
                onChange={onFieldChange}
                value={value.links}
                disabled={disabled}
                editableEntries={true}
                mode={mode}
                required={required}
            />
        </>
    )
};

interface DynamicsDataEntryProps extends BaseDataEntryProps {
    title: string;
    value: DemolishedBuilding[];
    editableEntries: boolean;
    maxYear: number;
    minYear: number;
    onSaveAdd: (slug: string, newItem: any) => void;
    hasEdits: boolean;
}

function isValid(val: DemolishedBuilding) {
    if(val == undefined) return false;

    if(typeof val.year_constructed?.min !== 'number') return false;
    if(typeof val.year_constructed?.max !== 'number') return false;

    if(typeof val.year_demolished?.min !== 'number') return false;
    if(typeof val.year_demolished?.max !== 'number') return false;

    if(val.overlap_present == undefined) return false;

    if(val.links == undefined || val.links.length < 1) return false;

    return true;
}

export const DynamicsDataEntry: React.FC<DynamicsDataEntryProps> = (props) => {
    const [newValue, setNewValue] = useState<DemolishedBuilding>();

    const values: DemolishedBuilding[] = props.value ?? [];
    const isEditing = props.mode === 'edit';
    const isDisabled = !isEditing || props.disabled;
    
    const isEdited = !_.isEmpty(newValue);
    const valid = isValid(newValue);

    const addNew = useCallback(() => {
        const val = {...newValue};

        setNewValue(undefined);
        props.onSaveAdd(props.slug, val);
    }, [values, newValue]);
    
    const edit = useCallback((id: number, val: DemolishedBuilding) => {
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
            <div>
                {
                    isEditing ?
                        <>
                            <h6 className="h6">Existing records for demolished buildings</h6>
                            <label>Please supply sources for any edits of existing records</label>
                        </> :

                        <DataTitleCopyable slug={props.slug} title={props.title} tooltip={null}/>
                }
                <ul className="data-entry-list">
                    {
                        values.length === 0 &&
                        <div className="input-group">
                            <input className="form-control no-entries" type="text" value="No records so far" disabled={true} />
                        </div>
                    }
                    {
                        values.map((pastBuilding, id) => (
                            <li key={id}>
                                <DynamicsBuildingPane>
                                    <label>Demolished building</label>
                                    {
                                        !isDisabled &&
                                            <button type="button" className="btn btn-outline-dark delete-record-button"
                                                title="Delete Record"
                                                onClick={() => remove(id)}
                                                data-index={id}
                                            ><CloseIcon /></button>
                                    }
                                    <DynamicsDataRow
                                        value={pastBuilding}
                                        disabled={!props.editableEntries || isDisabled}
                                        onChange={(value) => edit(id, value)}
                                        minYear={props.minYear}
                                        maxYear={props.maxYear}
                                        mode={props.mode}
                                        required={true}
                                        index={id}
                                    />
                                </DynamicsBuildingPane>
                            </li>
                        ))
                    }
                </ul>
                {
                    !isDisabled &&
                    <div className='new-record-section'>
                        <h6 className="h6">Add a new demolished building record</h6>
                        <DynamicsBuildingPane className='new-record'>
                            <DynamicsDataRow
                                value={newValue}
                                onChange={setNewValue}
                                disabled={isDisabled}
                                minYear={props.minYear}
                                maxYear={props.maxYear}
                                mode={props.mode}
                            />
                            <label>Please save all your edits before navigating away from the currently selected building - these will be erased otherwise.</label>
                            <button type="button"
                                className="btn btn-primary btn-block add-record-button"
                                title="Add to list"
                                onClick={addNew}
                                disabled={!valid || props.hasEdits}
                            >
                                {
                                    props.hasEdits ?
                                        'Save or discard edits first to add a new record' :
                                        (isEdited && !valid) ?
                                            'Fill in all fields to save record' :
                                            'Save new record'
                                }
                            </button>
                        </DynamicsBuildingPane>
                    </div>
                }
            </div>
        </>
    );
};
