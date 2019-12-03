import db from '../../../db';
import { getBuildingById, getCurrentBuildingDataById } from '../building';

export async function processCurrentLandUseClassifications(building: any): Promise<any> {

    const updateFrom = getUpdateStartingStage(building);
    const currentData = await getCurrentBuildingDataById(building.building_id);

    if(updateFrom === 'class') {
        building.current_landuse_group = await deriveGroupFromClass(building.current_landuse_class);
        building.current_landuse_order = await deriveOrderFromGroup(building.current_landuse_group);
    } else if (updateFrom === 'group') {
        if(currentData.current_landuse_class == undefined) {
            building.current_landuse_order = await deriveOrderFromGroup(building.current_landuse_group);
        } else {
            delete building.current_landuse_group;
            delete building.current_landuse_order;
        }
    } else if (updateFrom === 'order') {
        if(currentData.current_landuse_class == undefined && currentData.current_landuse_group == undefined) {
            // do nothing, building.current_landuse_order is already correctly set and can be used for the update
        } else {
            delete building.current_landuse_order;
        }
    }

    return building;
}

/**
 * Choose which level of the land use classification hierarchy the update should start from.
 * @param building 
 */
function getUpdateStartingStage(building) {
    if(building.hasOwnProperty('current_landuse_class')) {
        return 'class';
    } else if(building.hasOwnProperty('current_landuse_group')) {
        return 'group';
    } else if(building.hasOwnProperty('current_landuse_order')) {
        return 'order';
    } else return 'none';
}

function deriveGroupFromClass(classes: string[]): Promise<string[]> {
    return db.many(
        `
        SELECT DISTINCT parent.description
        FROM reference_tables.buildings_landuse_group AS parent
        JOIN reference_tables.buildings_landuse_class AS child
        ON child.parent_group_id = parent.landuse_id
        WHERE child.description IN ($1:csv)
        ORDER BY parent.description`,
        [classes]
    );
}

async function deriveOrderFromGroup(groups: string[]): Promise<string> {
    const orders = await db.many(
        `
        SELECT DISTINCT parent.description
        FROM reference_tables.buildings_landuse_order AS parent
        JOIN reference_tables.buildings_landuse_group AS child
        ON child.parent_order_id = parent.landuse_id
        WHERE child.description IN ($1:csv)
        ORDER BY parent.description
        `,
        [groups]
    );

    if(orders.length === 1) {
        return orders[0];
    } else if (orders.length > 1) {
        return 'Mixed use';
    } else return null;
}
