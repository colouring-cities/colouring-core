import * as _ from 'lodash';

import { hasAnyOwnProperty } from '../../../helpers';
import { Building, BuildingUpdate } from '../../config/dataFields';
import { getBuildingData } from '../../dataAccess/building';
import { ArgumentError } from '../../errors/general';

import { updateLandUse } from './landUse';

/**
 * Process land use classifications - derive land use order from land use groups
 */
async function processCurrentLandUseClassifications(buildingId: number, buildingUpdate: any): Promise<any> {
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
async function processDynamicsDemolishedBuildings(buildingId: number, buildingUpdate: BuildingUpdate): Promise<BuildingUpdate> {
    const currentBuildingData = await getBuildingData(buildingId);

    const afterUpdate: Building = Object.assign({}, currentBuildingData, buildingUpdate);
    
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

    if(buildingUpdate.demolished_buildings != undefined) {
        buildingUpdate.demolished_buildings = buildingUpdate.demolished_buildings.sort((a, b) => b.year_constructed.min - a.year_constructed.min);
    }

    return buildingUpdate;
}


/**
 * Define any custom processing logic for specific building attributes
 */
export async function processBuildingUpdate(buildingId: number, buildingUpdate: BuildingUpdate): Promise<any> {
    if(hasAnyOwnProperty(buildingUpdate, ['current_landuse_group'])) {
        buildingUpdate = await processCurrentLandUseClassifications(buildingId, buildingUpdate);
    }
    if(hasAnyOwnProperty(buildingUpdate, ['demolished_buildings', 'dynamics_has_demolished_buildings'])) {
        buildingUpdate = await processDynamicsDemolishedBuildings(buildingId, buildingUpdate);
    }

    return buildingUpdate;
}
