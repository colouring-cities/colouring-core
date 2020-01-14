import * as _ from 'lodash';

import { isNullishOrEmpty } from '../../../helpers';
import { getLanduseGroupFromClass, getLandUseOrderFromGroup } from '../../dataAccess/landUse';
import { getCurrentBuildingDataById } from '../building';

export async function processCurrentLandUseClassifications(buildingId: number, buildingUpdate: any): Promise<any> {
    let updateData = _.pick(await getCurrentBuildingDataById(buildingId), [
        'current_landuse_class',
        'current_landuse_group',
        'current_landuse_order'
    ]);
    
    updateData = Object.assign({}, updateData, getClearValues(buildingUpdate));
    
    const updateFrom = getUpdateStartingStage(buildingUpdate);
    if(updateFrom === 'class') {
        updateData.current_landuse_class = buildingUpdate.current_landuse_class;
        updateData.current_landuse_group = await getLanduseGroupFromClass(updateData.current_landuse_class);
        updateData.current_landuse_order = await getLandUseOrderFromGroup(updateData.current_landuse_group);
    } else if (updateFrom === 'group') {
        if (isNullishOrEmpty(updateData.current_landuse_class)) {
            updateData.current_landuse_group = buildingUpdate.current_landuse_group;
            updateData.current_landuse_order = await getLandUseOrderFromGroup(buildingUpdate.current_landuse_group);
        } else {
            throw new Error('Trying to update current_landuse_group field but a more detailed field (current_landuse_class) is already filled');
        }
    } else if (updateFrom === 'order') {
        if (isNullishOrEmpty(updateData.current_landuse_class) && isNullishOrEmpty(updateData.current_landuse_group)) {
            updateData.current_landuse_order = buildingUpdate.current_landuse_order;
        } else {
            throw new Error('Trying to update current_landuse_order field but a more detailed field (current_landuse_class or current_landuse_group) is already filled');
        }
    }

    return Object.assign({}, buildingUpdate, updateData);
}

function getClearValues(building) {
    const clearValues: any = {};
    if(building.hasOwnProperty('current_landuse_class') && isNullishOrEmpty(building.current_landuse_class)) {
        clearValues.current_landuse_class = [];
    }
    if(building.hasOwnProperty('current_landuse_group') && isNullishOrEmpty(building.current_landuse_group)) {
        clearValues.current_landuse_group = [];
    }
    if(building.hasOwnProperty('current_landuse_order') && isNullishOrEmpty(building.current_landuse_order)) {
        clearValues.current_landuse_order = null;
    }

    return clearValues;
}
/**
 * Choose which level of the land use classification hierarchy the update should start from.
 * @param building 
 */
function getUpdateStartingStage(building) {
    if(building.hasOwnProperty('current_landuse_class') && !isNullishOrEmpty(building.current_landuse_class)) {
        return 'class';
    } else if(building.hasOwnProperty('current_landuse_group') && !isNullishOrEmpty(building.current_landuse_group)) {
        return 'group';
    } else if(building.hasOwnProperty('current_landuse_order') && !isNullishOrEmpty(building.current_landuse_order)) {
        return 'order';
    } else return 'none';
}
