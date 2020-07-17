import { EditHistoryEntry } from '../../frontend/models/edit-history-entry';
import { decBigInt, incBigInt } from '../../helpers';
import { getHistoryAfterId, getHistoryBeforeId, getIdNewerThan, getIdOlderThan } from '../dataAccess/editHistory';
import { ArgumentError } from '../errors/general';

async function getGlobalEditHistory(
    beforeId?: string,
    afterId?: string,
    count: number = 100,
    filterDeletions: boolean = false
) {
    if(count <= 0) throw new ArgumentError('cannot request less than 1 history record', 'count');
    if(count > 100) count = 100;

    // limited set of records. Expected to be already ordered from newest to oldest
    let editHistoryRecords: EditHistoryEntry[];

    if(afterId != undefined) {
        editHistoryRecords = await getHistoryAfterId(afterId, count, filterDeletions);
    } else {
        editHistoryRecords = await getHistoryBeforeId(beforeId, count, filterDeletions);
    }

    const currentBatchMaxId = editHistoryRecords[0]?.revision_id ?? decBigInt(beforeId);
    const newer = currentBatchMaxId && await getIdNewerThan(currentBatchMaxId);

    const currentBatchMinId = editHistoryRecords[editHistoryRecords.length-1]?.revision_id ?? incBigInt(afterId);
    const older = currentBatchMinId && await getIdOlderThan(currentBatchMinId);

    const idForOlderQuery = older != undefined ? incBigInt(older) : null;
    const idForNewerQuery = newer != undefined ? decBigInt(newer) : null;

    return {
        history: editHistoryRecords,
        paging: {
            id_for_newer_query: idForNewerQuery,
            id_for_older_query: idForOlderQuery
        }
    };
}

export {
    getGlobalEditHistory
};
