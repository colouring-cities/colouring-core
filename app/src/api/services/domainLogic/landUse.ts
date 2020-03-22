import _ from 'lodash';

import * as landUseDataAccess from '../../dataAccess/landUse';
import { ArgumentError } from '../../errors/general';

export interface LandUseState {
    landUseGroup: string[];
    landUseOrder: string;
}

export async function updateLandUse(landUse: LandUseState, landUseUpdate: Partial<LandUseState>): Promise<LandUseState> {
    const landUseGroupUpdate = landUseUpdate.landUseGroup;

    for(let group of landUseGroupUpdate) {
        const isGroupValid = await landUseDataAccess.isLandUseGroupAllowed(group);
        if(!isGroupValid) {
            throw new ArgumentError(`'${group}' is not a valid Land Use Group`, 'landUseUpdate');
        }
    }

    if(hasDuplicates(landUseGroupUpdate)) {
        throw new ArgumentError('Cannot supply duplicate Land Use Groups', 'landUseUpdate');
    }

    const landUseOrderUpdate = await landUseDataAccess.getLandUseOrderFromGroup(landUseGroupUpdate);

    return {
        landUseGroup: landUseGroupUpdate,
        landUseOrder: landUseOrderUpdate
    };
}

function hasDuplicates(array: any[]) {
    return (new Set(array).size !== array.length);
}
