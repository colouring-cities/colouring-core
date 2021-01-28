import * as _ from 'lodash';

import { hasAnyOwnProperty } from '../../../helpers';
import { getBuildingData } from '../../dataAccess/building';
import { ArgumentError } from '../../errors/general';

import { updateLandUse } from './landUse';

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

export async function processBuildingUpdate(buildingId: number, buildingUpdate: any): Promise<any> {
    if(hasAnyOwnProperty(buildingUpdate, ['current_landuse_group'])) {
        buildingUpdate = await processCurrentLandUseClassifications(buildingId, buildingUpdate);
    }

    return buildingUpdate;
}
