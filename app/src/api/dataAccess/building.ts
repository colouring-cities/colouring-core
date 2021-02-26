
import { errors, ITask, TColumnConfig } from 'pg-promise';

import db from '../../db';
import { dataFieldsConfig } from '../config/dataFields';
import { ArgumentError, DatabaseError } from '../errors/general';

export async function getBuildingData(
    buildingId: number,
    lockForUpdate: boolean = false,
    t?: ITask<any>
) {
    let buildingData;
    try {
        buildingData = await (t || db).one(
            `SELECT * FROM buildings WHERE building_id = $1${lockForUpdate ? ' FOR UPDATE' : ''};`,
            [buildingId]
        );
    } catch(error) {
        if(
            error instanceof errors.QueryResultError &&
            error.code === errors.queryResultErrorCode.noData
        ) {
            throw new ArgumentError(`Building ID ${buildingId} does not exist`, 'buildingId');
        }
        throw new DatabaseError(error);
    }

    return buildingData;
}

export async function insertEditHistoryRevision(
    buildingId: number,
    userId: string,
    forwardPatch: object,
    reversePatch: object,
    t?: ITask<any>
): Promise<string> {
    try {
        const { log_id } = await (t || db).one(
            `INSERT INTO logs (
                        forward_patch, reverse_patch, building_id, user_id
                    ) VALUES (
                        $1:json, $2:json, $3, $4
                    ) RETURNING log_id
                    `,
            [forwardPatch, reversePatch, buildingId, userId]
        );
    
        return log_id;
    } catch(error) {
        throw new DatabaseError(error);
    }
}

const columnSetForUpdate = new db.$config.pgp.helpers.ColumnSet(
    Object.entries(dataFieldsConfig).filter(([key, config]) => config.edit).map<TColumnConfig>(([key, {
        asJson = false,
        sqlCast
    }]) => ({
        name: key,
        mod: asJson ? ':json' : undefined,
        cast: sqlCast
    })),
    { table: { table: 'buildings', schema: 'public'}}
);

export async function updateBuildingData(
    buildingId: number,
    forwardPatch: object,
    revisionId: string,
    t?: ITask<any>
): Promise<object> {
    const sets = db.$config.pgp.helpers.sets(forwardPatch, columnSetForUpdate);

    console.log('Setting', buildingId, sets);

    try {
        return await (t || db).one(
            `UPDATE
                    buildings
                SET
                    revision_id = $1,
                    $2:raw
                WHERE
                    building_id = $3
                RETURNING
                    *
                `,
            [revisionId, sets, buildingId]
        );
    } catch(error) {
        throw new DatabaseError(error);
    }
}
