import { EditHistoryEntry } from '../../frontend/models/edit-history-entry';
import { getHistoryAfterId, getHistoryBeforeId, getIdNewerThan, getIdOlderThan } from '../dataAccess/editHistory';

async function getGlobalEditHistory(beforeId?: string, afterId?: string, count: number = 100) {
    if(count > 100) count = 100;

    // limited set of records. Expected to be already ordered from newest to oldest
    let editHistoryRecords: EditHistoryEntry[];

    if(afterId != undefined) {
        editHistoryRecords = await getHistoryAfterId(afterId, count);
    } else {
        editHistoryRecords = await getHistoryBeforeId(beforeId, count);
    }

    const currentBatchNewerBound = editHistoryRecords[0]?.revision_id ?? beforeId;
    const newer = currentBatchNewerBound && await getIdNewerThan(currentBatchNewerBound);

    const currentBatchOlderBound = editHistoryRecords[editHistoryRecords.length-1]?.revision_id ?? afterId;
    const older = currentBatchOlderBound && await getIdOlderThan(currentBatchOlderBound);
    
    const hasNewer = newer != undefined;
    const hasOlder = older != undefined;

    return {
        history: editHistoryRecords,
        paging: {
            has_newer: hasNewer,
            id_for_newer_query: null,
            has_older: hasOlder,
            id_for_older_query: null
        }
    };
}

export {
    getGlobalEditHistory
};
