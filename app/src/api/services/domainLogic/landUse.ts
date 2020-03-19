import _ from 'lodash';

import { getLandUseOrderFromGroup } from '../../dataAccess/landUse';

export interface LandUseState {
    landUseGroup: string[];
    landUseOrder: string;
}

export async function updateLandUse(landUse: LandUseState, landUseUpdate: Partial<LandUseState>): Promise<LandUseState> {
    const landUseGroupUpdate = landUseUpdate.landUseGroup;
    const landUseOrderUpdate = await getLandUseOrderFromGroup(landUseGroupUpdate);

    return {
        landUseGroup: landUseGroupUpdate,
        landUseOrder: landUseOrderUpdate
    };
}
