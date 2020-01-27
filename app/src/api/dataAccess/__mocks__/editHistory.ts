import { EditHistoryEntry } from '../../../frontend/models/edit-history-entry';
import { numDesc } from '../../../helpers';

const mockEditHistory =
    jest.genMockFromModule('../editHistory') as typeof import('../editHistory') & {
        __setHistory: (mockHistoryData: EditHistoryEntry[]) => void
    };

let mockData: EditHistoryEntry[] = [];

mockEditHistory.__setHistory = function(mockHistoryData: EditHistoryEntry[]) {
    mockData = mockHistoryData;
};

mockEditHistory.getHistoryAfterId = function(id: string, count: number): Promise<EditHistoryEntry[]> {
    return Promise.resolve(
        mockData
            .filter(x => BigInt(x.revision_id) > BigInt(id))
            .sort(numDesc(x => BigInt(x.revision_id)))
            .slice(0, count)
    );
};

mockEditHistory.getHistoryBeforeId = function(id: string, count: number): Promise<EditHistoryEntry[]> {
    return Promise.resolve(
        mockData
            .filter(x => BigInt(x.revision_id) < BigInt(id))
            .sort(numDesc(x => BigInt(x.revision_id)))
            .slice(0, count)
    );
};

mockEditHistory.getLatestHistory = function(count: number): Promise<EditHistoryEntry[]> {
    return Promise.resolve(
        mockData
            .slice(mockData.length - count, mockData.length)
            .sort(numDesc(x => BigInt(x.revision_id)))
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
    getLatestHistory,
    getIdNewerThan,
    getIdOlderThan
} = mockEditHistory;

export {
    __setHistory,
    getHistoryAfterId,
    getHistoryBeforeId,
    getLatestHistory,
    getIdNewerThan,
    getIdOlderThan
};
