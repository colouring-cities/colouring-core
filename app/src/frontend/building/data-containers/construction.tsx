import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';
import Verification from '../data-components/verification';

import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';
import { DataEntryGroup } from '../data-components/data-entry-group';

import {t} from'i18next';

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
            <DataEntryGroup name={t("Materials")}>
                <SelectDataEntry
                    title={t(dataFields.construction_core_material.title)}
                    slug="construction_core_material"
                    value={props.building.construction_core_material}
                    tooltip={t(dataFields.construction_core_material.tooltip)}
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
                <SelectDataEntry
                    title={t(dataFields.construction_secondary_materials.title)}
                    disabled={true}
                    slug="construction_secondary_materials"
                    value={props.building.construction_secondary_materials}
                    tooltip={t(dataFields.construction_secondary_materials.tooltip)}
                    options={ConstructionMaterialsOptions}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <SelectDataEntry
                    title={t(dataFields.construction_roof_covering.title)}
                    slug="construction_roof_covering"
                    value={props.building.construction_roof_covering}
                    tooltip={t(dataFields.construction_roof_covering.tooltip)}
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
            </DataEntryGroup>
            <DataEntryGroup name={t("Construction sectors")}>
                <DataEntry
                    title={t("Construction system type")}
                    slug=""
                    value=""
                    mode='view'
                />
            </DataEntryGroup>
        </Fragment>
    );
};

const ConstructionContainer = withCopyEdit(ConstructionView);

export default ConstructionContainer;
