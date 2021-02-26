import React, { useCallback, useMemo, useState } from 'react'

import { BuildingAttributes } from '../../../models/building';
import { FieldRow } from '../field-row';
import { BaseDataEntryProps } from '../data-entry';
import NumericDataEntry from '../numeric-data-entry';
import { DataTitleCopyable } from '../data-title';
import { dataFields } from '../../../config/data-fields-config';
import SelectDataEntry from '../select-data-entry';
import MultiDataEntry from '../multi-data-entry/multi-data-entry';

const percentOverlapOption = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];

type PastBuilding = (BuildingAttributes['past_buildings'][number]);

export const DynamicsBuildingPane: React.FC<{}> = ({children}) => (
    <div style={{
        backgroundColor: '#f1f1f1',
        border: '1px solid #cccccc',
        padding: '10px',
        borderRadius: '5px',
        marginTop: '10px',
        marginBottom: '20px'
    }}>
        {children}
    </div>
);

interface DynamicsDataRowProps {
    value: WithId<PastBuilding>;
    onChange?: (value: WithId<PastBuilding>) => void;
    disabled?: boolean;
    maxYear?: number;
    minYear?: number;
    mode?: 'view' | 'edit' | 'multi-edit';
    validateForm?: boolean;
}
const DynamicsDataRow: React.FC<DynamicsDataRowProps> = ({
    value = {} as WithId<PastBuilding>,
    onChange,
    disabled = false,
    maxYear,
    minYear,
    mode,
    validateForm = false,
    children
}) => {

    const onFieldChange = useCallback((key: string, val: any) => {
        const changedValue = {...value};
        changedValue[key] = val;
        onChange(changedValue);
    }, [value, onChange]);

    return (
        <DynamicsBuildingPane>
            <FieldRow>
                <NumericDataEntry
                    slug='year_constructed'
                    title={dataFields.past_buildings.items.year_constructed.title}
                    onChange={onFieldChange}
                    value={value.year_constructed}
                    disabled={disabled}
                    max={value.year_demolished ?? maxYear}
                    min={minYear}
                /> 
                <NumericDataEntry
                    slug='year_demolished'
                    title={dataFields.past_buildings.items.year_demolished.title}
                    onChange={onFieldChange}
                    value={value.year_demolished}
                    disabled={disabled}
                    max={maxYear}
                    min={value.year_constructed ?? minYear}

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
            {children}
        </DynamicsBuildingPane>
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

// function isValid(val: PastBuilding) {
//     if(val == undefined) return false;
//     if(typeof val.year_constructed !== 'number') return false;
//     if(typeof val.year_demolished !== '')
// }

export const DynamicsDataEntry: React.FC<DynamicsDataEntryProps> = (props) => {
    const [newValue, setNewValue] = useState<WithId<PastBuilding>>();

    const values: PastBuilding[] = props.value ?? [];
    const isEditing = props.mode === 'edit';
    const isDisabled = !isEditing || props.disabled;

    const valuesWithIds = useMemo(() => withIds(values), [values]);

    const valuesSorted = useMemo(
        () => valuesWithIds.sort((a, b) => b.year_constructed - a.year_constructed),
        [valuesWithIds]
    );

    const addNew = useCallback(() => {
        const newValues = [...values.map(x => x), newValue];

        setNewValue(undefined);
        props.onChange(props.slug, newValues);
    }, [values, newValue]);
    
    const edit = useCallback((id: number, val: WithId<PastBuilding>) => {
        const editedValues = [...values];
        const buildingIndexForId = valuesWithIds.findIndex(x => x._id === id);
        editedValues.splice(buildingIndexForId, 1, dropId(val));

        props.onChange(props.slug, editedValues);
    }, [values, valuesWithIds, valuesSorted]);

    const remove = useCallback((id: number) => {
        const editedValues = [...values];
        const buildingIndexForId = valuesWithIds.findIndex(x => x._id === id);
        editedValues.splice(buildingIndexForId, 1);

        props.onChange(props.slug, editedValues);
    }, [values, valuesWithIds]);

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
                        valuesSorted.map(pastBuilding => (
                            <li key={pastBuilding._id }>
                                <DynamicsDataRow
                                    value={pastBuilding}
                                    disabled={!props.editableEntries || isDisabled}
                                    onChange={(value) => edit(pastBuilding._id, value)}
                                    minYear={props.minYear}
                                    maxYear={props.maxYear}
                                    mode={props.mode}
                                >
                                    {
                                        !isDisabled &&
                                        <button type="button" onClick={() => remove(pastBuilding._id)}
                                            title="Remove"
                                            data-index={pastBuilding._id} className="btn btn-outline-danger btn-block">Delete Record</button>
                                    }
                                </DynamicsDataRow>
                            </li>
                        ))
                    }
                </ul>
                {
                    !isDisabled &&
                    <div>
                        <h6 className="h6">Add a new historical record</h6>
                        <DynamicsDataRow
                            value={newValue}
                            onChange={setNewValue}
                            disabled={isDisabled}
                            minYear={props.minYear}
                            maxYear={props.maxYear}
                            mode={props.mode}
                        >
                            <button type="button"
                                className="btn btn-outline-dark btn-block"
                                title="Add to list"
                                onClick={() => addNew()}
                                disabled={newValue == undefined}
                            >Add record</button>
                        </DynamicsDataRow>
                    </div>
                }
            </div>
        </>
    );
};
