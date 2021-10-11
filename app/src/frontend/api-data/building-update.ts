import { BuildingAttributes, BuildingEdits, BuildingUserAttributes } from '../models/building';
import { apiPost } from '../apiHelpers';
import { buildingUserFields, dataFields } from '../config/data-fields-config';

export type UpdatedBuilding = Partial<BuildingAttributes> & Partial<BuildingUserAttributes> & {
    revision_id: string;
};

function makeUpdateData(edits: BuildingEdits) {
    const data = {
        attributes: {},
        user_attributes: {}
    };

    for (let [field, value] of Object.entries(edits)) {
        if (dataFields[field]) {
            data.attributes[field] = value;
        } else if (buildingUserFields[field]) {
            data.user_attributes[field] = value;
        }
    }

    return data;
}

export async function sendBuildingUpdate(buildingId: number, edits: BuildingEdits): Promise<UpdatedBuilding> {
    const requestData = makeUpdateData(edits);
    const data = await apiPost(
        `/api/buildings/${buildingId}.json`,
        requestData
    );

    if (data.error) {
        throw data.error;
    } else {
        const {
            revision_id,
            attributes,
            user_attributes
        } = data;

       return {
            revision_id,
            ...attributes,
            ...user_attributes
        };
    }
}