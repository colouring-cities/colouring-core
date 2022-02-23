import _ from 'lodash';
import { ITask } from 'pg-promise';

import { hasAnyOwnProperty } from '../../../helpers';
import { BaseBuilding, BuildingAttributes, BuildingUpdate } from '../../models/building';
import { getBuildingData } from '../../dataAccess/building';
import { ArgumentError } from '../../errors/general';

import { updateLandUse } from './landUse';
import { updateSecondaryMaterials } from './secondaryMaterial';

/**
 * Process land use classifications - derive land use order from land use groups
 */
async function processCurrentLandUseClassifications(
    buildingId: number,
    buildingUpdate: Partial<BuildingAttributes>,
    t?: ITask<any>
): Promise<any> {
    const currentBuildingData = await getBuildingData(buildingId);

    try {
        const currentLandUseUpdate = await updateLandUse(
            {
                landUseGroup: currentBuildingData.current_landuse_group,
                landUseOrder: currentBuildingData.current_landuse_order
            }, {
                landUseGroup: buildingUpdate.current_landuse_group
            }
        );

        return Object.assign({}, buildingUpdate, {
            current_landuse_group: currentLandUseUpdate.landUseGroup,
            current_landuse_order: currentLandUseUpdate.landUseOrder,
        });
    } catch (error) {
        if(error instanceof ArgumentError && error.argumentName === 'landUseUpdate') {
            error.argumentName = 'buildingUpdate';
        }
        throw error;
    }
}


/**
 * Process Dynamics data - check field relationships and sort demolished buildings by construction date
 */
async function processDynamicsDemolishedBuildings(
    buildingId: number,
    attributesUpdate: Partial<BuildingAttributes>,
    t?: ITask<any>
): Promise<Partial<BuildingAttributes>> {
    const currentBuildingData = await getBuildingData(buildingId);

    const afterUpdate: BaseBuilding = Object.assign({}, currentBuildingData, attributesUpdate);
    
    const hasDemolished: boolean = afterUpdate.dynamics_has_demolished_buildings;
    const demolishedList: any[] = afterUpdate.demolished_buildings;

    if(currentBuildingData.date_year == undefined) {
        throw new ArgumentError('Cannot edit demolished buildings data if data on current building age is missing', 'buildingUpdate');
    }

    if(hasDemolished === false || hasDemolished == undefined) {
        if(demolishedList.length > 0) {
            throw new ArgumentError('Inconsistent data on whether there were any other buildings on this site', 'buildingUpdate');
        }
    }

    if(attributesUpdate.demolished_buildings != undefined) {
        attributesUpdate.demolished_buildings = attributesUpdate.demolished_buildings.sort((a, b) => b.year_constructed.min - a.year_constructed.min);
    }

    return attributesUpdate;
}


/**
 * Process secondary material - validate input data
 */
 async function processSecondaryMaterial(
    buildingId: number,
    buildingUpdate: Partial<BuildingAttributes>,
    t?: ITask<any>
): Promise<any> {
    const currentBuildingData = await getBuildingData(buildingId);

    try {
        const currentLandUseUpdate = await updateSecondaryMaterials(
            {
                materials: buildingUpdate.construction_secondary_materials,
            }
        );

        return Object.assign({}, buildingUpdate, {
            construction_secondary_materials: currentLandUseUpdate.materials,
        });
    } catch (error) {
        if(error instanceof ArgumentError && error.argumentName === 'secondaryMaterialsUpdate') {
            error.argumentName = 'buildingUpdate';
        }
        throw error;
    }
}


/**
 * Define any custom processing logic for specific building attributes
 */
export async function processBuildingUpdate(buildingId: number, {attributes, userAttributes}: BuildingUpdate, t?: ITask<any>): Promise<BuildingUpdate> {
    if(hasAnyOwnProperty(attributes, ['current_landuse_group'])) {
        attributes = await processCurrentLandUseClassifications(buildingId, attributes, t);
    }
    if(hasAnyOwnProperty(attributes, ['demolished_buildings', 'dynamics_has_demolished_buildings'])) {
        attributes = await processDynamicsDemolishedBuildings(buildingId, attributes, t);
    }
    if(hasAnyOwnProperty(attributes, ['construction_secondary_materials'])) {
        attributes = await processSecondaryMaterial(buildingId, attributes, t);
    }

    return {
        attributes,
        userAttributes
    };
}
