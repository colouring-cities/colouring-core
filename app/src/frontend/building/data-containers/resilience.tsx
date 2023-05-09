import React, { useState } from 'react';
import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';
import Verification from '../data-components/verification';
import { CategoryViewProps } from './category-view-props';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

/**
* Dynamics view/edit section
*/
const ResilienceView: React.FunctionComponent<CategoryViewProps> = (props) => {
    
    const { historicData, historicDataSwitchOnClick, darkLightTheme } = useDisplayPreferences();
    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);

    return (<>
        <DataEntryGroup name="Building Damage Assessment Tool" collapsed={true} >
            <InfoBox>
            This feature is designed as an assessment tool to help communities capture data on the state of buildings following major disasters. 
            It is intended to help support emergency services, to record damage, and to aid reconstruction programmes.
            </InfoBox>
            <button className={`map-switcher-inline ${historicData}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={historicDataSwitchOnClick}> 
                {(historicData === 'enabled')?'Click here to hide disaster maps':'Click here to show disaster maps'}
            </button>
            <p>Date of Disaster</p>
            <div>
                <DatePicker 
                    showIcon
                    dateFormat="dd/MM/yyyy"
                    slug="disaster_start_date"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)} 
                    title={dataFields.disaster_start_date.title}
                    //value={props.building.disaster_start_date}
                    isClearable
                    placeholderText="Select Start Date"
                    maxDate={new Date()}
                />
            </div>
            <div>
                <DatePicker 
                    showIcon
                    dateFormat="dd/MM/yyyy"
                    slug="disaster_end_date"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)} 
                    title={dataFields.disaster_end_date.title}
                    //value={props.building.disaster_end_date}
                    isClearable
                    placeholderText="Select End Date"
                    maxDate={new Date()}
                />
            </div>
            <SelectDataEntry
                slug='disaster_type'
                title={dataFields.disaster_type.title}
                value={props.building.disaster_type}
                options={[
                    'Flood',
                    'Earthquake',
                    'Hurricane',
                    'Fire',
                    'Extreme heat',
                    'Political/war damage',
                    'Other human (blast damage/spills etc.)',
                    'Other'
                ]}

                onChange={props.onChange}
                mode={props.mode}
                copy={props.copy}
            />
            <SelectDataEntry
                slug='disaster_severity'
                title={dataFields.disaster_severity.title}
                value={props.building.disaster_severity}
                options={[
                    'Building destroyed',
                    'Very severe',
                    'Severe',
                    'Moderate',
                    'Minimal',
                    'No damage visible',
                ]}

                onChange={props.onChange}
                mode={props.mode}
                copy={props.copy}
            />
            <Verification
                slug="disaster_severity"
                allow_verify={props.user !== undefined && props.building.disaster_severity !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("disaster_severity")}
                user_verified_as={props.user_verified.disaster_severity}
                verified_count={props.building.verified.disaster_severity}
            />
            <SelectDataEntry
                slug='disaster_assessment_method'
                title={dataFields.disaster_assessment_method.title}
                value={props.building.disaster_assessment_method}
                options={[
                    'Citizen/Passerby by eye',
                    'Government assessor',
                    'Specialist emergency group/charity',
                    'Other',
                ]}

                onChange={props.onChange}
                mode={props.mode}
                copy={props.copy}
            />
            <Verification
                slug="disaster_assessment_method"
                allow_verify={props.user !== undefined && props.building.disaster_assessment_method !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("disaster_assessment_method")}
                user_verified_as={props.user_verified.disaster_assessment_method}
                verified_count={props.building.verified.disaster_assessment_method}
            />
            <MultiDataEntry
              title={dataFields.disaster_source_link.title}
              slug="disaster_source_link"
              value={props.building.disaster_source_link}
              mode={props.mode}
              copy={props.copy}
              onChange={props.onChange}
              tooltip={dataFields.disaster_source_link.tooltip}
              placeholder="https://..."
              editableEntries={true}
              isUrl={true}
            />
        </DataEntryGroup>
        <DataEntryGroup name="Resilience indicators and risk assessment" collapsed={true} >
            <InfoBox>
                This section is under development.
            </InfoBox>
            <DataEntry
                title="Building age"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Typical typology lifespan"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Typology adaptability rating"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Physical adaptability rating - within plot"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Landuse adaptability rating"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Structural material lifespan rating"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Protection from demolition rating"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Flood risk rating"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Surface geology type"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Average community value rating for typology"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Other rating"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Total resilience rating"
                slug=""
                value=""
                mode='view'
            />
        </DataEntryGroup>
    </>)
};

const ResilienceContainer = withCopyEdit(ResilienceView);

export default ResilienceContainer;
