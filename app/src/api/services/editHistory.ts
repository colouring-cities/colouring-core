import { EditHistoryEntry } from '../../frontend/models/edit-history-entry';
import { getHistoryAfterId, getHistoryBeforeId, getIdNewerThan, getIdOlderThan, getLatestHistory } from '../dataAccess/editHistory';

async function getGlobalEditHistory(beforeId?: string, afterId?: string, count: number = 100) {
    // limited set of records. Expected to be already ordered from newest to oldest
    let editHistoryRecords: EditHistoryEntry[];

    if(afterId != undefined) {
        editHistoryRecords = await getHistoryAfterId(afterId, count);
    } else if (beforeId != undefined) {
        editHistoryRecords = await getHistoryBeforeId(beforeId, count);
    } else {
        editHistoryRecords = await getLatestHistory(count);
    }

    const newer = await getIdNewerThan(editHistoryRecords[0]?.revision_id);
    const older = await getIdOlderThan(editHistoryRecords[editHistoryRecords.length-1]?.revision_id);
    return {
        history: editHistoryRecords,
        paging: {
            has_newer: newer != undefined,
            has_older: older != undefined
        }
    };
}

export {
    getGlobalEditHistory
};
