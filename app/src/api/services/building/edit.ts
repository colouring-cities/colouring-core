import _ from 'lodash';

import { BuildingAttributes, BuildingUpdate, BuildingUserAttributes } from '../../models/building';
import * as buildingDataAccess from '../../dataAccess/building';
import { startUpdateTransaction } from '../../dataAccess/transaction';
import { UserError } from '../../errors/general';
import { aggregateUserAttributes } from '../domainLogic/aggregateUserAttributes'; 
import { processBuildingUpdate } from '../domainLogic/processBuildingUpdate';
import { validateChangeSet } from '../domainLogic/validateUpdate';
import { expireBuildingTileCache } from './tileCache';


export async function editBuilding(
    buildingId: number,
    userId: string,
    { attributes, userAttributes } : BuildingUpdate
): Promise<BuildingUpdate> {
    // Validate externally provided attributes
    if(attributes) {
        validateChangeSet(attributes, true);
    }

    // Validate externally provided user attributes
    if(userAttributes) {
        validateChangeSet(userAttributes, true);
    }

    const finalUpdate = await startUpdateTransaction(async (t) => {
        let {
            attributes: processedAttributes,
            userAttributes: processedUserAttributes
        } = await processBuildingUpdate(buildingId, { attributes, userAttributes }, t);

        let resultUserAttributes: BuildingUserAttributes = null;

        if(!_.isEmpty(processedUserAttributes)) {
            validateChangeSet(processedUserAttributes, false);
            resultUserAttributes = await buildingDataAccess
                .updateBuildingUserData(buildingId, userId, processedUserAttributes, t);
        }

        processedAttributes = await aggregateUserAttributes(
            buildingId,
            userId,
            {
                attributes: processedAttributes,
                userAttributes: processedUserAttributes
            },
            t
        );

        let resultAttributes: BuildingAttributes = null;

        let revisionId: string;

        if(processedAttributes) {
            const oldAttributes = await buildingDataAccess.getBuildingData(buildingId, true, t);
            const [forwardPatch, reversePatch] = compare(oldAttributes, processedAttributes);

            if(!_.isEmpty(forwardPatch)) {
                revisionId = await buildingDataAccess
                    .insertEditHistoryRevision(buildingId, userId, forwardPatch, reversePatch, t);
                resultAttributes = await buildingDataAccess
                    .updateBuildingData(buildingId, forwardPatch, revisionId, t);
            } else {
                revisionId = oldAttributes.revision_id;
            }
        }

        if (resultAttributes == null && resultUserAttributes == null) {
            throw new UserError('No change provided');
        }

        return {
            revisionId: revisionId,
            attributes: resultAttributes,
            userAttributes: resultUserAttributes
        };
    });
    
    expireBuildingTileCache(buildingId);

    return finalUpdate;
}

/**
 * Compare old and new data objects, generate shallow merge patch of changed fields
 * - forward patch is object with {keys: new_values}
 * - reverse patch is object with {keys: old_values}
 *
 * @param {object} oldObj
 * @param {object} newObj
 * @param {Set} whitelist
 * @returns {[object, object]}
 */
 function compare(oldObj: object, newObj: object): [object, object] {
    const reverse = {};
    const forward = {};
    for (const [key, value] of Object.entries(newObj)) {
        if (!_.isEqual(oldObj[key], value)) {
            reverse[key] = oldObj[key];
            forward[key] = value;
        }
    }
    return [forward, reverse];
}
