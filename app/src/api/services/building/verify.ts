import { dataFieldsConfig } from '../../config/dataFields';
import * as buildingDataAccess from '../../dataAccess/building';
import * as verifyDataAccess from '../../dataAccess/verify';
import { DatabaseError } from '../../errors/general';

const FIELD_VERIFICATION_WHITELIST = new Set(Object.entries(dataFieldsConfig).filter(([, value]) => value.verify === true).map(([key]) => key));

export async function verifyBuildingAttributes(buildingId: number, userId: string, patch: object) {
    // get current building attribute values for comparison
    const building = await buildingDataAccess.getBuildingData(buildingId);
    // keep track of attributes and values verified
    const verified = {}

    // loop through attribute => value pairs to mark as verified
    for (let [key, value] of Object.entries(patch)) {
        // check key in whitelist
        if(FIELD_VERIFICATION_WHITELIST.has(key)) {
            // check value against current from database - JSON.stringify as hack for "any" data type
            if (JSON.stringify(value) == JSON.stringify(building[key])) {
                try {
                    await verifyDataAccess.updateBuildingUserVerifiedAttribute(buildingId, userId, key, building[key]);
                    verified[key] = building[key];
                } catch (error) {
                    // possible reasons:
                    // - not a building
                    // - not a user
                    // - user already verified this attribute for this building
                    throw new DatabaseError(error);
                }
            } else {
                if (value === null) {
                    await verifyDataAccess.removeBuildingUserVerifiedAttribute(buildingId, userId, key);
                } else {
                    // not verifying current value
                    const msg = `Attribute "${key}" with value "${value}" did not match latest saved value "${building[key]}"`;
                    throw new DatabaseError(msg);
                }
            }
        } else {
            // not a valid attribute
            const msg = `Attribute ${key} not recognised.`;
            throw new DatabaseError(msg);
        }
    }
    return verified;
}

export async function getUserVerifiedAttributes(buildingId: number, userId: string) {
    return await verifyDataAccess.getBuildingUserVerifiedAttributes(buildingId, userId);
}

export async function getBuildingVerifications(building) {
    const verifications = await verifyDataAccess.getBuildingVerifiedAttributes(building.building_id);

    const verified = {};
    for (const element of FIELD_VERIFICATION_WHITELIST) {
        verified[element] = 0;
    }

    for (const item of verifications) {
        if (JSON.stringify(building[item.attribute]) == JSON.stringify(item.verified_value)) {
            verified[item.attribute] += 1
        }
    }
    return verified;
}
