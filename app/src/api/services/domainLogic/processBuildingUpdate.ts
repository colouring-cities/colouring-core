import { hasAnyOwnProperty } from '../../../helpers';

import { processCurrentLandUseClassifications } from './currentLandUseClassifications';

export async function processBuildingUpdate(buildingId: number, building: any): Promise<any> {
    if(hasAnyOwnProperty(building, ['current_landuse_class', 'current_landuse_group', 'current_landuse_order'])) {
        building = await processCurrentLandUseClassifications(buildingId, building);
    }

    return building;
}
