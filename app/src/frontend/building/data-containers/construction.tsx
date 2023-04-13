import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';
import Verification from '../data-components/verification';

import { CategoryViewProps } from './category-view-props';
import Verification from '../data-components/verification';

const ConstructionMaterialsOptions = [
    'Wood',
    'Stone',
    'Brick',
    'Steel',
    'Reinforced Concrete',
    'Other Metal',
    'Other Natural Material',
    'Other Man-Made Material'
];

const RoofCoveringOptions = [
    'Slate',
    'Clay Tile',
    'Wood',
    'Asphalt',
    'Iron or Steel',
    'Other Metal',
    'Other Natural Material',
    'Other Man-Made Material'
];

/**
* Construction view/edit section
*/
const ConstructionView: React.FunctionComponent<CategoryViewProps> = (props) => {
    return (
         <Fragment>
             <SelectDataEntry
                title={dataFields.construction_core_material.title}
                slug="construction_core_material"
                value={props.building.construction_core_material}
                tooltip={dataFields.construction_core_material.tooltip}
                options={ConstructionMaterialsOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="construction_core_material"
                allow_verify={props.user !== undefined && props.building.construction_core_material !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("construction_core_material")}
                user_verified_as={props.user_verified.construction_core_material}
                verified_count={props.building.verified.construction_core_material}
                />
            <MultiDataEntry
                title={dataFields.construction_secondary_materials.title}
                slug="construction_secondary_materials"
                value={props.building.construction_secondary_materials}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                confirmOnEnter={true}
                tooltip={dataFields.construction_secondary_materials.tooltip}
                placeholder="Type new land use group here"
                copyable={true}
                autofill={true}
                showAllOptionsOnEmpty={true}
            />
            <Verification
                slug="construction_secondary_materials"
                allow_verify={props.user !== undefined && props.building.construction_secondary_materials !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("construction_secondary_materials")}
                user_verified_as={props.user_verified.construction_secondary_materials && props.user_verified.construction_secondary_materials.join(", ")}
                verified_count={props.building.verified.construction_secondary_materials}
                />
            <SelectDataEntry
                title={dataFields.construction_roof_covering.title}
                slug="construction_roof_covering"
                value={props.building.construction_roof_covering}
                tooltip={dataFields.construction_roof_covering.tooltip}
                options={RoofCoveringOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="construction_roof_covering"
                allow_verify={props.user !== undefined && props.building.construction_roof_covering !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("construction_roof_covering")}
                user_verified_as={props.user_verified.construction_roof_covering}
                verified_count={props.building.verified.construction_roof_covering}
                />
            <DataEntry
                title="Construction system type"
                slug=""
                value=""
                mode='view'
            />
        </Fragment>
    );
};

const ConstructionContainer = withCopyEdit(ConstructionView);

export default ConstructionContainer;
