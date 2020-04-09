import { errors, ITask } from 'pg-promise';

import db from '../../db';
import { DatabaseError, InvalidOperationError } from '../errors/general';

export async function getBuildingLikeCount(buildingId: number, t?: ITask<any>): Promise<number> {
    try {
        const result  = await (t || db).one(
            'SELECT count(*) as likes FROM building_user_likes WHERE building_id = $1;',
            [buildingId]
        );
        
        return result.likes;
    } catch(error) {
        throw new DatabaseError(error);
    }
}

export async function addBuildingUserLike(buildingId: number, userId: string, t?: ITask<any>): Promise<void> {
    try {
        return await (t || db).none(
            'INSERT INTO building_user_likes ( building_id, user_id ) VALUES ($1, $2);',
            [buildingId, userId]
        );
    } catch(error) {
        if(error.detail?.includes('already exists')) {
            throw new InvalidOperationError('User already likes this building');
        }
        throw new DatabaseError(error);
    }
}

export async function removeBuildingUserLike(buildingId: number, userId: string, t?: ITask<any>): Promise<void> {
    let result;
    try {
        result = await t.result(
            'DELETE FROM building_user_likes WHERE building_id = $1 AND user_id = $2;',
            [buildingId, userId]
        );
    } catch(error) {
        throw new DatabaseError(error);
    }

    if (result.rowCount === 0) {
        throw new InvalidOperationError("User doesn't like the building, cannot unlike");
    }
}
