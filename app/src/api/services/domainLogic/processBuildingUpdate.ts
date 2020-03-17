import * as _ from 'lodash';

import { hasAnyOwnProperty } from '../../../helpers';
import { getCurrentBuildingDataById } from '../building';

import { updateLandUse } from './landUse';

export async function processBuildingUpdate(buildingId: number, buildingUpdate: any): Promise<any> {
    if(hasAnyOwnProperty(buildingUpdate, ['current_landuse_class', 'current_landuse_group', 'current_landuse_order'])) {
        buildingUpdate = await processCurrentLandUseClassifications(buildingId, buildingUpdate);
    }

    return buildingUpdate;
}

async function processCurrentLandUseClassifications(buildingId: number, buildingUpdate: any): Promise<any> {
    const currentBuildingData = await getCurrentBuildingDataById(buildingId);

    const currentLandUseUpdate = await updateLandUse(
        {
            landUseClass: currentBuildingData.current_landuse_class,
            landUseGroup: currentBuildingData.current_landuse_group,
            landUseOrder: currentBuildingData.current_landuse_order
        }, {
            landUseClass: buildingUpdate.current_landuse_class,
            landUseGroup: buildingUpdate.current_landuse_group,
            landUseOrder: buildingUpdate.current_landuse_order
        }
    );

    return Object.assign({}, buildingUpdate, {
        current_landuse_class: currentLandUseUpdate.landUseClass,
        current_landuse_group: currentLandUseUpdate.landUseGroup,
        current_landuse_order: currentLandUseUpdate.landUseOrder,
    });
}
