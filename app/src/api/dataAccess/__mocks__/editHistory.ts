import { EditHistoryEntry } from '../../../frontend/models/edit-history-entry';
import { numAsc, numDesc } from '../../../helpers';

/**
 * Create an object mocking all method of editHistory dataAccess
 * The type is set to reflect the type of that module, with added methods
 * used when testing
 */
const mockEditHistory =
    jest.genMockFromModule('../editHistory') as typeof import('../editHistory') & {
        __setHistory: (mockHistoryData: EditHistoryEntry[]) => void
    };

let mockData: EditHistoryEntry[] = [];

mockEditHistory.__setHistory = function(mockHistoryData: EditHistoryEntry[]) {
    mockData = mockHistoryData.sort(numDesc(x => BigInt(x.revision_id)));
};

mockEditHistory.getHistoryAfterId = function(id: string, count: number): Promise<EditHistoryEntry[]> {
    return Promise.resolve(
        mockData
            .filter(x => BigInt(x.revision_id) > BigInt(id))
            .sort(numAsc(x => BigInt(x.revision_id)))
            .slice(0, count)
            .sort(numDesc(x => BigInt(x.revision_id)))
    );
};

mockEditHistory.getHistoryBeforeId = function(id: string, count: number): Promise<EditHistoryEntry[]> {
    let filteredData = id == undefined ? mockData : mockData.filter(x => BigInt(x.revision_id) < BigInt(id));
    return Promise.resolve(
        filteredData
            .slice(0, count)
    );
};

mockEditHistory.getIdNewerThan = async function(id: string): Promise<string> {
    const historyAfterId = await mockEditHistory.getHistoryAfterId(id, 1);
    return historyAfterId[historyAfterId.length - 1]?.revision_id;
};

mockEditHistory.getIdOlderThan = async function(id: string): Promise<string> {
    const historyBeforeId = await mockEditHistory.getHistoryBeforeId(id, 1);
    return historyBeforeId[0]?.revision_id;
};

const {
    __setHistory,
    getHistoryAfterId,
    getHistoryBeforeId,
    getIdNewerThan,
    getIdOlderThan
} = mockEditHistory;

export {
    __setHistory,
    getHistoryAfterId,
    getHistoryBeforeId,
    getIdNewerThan,
    getIdOlderThan
};
