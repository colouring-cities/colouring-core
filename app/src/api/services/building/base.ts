/**
 * Building data access
 *
 */
import _ from 'lodash';

import * as buildingDataAccess from '../../dataAccess/building';
import { Building, BuildingUserAttributes } from '../../models/building';
import { getBuildingEditHistory } from './history';
import { getBuildingVerifications } from './verify';

// data type note: PostgreSQL bigint (64-bit) is handled as string in JavaScript, because of
// JavaScript numerics are 64-bit double, giving only partial coverage.

export interface BuildingMetadataOptions {
    editHistory?: boolean;
    verified?: boolean;

    userDataOptions?: {
        userId: string;
        userAttributes?: boolean;
    }
}

export async function getBuildingById(
    buildingId: number,
    {
        editHistory = true,
        verified = true,
        userDataOptions
    }: BuildingMetadataOptions = {}
) {
    const baseBuilding = await buildingDataAccess.getBuildingData(buildingId);
    const building: Partial<Building> = {...baseBuilding};

    if(editHistory) {
        building.edit_history = await getBuildingEditHistory(buildingId);
    }

    if(verified) {
        building.verified = await getBuildingVerifications(baseBuilding);
    }

    if(userDataOptions && userDataOptions.userAttributes) {
        building.user_attributes = await getBuildingUserAttributesById(buildingId, userDataOptions.userId);
    }

    return building;
}

export async function getBuildingUserAttributesById(buildingId: number, userId: string): Promise<BuildingUserAttributes> {
    return buildingDataAccess.getBuildingUserData(buildingId, userId);
}

export * from './edit';
export * from './history';
export * from './query';
export * from './uprn';
export * from './verify';
