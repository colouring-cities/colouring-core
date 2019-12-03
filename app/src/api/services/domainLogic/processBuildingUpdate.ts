import { hasAnyOwnProperty } from '../../../helpers';

import { processCurrentLandUseClassifications } from './currentLandUseClassifications';

export async function processBuildingUpdate<T>(building: T): Promise<T> {
    if(hasAnyOwnProperty(building, ['current_landuse_class', 'current_landuse_group', 'current_landuse_order'])) {
        building = await processCurrentLandUseClassifications(building);
    }

    return building;
}
