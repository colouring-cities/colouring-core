import { EditHistoryEntry } from '../../../frontend/models/edit-history-entry';
import * as editHistoryData from '../../dataAccess/editHistory'; // manually mocked
import { getGlobalEditHistory } from '../editHistory';

jest.mock('../../dataAccess/editHistory');

const mockedEditHistoryData = editHistoryData as typeof import('../../dataAccess/__mocks__/editHistory');

function generateHistory(n: number, firstId: number = 100) {
    return [...Array(n).keys()].map<EditHistoryEntry>(i => ({
        revision_id: (firstId + i) + '',
        revision_timestamp: new Date(2019, 10, 1, 17, 20 + i).toISOString(),
        username: 'testuser',
        building_id: 1234567,
        forward_patch: {},
        reverse_patch: {}
    }));
}

describe('getGlobalEditHistory()', () => {
    
    beforeEach(() => {
        mockedEditHistoryData.__setHistory(
            generateHistory(20)
        );
    });
    
    describe('getting history before a point', () => {

        it('should return latest history if no ID specified', async () => {
            const result = await getGlobalEditHistory(null, null, 5);

            expect(result.history.map(x => x.revision_id)).toEqual(['119', '118', '117', '116', '115']);
        });

        it.each(
            [
                [null, 3, ['119', '118', '117']],
                [null, 6, ['119', '118', '117', '116', '115', '114']],
                ['118', 0, []],
            ]
        )('should return the N records before the specified ID in descending order [beforeId: %p, count: %p]', async (
            beforeId: string, count: number, ids: string[]
        ) => {
            const result = await getGlobalEditHistory(beforeId, null, count);

            expect(result.history.map(h => h.revision_id)).toEqual(ids);
        });

        it.each([
            [null, 4, true, false],
            [null, 10, true, false],
            [null, 20, false, false],
            [null, 30, false, false],
            ['50', 10, false, true],
            ['100', 10, false, true],
            ['105', 2, true, true],
        ])('should indicate if there are any newer or older records [beforeId: %p, count: %p]', async (
            beforeId: string, count: number, hasOlder: boolean, hasNewer: boolean
        ) => {
            const result = await getGlobalEditHistory(beforeId, null, count);

            expect(result.paging.has_older).toBe(hasOlder);
            expect(result.paging.has_newer).toBe(hasNewer);
        });


        it('should not return more than 100 entries', async () => {
            mockedEditHistoryData.__setHistory(
                generateHistory(200)
            );

            const result = await getGlobalEditHistory(null, null, 200);

            expect(result.paging.has_older).toBeTruthy();
            expect(result.history.length).toBe(100);
        });

        it('should default to 100 entries', async () => {
            mockedEditHistoryData.__setHistory(
                generateHistory(200)
            );

            const result = await getGlobalEditHistory(null, null, 200);

            expect(result.paging.has_older).toBeTruthy();
            expect(result.history.length).toBe(100);
        });
    });


    describe('getting history after a point', () => {

        it.each([
            ['100', 7, ['107', '106', '105', '104', '103', '102', '101']],
            ['115', 3, ['118', '117', '116']],
            ['120', 10, []]
        ])('should return N records after requested ID in descending order [afterId: %p, count: %p]', async (
            afterId: string, count: number, expected: string[]
        ) => {
            const result = await getGlobalEditHistory(null, afterId, count);

            expect(result.history.map(x => x.revision_id)).toEqual(expected);
        });

        it.each([
            ['99', 10, false, true],
            ['110', 5, true, true],
            ['119', 20, true, false],
            ['99', 20, false, false]
        ])('should indicate if there are any newer or older records [afterId: %p, count: %p]', async (
            afterId: string, count: number, hasOlder:boolean, hasNewer: boolean
        ) => {
            const result = await getGlobalEditHistory(null, afterId, count);

            expect(result.paging.has_older).toBe(hasOlder);
            expect(result.paging.has_newer).toBe(hasNewer);
        });
    });
});
