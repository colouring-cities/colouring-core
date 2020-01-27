import { mocked } from 'ts-jest/utils';

import { EditHistoryEntry } from '../../../frontend/models/edit-history-entry';
import * as editHistoryData from '../../dataAccess/editHistory'; // manually mocked
import { getGlobalEditHistory } from '../editHistory';

jest.mock('../../dataAccess/editHistory');

const mockedEditHistoryData = editHistoryData as typeof import('../../dataAccess/__mocks__/editHistory');

describe('getGlobalEditHistory()', () => {
    mockedEditHistoryData.__setHistory(
        [...Array(20).keys()].map<EditHistoryEntry>(i => ({
            revision_id: (100 + i) + '',
            revision_timestamp: new Date(2019, 10, 1, 17, 20 + i).toISOString(),
            username: 'testuser',
            building_id: 1234567,
            forward_patch: {},
            reverse_patch: {}
        }))
    );

    describe('without before/after parameters', () => {
        it.each(
            [
                [0, []],
                [3, ['119', '118', '117']],
                [6, ['119', '118', '117', '116', '115', '114']]
            ]
        )('should return the N latest records in descending order', async (count: number, ids: string[]) => {
            const historyResult = await getGlobalEditHistory(null, null, count);

            expect(historyResult.history.map(h => h.revision_id)).toEqual(ids);
        });
    });

    describe('with after ID parameter', () => {
    });

    describe('with before ID parameter', () => {

    });
});
