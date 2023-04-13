import _ from 'lodash';

import * as materialDataAccess from '../../dataAccess/material';
import { ArgumentError } from '../../errors/general';

export interface materialGroup {
    materials: string[];
}

export async function updateSecondaryMaterials(update: materialGroup): Promise<materialGroup> {
    const groupMaterials = update.materials;

    for(let group of groupMaterials) {
        const isGroupValid = await materialDataAccess.isMaterialAllowed(group);
        if(!isGroupValid) {
            throw new ArgumentError(`'${group}' is not a valid Land Use Group`, 'secondaryMaterialsUpdate');
        }
    }

    if(hasDuplicates(groupMaterials)) {
        throw new ArgumentError('Cannot supply duplicate materials', 'secondaryMaterialsUpdate');
    }

    return update;
}

function hasDuplicates(array: any[]) {
    return (new Set(array).size !== array.length);
}
