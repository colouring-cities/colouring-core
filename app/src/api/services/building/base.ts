/**
 * Building data access
 *
 */
import * as _ from 'lodash';

import { pickFields } from '../../../helpers';
import { dataFieldsConfig } from '../../config/dataFields';
import * as buildingDataAccess from '../../dataAccess/building';
import { processBuildingUpdate } from '../domainLogic/processBuildingUpdate';

import { getBuildingEditHistory } from './history';
import { updateBuildingData } from './save';
import { getBuildingVerifications } from './verify';

// data type note: PostgreSQL bigint (64-bit) is handled as string in JavaScript, because of
// JavaScript numerics are 64-bit double, giving only partial coverage.

export async function getBuildingById(id: number) {
    try {
        const building = await buildingDataAccess.getBuildingData(id);

        building.edit_history = await getBuildingEditHistory(id);
        building.verified = await getBuildingVerifications(building);

        return building;
    } catch(error) {
        console.error(error);
        return undefined;
    }
}

const FIELD_EDIT_WHITELIST = new Set(Object.entries(dataFieldsConfig).filter(([, value]) => value.edit).map(([key]) => key));

export async function editBuilding(buildingId: number, building: any, userId: string): Promise<object> { // TODO add proper building type
    return await updateBuildingData(buildingId, userId, async () => {
        const processedBuilding = await processBuildingUpdate(buildingId, building);

        // remove read-only fields from consideration
        delete processedBuilding.building_id;
        delete processedBuilding.revision_id;
        delete processedBuilding.geometry_id;

        // return whitelisted fields to update
        return pickFields(processedBuilding, FIELD_EDIT_WHITELIST);
    });
}

export * from './history';
export * from './like';
export * from './query';
export * from './uprn';
export * from './verify';
