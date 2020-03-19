import * as _ from 'lodash';

import { LandUseState, updateLandUse } from '../../domainLogic/landUse';

const testGroupToOrder = {
    'Agriculture': 'Agriculture And Fisheries',
    'Fisheries': 'Agriculture And Fisheries',
    'Manufacturing': 'Industry And Business',
    'Offices': 'Industry And Business'
};

jest.mock('../../../dataAccess/landUse', () => ({
    getLandUseOrderFromGroup: jest.fn((groups: string[]) => {
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
        jest.clearAllMocks();
    });

    it.each([
        [{
            landUseGroup: [],
            landUseOrder: null
        }, {
            landUseGroup: ['Agriculture']
        }, {
            landUseGroup: ['Agriculture'],
            landUseOrder: 'Agriculture And Fisheries'
        }],

        [{
            landUseGroup: ['Agriculture'],
            landUseOrder: 'Agriculture And Fisheries'
        }, {
            landUseGroup: ['Fisheries']
        }, {
            landUseGroup: ['Fisheries'],
            landUseOrder: 'Agriculture And Fisheries'
        }],

        [{
            landUseGroup: ['Agriculture'],
            landUseOrder: 'Agriculture And Fisheries'
        }, {
            landUseGroup: ['Agriculture', 'Offices'],
        }, {
            landUseGroup: ['Agriculture', 'Offices'],
            landUseOrder: 'Mixed Use'
        }]
    ])('Should derive land use order from group',
        async (landUse: LandUseState, landUseUpdate: Partial<LandUseState>, expectedUpdate: LandUseState) => {
            const result = await updateLandUse(landUse, landUseUpdate);

            expect(result).toEqual(expectedUpdate);
        }
    );

    it.each([
        [{
            landUseGroup: ['Agriculture'],
            landUseOrder: 'Agriculture And Fisheries'
        }, {
            landUseGroup: []
        }, {
            landUseGroup: [],
            landUseOrder: null
        }],

        [{
            landUseGroup: ['Agriculture', 'Offices'],
            landUseOrder: 'Mixed Use',
        }, {
            landUseGroup: ['Agriculture'],
        }, {
            landUseGroup: ['Agriculture'],
            landUseOrder: 'Agriculture And Fisheries'
        }]
    ])('Should remove derived land use order when land use group is removed',
        async (landUse: LandUseState, landUseUpdate: Partial<LandUseState>, expectedUpdate: LandUseState) => {
            const result = await updateLandUse(landUse, landUseUpdate);

            expect(result).toEqual(expectedUpdate);
        }
    );

});
