import { hasAnyOwnProperty } from '../../../helpers';

import { processCurrentLandUseClassifications } from './currentLandUseClassifications';

export async function processBuildingUpdate(buildingId: number, buildingUpdate: any): Promise<any> {
    if(hasAnyOwnProperty(buildingUpdate, ['current_landuse_class', 'current_landuse_group', 'current_landuse_order'])) {
        buildingUpdate = await processCurrentLandUseClassifications(buildingId, buildingUpdate);
    }

    return buildingUpdate;
}
