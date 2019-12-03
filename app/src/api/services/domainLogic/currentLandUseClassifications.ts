import * as _ from 'lodash';

import db from '../../../db';
import { isNullishOrEmpty } from '../../../helpers';
import { getCurrentBuildingDataById } from '../building';

export async function processCurrentLandUseClassifications(buildingId: number, building: any): Promise<any> {
    let updateData = _.pick(await getCurrentBuildingDataById(buildingId), [
        'current_landuse_class',
        'current_landuse_group',
        'current_landuse_order'
    ]);
    
    updateData = Object.assign({}, updateData, getClearValues(building));
    
    const updateFrom = getUpdateStartingStage(building);
    if(updateFrom === 'class') {
        updateData.current_landuse_class = building.current_landuse_class;
        updateData.current_landuse_group = await deriveGroupFromClass(updateData.current_landuse_class);
        updateData.current_landuse_order = await deriveOrderFromGroup(updateData.current_landuse_group);
    } else if (updateFrom === 'group') {
        if (isNullishOrEmpty(updateData.current_landuse_class)) {
            updateData.current_landuse_group = building.current_landuse_group;
            updateData.current_landuse_order = await deriveOrderFromGroup(building.current_landuse_group);
        } else {
            throw new Error('Trying to update current_landuse_group field but a more detailed field (current_landuse_class) is already filled');
        }
    } else if (updateFrom === 'order') {
        if (isNullishOrEmpty(updateData.current_landuse_class) && isNullishOrEmpty(updateData.current_landuse_group)) {
            updateData.current_landuse_order = building.current_landuse_order;
        } else {
            throw new Error('Trying to update current_landuse_order field but a more detailed field (current_landuse_class or current_landuse_group) is already filled');
        }
    }

    return Object.assign({}, building, updateData);
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

async function deriveGroupFromClass(classes: string[]): Promise<string[]> {
    if (classes.length === 0) return [];

    return (await db.many(
        `
        SELECT DISTINCT parent.description
        FROM reference_tables.buildings_landuse_group AS parent
        JOIN reference_tables.buildings_landuse_class AS child
        ON child.parent_group_id = parent.landuse_id
        WHERE child.description IN ($1:csv)
        ORDER BY parent.description`,
        [classes]
    )).map(x => x.description);
}

async function deriveOrderFromGroup(groups: string[]): Promise<string> {
    if(groups.length === 0) return null;

    const orders = (await db.many(
        `
        SELECT DISTINCT parent.description
        FROM reference_tables.buildings_landuse_order AS parent
        JOIN reference_tables.buildings_landuse_group AS child
        ON child.parent_order_id = parent.landuse_id
        WHERE child.description IN ($1:csv)
        ORDER BY parent.description
        `,
        [groups]
    )).map(x => x.description);

    if(orders.length === 1) {
        return orders[0];
    } else if (orders.length > 1) {
        return 'Mixed use';
    } else return null;
}
