import * as _ from 'lodash';

import { hasAnyOwnProperty } from '../../../helpers';
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
 * Process Dynamics data - sort past buildings by construction date
 */
async function processDynamicsPastBuildings(buildingId: number, buildingUpdate: any): Promise<any> {
    buildingUpdate.past_buildings = buildingUpdate.past_buildings.sort((a, b) => b.year_constructed - a.year_constructed);
    return buildingUpdate;
}


/**
 * Define any custom processing logic for specific building attributes
 */
export async function processBuildingUpdate(buildingId: number, buildingUpdate: any): Promise<any> {
    if(hasAnyOwnProperty(buildingUpdate, ['current_landuse_group'])) {
        buildingUpdate = await processCurrentLandUseClassifications(buildingId, buildingUpdate);
    }
    if('past_buildings' in buildingUpdate) {
        buildingUpdate = await processDynamicsPastBuildings(buildingId, buildingUpdate);
    }

    return buildingUpdate;
}
