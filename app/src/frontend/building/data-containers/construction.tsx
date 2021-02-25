import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

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
            <SelectDataEntry
                title={dataFields.construction_secondary_materials.title}
                disabled={true}
                slug="construction_secondary_materials"
                value={props.building.construction_secondary_materials}
                tooltip={dataFields.construction_secondary_materials.tooltip}
                options={ConstructionMaterialsOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
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
            <DataEntry
                title="Construction system"
                slug=""
                value=""
                mode='view'
            />
        </Fragment>
    );
};

const ConstructionContainer = withCopyEdit(ConstructionView);

export default ConstructionContainer;
