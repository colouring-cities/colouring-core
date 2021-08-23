import { ITask } from 'pg-promise';
import { BuildingAttributes, BuildingUpdate } from '../../models/building';
import { aggregationsConfig } from '../../config/aggregationsConfig';
import { aggregationMethods } from '../../dataAccess/aggregate';

export async function aggregateUserAttributes(
    buildingId: number,
    userId: string,
    { attributes, userAttributes } : BuildingUpdate,
    t?: ITask<any>
): Promise<Partial<BuildingAttributes>> {
    const derivedAttributes: Partial<BuildingAttributes> = {};

    for(let [key, aggregations] of Object.entries(aggregationsConfig)) {
        if(key in userAttributes) {
            for(let config of aggregations) {
                derivedAttributes[config.aggregateFieldName] = await aggregationMethods[config.aggregationMethod](buildingId, key, t);
            }
        }
    }

    return Object.assign({}, attributes, derivedAttributes);
}