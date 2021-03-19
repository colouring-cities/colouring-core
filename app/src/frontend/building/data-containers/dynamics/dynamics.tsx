import React from 'react';
import { Link } from 'react-router-dom';
import InfoBox from '../../../components/info-box';

import { Category } from '../../../config/categories-config';
import { dataFields } from '../../../config/data-fields-config';

import DataEntry from '../../data-components/data-entry';
import { DataEntryGroup } from '../../data-components/data-entry-group';
import { DynamicsBuildingPane, DynamicsDataEntry } from './dynamics-data-entry';
import { FieldRow } from '../../data-components/field-row';
import NumericDataEntry from '../../data-components/numeric-data-entry';
import withCopyEdit from '../../data-container';

import { CategoryViewProps } from '../category-view-props';
import { LogicalDataEntry } from '../../data-components/logical-data-entry/logical-data-entry';

/**
* Dynamics view/edit section
*/
const DynamicsView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const building = props.building;
    const thisYear = (new Date()).getFullYear();
    const currentBuildingConstructionYear = building.date_year || undefined;

    const ageLinkUrl = `/${props.mode}/${Category.Age}/${props.building.building_id}`;

    return (<>
        <DataEntryGroup collapsed={false} name="Constructions and demolitions on this site" showCount={false}>
            <DynamicsBuildingPane>
                <label>Current building (age data <Link to={ageLinkUrl}>editable here</Link>)</label>
                <FieldRow>
                    <div>
                        <NumericDataEntry
                            slug=''
                            title={dataFields.demolished_buildings.items.year_constructed.title}
                            value={currentBuildingConstructionYear}
                            disabled={true}
                            mode='view'
                        />
                    </div>
                    <div>
                        <NumericDataEntry
                            slug=''
                            title={dataFields.demolished_buildings.items.year_demolished.title}
                            value={undefined}
                            placeholder='---'
                            disabled={true}
                            mode='view'
                        />
                    </div>
                    <div style={{flex: '0 1 27%'}}>
                        <DataEntry
                            slug=''
                            title='Lifespan to date'
                            value={ (thisYear - currentBuildingConstructionYear) + ''}
                            disabled={true}
                            mode='view'
                        />
                    </div>
                </FieldRow>
            </DynamicsBuildingPane>
            {
                currentBuildingConstructionYear == undefined ?
                    <InfoBox>To add historical records, fill in the <Link to={ageLinkUrl}>Age</Link> data first.</InfoBox> :
                    
                    <>
                        <LogicalDataEntry
                            slug='dynamics_has_demolished_buildings'
                            title={dataFields.dynamics_has_demolished_buildings.title}
                            value={building.dynamics_has_demolished_buildings}
                            disallowFalse={(building.demolished_buildings?.length ?? 0) > 0}
                            disallowNull={(building.demolished_buildings?.length ?? 0) > 0}

                            onChange={props.onSaveChange}
                            mode={props.mode}
                            copy={props.copy}
                        />
                        {
                            building.dynamics_has_demolished_buildings &&
                            <>
                                <DynamicsDataEntry
                                    
                                    /* 
                                        Will clear the edits and new record data upon navigating to another building.
                                        Should get a better way to do this, plus a way to actually keep unsaved edits.
                                    */
                                    key={building.building_id} 
                                    
                                    value={building.demolished_buildings}
                                    editableEntries={true}
                                    slug='demolished_buildings'
                                    title={dataFields.demolished_buildings.title}
                                    mode={props.mode}
                                    onChange={props.onChange}
                                    onSaveAdd={props.onSaveAdd}
                                    hasEdits={props.edited}
                                    maxYear={currentBuildingConstructionYear}
                                    minYear={50}
                                />
                                {
                                    props.mode === 'view' &&
                                        <InfoBox>Switch to edit mode to add/edit past building records</InfoBox>
                                }
                            </>
                        }
                    </>
            }
        </DataEntryGroup>

        <DataEntryGroup name="Future planned data collection" collapsed={false} showCount={false}>
            <DataEntry
                title="Historical land use change"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Longitudinal historical footprints (raster) link"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Longitudinal historical footprints (vector) link"
                slug=""
                value=""
                mode='view'
            />
        </DataEntryGroup>
        <InfoBox>
            This section is under development in collaboration with the historic environment sector.
            Please let us know your suggestions on the <a href="https://discuss.colouring.london/t/dynamics-category-discussion/107">discussion forum</a>! (external link - save your edits first)
        </InfoBox>
    </>)
};

const DynamicsContainer = withCopyEdit(DynamicsView);

export default DynamicsContainer;
