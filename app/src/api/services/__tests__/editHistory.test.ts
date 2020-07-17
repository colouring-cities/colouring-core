import { EditHistoryEntry } from '../../../frontend/models/edit-history-entry';
import * as editHistoryData from '../../dataAccess/editHistory'; // manually mocked
import { ArgumentError } from '../../errors/general';
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
    
    beforeEach(() => mockedEditHistoryData.__setHistory(generateHistory(20)));

    afterEach(() => jest.clearAllMocks());

    it.each([
        [null, null],
        ['100', null],
        [null, '100']
    ])('Should error when requesting non-positive number of records', async (beforeId: string, afterId: string) => {
        let resultPromise = getGlobalEditHistory(beforeId, afterId, 0);
        await expect(resultPromise).rejects.toBeInstanceOf(ArgumentError);
        await expect(resultPromise).rejects.toHaveProperty('argumentName', 'count');
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
                ['118', 1, ['117']],
                ['104', 10, ['103', '102','101', '100']],
                ['100', 2, []]
            ]
        )('should return the N records before the specified ID in descending order [beforeId: %p, count: %p]', async (
            beforeId: string, count: number, ids: string[]
        ) => {
            const result = await getGlobalEditHistory(beforeId, null, count);

            expect(result.history.map(h => h.revision_id)).toEqual(ids);
        });

        it.each([
            [null, 4, null],
            [null, 10, null],
            [null, 20, null],
            [null, 30, null],
            ['50', 10, '99'],
            ['100', 10, '99'],
            ['130', 10, null],
            ['105', 2, '104'],
            ['120', 20, null],
        ])('should detect if there are any newer records left [beforeId: %p, count: %p]', async (
            beforeId: string, count: number, idForNewerQuery: string
        ) => {
            const result = await getGlobalEditHistory(beforeId, null, count);

            expect(result.paging.id_for_newer_query).toBe(idForNewerQuery);
        });

        it.each([
            [null, 4, '116'],
            [null, 10, '110'],
            [null, 20, null],
            [null, 30, null],
            ['50', 10, null],
            ['100', 10, null],
            ['130', 10, '110'],
            ['105', 2, '103'],
            ['120', 20, null],
        ])('should detect if there are any older records left [beforeId: %p, count: %p]', async (
            beforeId: string, count: number, idForOlderQuery: string
        ) => {
            const result = await getGlobalEditHistory(beforeId, null, count);

            expect(result.paging.id_for_older_query).toBe(idForOlderQuery);
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
            ['99', 10, '109'],
            ['110', 5, '115'],
            ['119', 20, null],
            ['99', 20, null],
        ])('should detect if there are any newer records left [afterId: %p, count: %p]', async (
            afterId: string, count: number, idForNewerQuery: string
        ) => {
            const result = await getGlobalEditHistory(null, afterId, count);

            expect(result.paging.id_for_newer_query).toBe(idForNewerQuery);
        });

        it.each([
            ['99', 10, null],
            ['110', 5, '111'],
            ['119', 20, '120'],
            ['99', 20, null],
        ])('should detect if there are any older records left [afterId: %p, count: %p]', async (
            afterId: string, count: number, idForOlderQuery: string
        ) => {
            const result = await getGlobalEditHistory(null, afterId, count);

            expect(result.paging.id_for_older_query).toBe(idForOlderQuery);
        });
        
    });

    describe('result count limit', () => {

        it.each([
            [null, null],
            [null, '100'],
            ['300', null]
        ])('should not return more than 100 entries (beforeId: %p, afterId: %p)', async (
            beforeId: string, afterId: string
        ) => {
            mockedEditHistoryData.__setHistory(
                generateHistory(200)
            );

            const result = await getGlobalEditHistory(beforeId, afterId, 200);

            expect(result.history.length).toBe(100);
        });

        it.each([
            [null, null],
            [null, '100'],
            ['300', null]
        ])('should default to 100 entries', async (
            beforeId: string, afterId: string
        ) => {
            mockedEditHistoryData.__setHistory(
                generateHistory(200)
            );

            const result = await getGlobalEditHistory(beforeId, afterId);

            expect(result.history.length).toBe(100);
        });

    });

    describe('Filtering deletions', () => {

        it('Should return only records with deletions when requested', async () => {
            const mockData = generateHistory(10);
            mockData[0].forward_patch = { 'test_field': null};
            mockData[0].reverse_patch = { 'test_field': 'test'};

            mockData[3].forward_patch = { 'test_field': null};
            mockData[3].reverse_patch = { 'test_field': 'test'};

            mockData[4].forward_patch = { 'test_field': 'test2'};
            mockData[4].reverse_patch = { 'test_field': 'test1'};
            mockedEditHistoryData.__setHistory(mockData);

            const result = await getGlobalEditHistory(null, null, 10, true);

            expect(result.history.map(x => x.revision_id)).toEqual(['103', '100']);
        });
    });
});
