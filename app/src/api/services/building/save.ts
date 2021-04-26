import { ITask } from 'pg-promise';
import _ from 'lodash';

import db from '../../../db';
import * as buildingDataAccess from '../../dataAccess/building';
import { UserError } from '../../errors/general';

import { expireBuildingTileCache } from './tileCache';


const TransactionMode = db.$config.pgp.txMode.TransactionMode;
const isolationLevel = db.$config.pgp.txMode.isolationLevel;

// Create a transaction mode (serializable, read-write):
const serializable = new TransactionMode({
    tiLevel: isolationLevel.serializable,
    readOnly: false
});

/**
 * Carry out an update of the buildings data. Allows for running any custom database operations before the main update.
 * All db hooks get passed a transaction.
 * @param buildingId The ID of the building to update
 * @param userId The ID of the user updating the data
 * @param getUpdateValue Function returning the set of attribute to update for the building
 * @param preUpdateDbAction Any db operations to carry out before updating the buildings table (mostly intended for updating the user likes table)
 */
export async function updateBuildingData(
    buildingId: number,
    userId: string,
    getUpdateValue: (t: ITask<any>) => Promise<object>,
    preUpdateDbAction?: (t: ITask<any>) => Promise<void>,
): Promise<object> {
    return await db.tx({mode: serializable}, async t => {
        if (preUpdateDbAction != undefined) {
            await preUpdateDbAction(t);
        }

        const update = await getUpdateValue(t);

        const oldBuilding = await buildingDataAccess.getBuildingData(buildingId, true, t);

        console.log(update);
        const patches = compare(oldBuilding, update);
        console.log('Patching', buildingId, patches);
        const [forward, reverse] = patches;
        if (Object.keys(forward).length === 0) {
            throw new UserError('No change provided');
        }

        const revisionId = await buildingDataAccess.insertEditHistoryRevision(buildingId, userId, forward, reverse, t);

        const updatedData = await buildingDataAccess.updateBuildingData(buildingId, forward, revisionId, t);

        expireBuildingTileCache(buildingId);

        return updatedData;
    });
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
