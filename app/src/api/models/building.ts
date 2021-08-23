import { buildingAttributesConfig, buildingUserAttributesConfig } from '../config/dataFields';

export type BuildingAttributes = { [k in keyof typeof buildingAttributesConfig]: any };
export type BuildingUserAttributes = { [k in keyof typeof buildingUserAttributesConfig]: any };

export interface BuildingUpdate {
    attributes?: Partial<BuildingAttributes>;
    userAttributes?: Partial<BuildingUserAttributes>;
    revisionId?: string;
};

export interface BuildingIdentifiers {
    building_id: number;
    geometry_id: number;
    revision_id: string;
}

export type BaseBuilding = BuildingIdentifiers & BuildingAttributes;

export interface Building extends BaseBuilding {
    user_attributes: BuildingUserAttributes;
    edit_history: any[];
    verified: any;
}