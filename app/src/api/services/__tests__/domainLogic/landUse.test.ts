import * as _ from 'lodash';

import { DomainLogicError } from '../../../errors/general';
import { LandUseState, updateLandUse } from '../../domainLogic/landUse';

const testClassToGroup = {
    'Animal breeding places': 'Agriculture',
    'Egg grading place': 'Agriculture',
    'Fish farm': 'Fisheries',
    'Brewery': 'Manufacturing',
    'Business meeting places': 'Offices'
};
const testGroupToOrder = {
    'Agriculture': 'Agriculture And Fisheries',
    'Fisheries': 'Agriculture And Fisheries',
    'Manufacturing': 'Industry And Business',
    'Offices': 'Industry And Business'
};

jest.mock('../../../dataAccess/landUse', () => ({
    getLandUseGroupFromClass: jest.fn((classes: string[]) => {
        const groups = _.chain(classes).map(c => testClassToGroup[c]).uniq().value();

        return Promise.resolve(groups);
    }),
    getLandUseOrderGromGroup: jest.fn((groups: string[]) => {
        const orders = _.chain(groups).map(g => testGroupToOrder[g]).uniq().value();

        let result: string;
        if(orders.length == 0) result = null;
        else if(orders.length == 1) result = orders[0];
        else result = 'Mixed Use';
        
        return Promise.resolve(result);
    })
}));

describe('updateLandUse()', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        [{
            landUseClass: [],
            landUseGroup: [],
            landUseOrder: null
        }, {
            landUseClass: ['Animal breeding places']
        }, {
            landUseClass: ['Animal breeding places'],
            landUseGroup: ['Agriculture'],
            landUseOrder: 'Agriculture And Fisheries'
        }],

        [{
            landUseClass: ['Animal breeding places'],
            landUseGroup: ['Agriculture'],
            landUseOrder: 'Agriculture And Fisheries'
        }, {
            landUseClass: ['Fish farm']
        }, {
            landUseClass: ['Fish farm'],
            landUseGroup: ['Fisheries'],
            landUseOrder: 'Agriculture And Fisheries'
        }],

        [{
            landUseClass: ['Animal breeding places'],
            landUseGroup: ['Agriculture'],
            landUseOrder: 'Agriculture And Fisheries'
        }, {
            landUseClass: ['Animal breeding places', 'Business meeting places']
        }, {
            landUseClass: ['Animal breeding places', 'Business meeting places'],
            landUseGroup: ['Agriculture', 'Offices'],
            landUseOrder: 'Mixed Use'
        }]
    ])('Should derive higher level land use classifications from lower level ones',
        async (landUse: LandUseState, landUseUpdate: Partial<LandUseState>, expectedUpdate: LandUseState) => {
            const result = await updateLandUse(landUse, landUseUpdate);

            expect(result).toBe(expectedUpdate);
        }
    );

    it.each([
        [{
            landUseClass: ['Fish farm'],
            landUseGroup: ['Fisheries'],
            landUseOrder: 'Agriculture And Fisheries'
        }, {
            landUseGroup: []
        }]
    ])('Should error when update breaks an automatic chain of classifications', 
        async (landUse: LandUseState, landUseUpdate: Partial<LandUseState>) => {
            const resultPromise = updateLandUse(landUse, landUseUpdate);

            expect(resultPromise).rejects.toBeInstanceOf(DomainLogicError);
        }
    );
});
