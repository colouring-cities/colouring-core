import { buildingUserFields, dataFields } from '../config/data-fields-config';
import { getBuildingVerifiedCount } from '../../api/dataAccess/verify';

type AttributesBasedOnExample<T extends Record<string, {example: any}>> = {[key in keyof T]: T[key]['example']};

/**
 * A type representing the types of a building's attributes.
 * This is derived automatically from the "example" fields in dataFieldsConfig.
 * If a TS error starting with "Type 'example' cannot be used to index type [...]" appears here,
 * that means an example field is most probably missing on one of the config definitions in dataFieldsConfig.
 */
export type BuildingAttributes = AttributesBasedOnExample<typeof dataFields>;
export type BuildingUserAttributes = AttributesBasedOnExample<typeof buildingUserFields>;

// This should be a dict of dataField keys and verification counts
// export type BuildingAttributeVerificationCounts = {[key in keyof typeof dataFields]: number};

export type UserVerified = {[key in keyof BuildingAttributes]?: BuildingAttributes[key]};

// BuildingAttributeVerificationCounts = {}
// for key in BuildingUserAttributes
//     BuildingAttributeVerificationCounts[key] = getBuildingVerifiedCount(buildingId, attribute);

export interface Building extends BuildingAttributes, BuildingUserAttributes {
    building_id: number;
    geometry_id: number;
    revision_id: string;

    verified: BuildingAttributeVerificationCounts;
}

export type BuildingEdits = Partial<BuildingAttributes & BuildingUserAttributes>;