import { dataFields } from '../config/data-fields-config';

/**
 * A type representing the types of a building's attributes.
 * This is derived automatically from the "example" fields in dataFieldsConfig.
 * If a TS error starting with "Type 'example' cannot be used to index type [...]" appears here,
 * that means an example field is most probably missing on one of the config definitions in dataFieldsConfig.
 */
export type BuildingAttributes = {[key in keyof typeof dataFields]: (typeof dataFields)[key]['example']};

export type BuildingAttributeVerificationCounts = {[key in keyof typeof dataFields]: number};

export type UserVerified = {[key in keyof BuildingAttributes]?: BuildingAttributes[key]};

export interface Building extends BuildingAttributes {
    building_id: number;
    geometry_id: number;
    revision_id: string;

    verified: BuildingAttributeVerificationCounts;
}
