import db from '../../../db';
import * as likeDataAccess from '../../dataAccess/like';

import { updateBuildingData } from './save';

export async function getBuildingLikeById(buildingId: number, userId: string) {
    try {
        const res = await db.oneOrNone(
            'SELECT true as like FROM building_user_likes WHERE building_id = $1 and user_id = $2 LIMIT 1',
            [buildingId, userId]
        );
        return res && res.like;
    } catch(error) {
        console.error(error);
        return undefined;
    }
}

export async function likeBuilding(buildingId: number, userId: string) {
    return await updateBuildingData(
        buildingId,
        userId,
        async (t) => {
            // return total like count after update
            return {
                likes_total: await likeDataAccess.getBuildingLikeCount(buildingId, t)
            };
        },
        (t) => {
            return likeDataAccess.addBuildingUserLike(buildingId, userId, t);
        },
    );
}

export async function unlikeBuilding(buildingId: number, userId: string) {
    return await updateBuildingData(
        buildingId,
        userId,
        async (t) => {
            // return total like count after update
            return {
                likes_total: await likeDataAccess.getBuildingLikeCount(buildingId, t)
            };
        },
        async (t) => {
            return likeDataAccess.removeBuildingUserLike(buildingId, userId, t);
        },
    );
}
