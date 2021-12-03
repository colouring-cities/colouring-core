
import { errors, ITask } from 'pg-promise';
import _ from 'lodash';

import db from '../../db';
import { allAttributesConfig, buildingUserAttributesConfig } from '../config/dataFields';
import { BaseBuilding, BuildingAttributes, BuildingUserAttributes } from '../models/building';
import { ArgumentError, DatabaseError } from '../errors/general';

export async function getBuildingData(
    buildingId: number,
    lockForUpdate: boolean = false,
    t?: ITask<any>
): Promise<BaseBuilding> {
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

const columnConfigLookup = Object.assign(
    {}, 
    ...Object.entries(allAttributesConfig).filter(([, config]) => config.edit || config.derivedEdit).map(([key, {
        asJson = false,
        sqlCast
    }]) => ({ [key]: {
        name: key,
        mod: asJson ? ':json' : undefined,
        cast: sqlCast
    } }))
);

export async function updateBuildingData(
    buildingId: number,
    forwardPatch: object,
    revisionId: string,
    t?: ITask<any>
): Promise<BuildingAttributes> {
    const columnConfig = Object.entries(forwardPatch).map(([key]) => columnConfigLookup[key]);
    const sets = db.$config.pgp.helpers.sets(forwardPatch, columnConfig);

    console.log('Setting', buildingId, sets);

    try {
        const buildingRow: BaseBuilding =  await (t || db).one(
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

        delete buildingRow.building_id;
        delete buildingRow.geometry_id;
        delete buildingRow.revision_id;

        return buildingRow as BuildingAttributes;
    } catch(error) {
        throw new DatabaseError(error);
    }
}

/**
 * Function that ensures a building-user attribute record exists.
 * The record is created if there isn't one yet.
 */
async function ensureBuildingUserRecord(buildingId: number, userId: string, t: ITask<any>) {
    try {
        await t.one(
            `SELECT * FROM building_user_attributes WHERE building_id = $1 AND user_id = $2;`,
            [buildingId, userId]
        );
    } catch(error) {
        if(error.code === errors.queryResultErrorCode.noData) {
            try {
                await t.none(
                    'INSERT INTO building_user_attributes (building_id, user_id) VALUES ($1, $2);',
                    [buildingId, userId]
                );
            } catch(error) {
                throw new DatabaseError(error);
            }
        } else {
            throw new DatabaseError(error);
        }
    }
}

type BuildingUserAttributesRow = BuildingUserAttributes & {
    building_id: number;
    user_id: string;
}

export async function updateBuildingUserData(
    buildingId: number,
    userId: string,
    forwardPatch: object,
    t?: ITask<any>
) : Promise<BuildingUserAttributes> {
    await ensureBuildingUserRecord(buildingId, userId, t);

    const columnConfig = Object.entries(forwardPatch).map(([key]) => columnConfigLookup[key]);
    const sets = db.$config.pgp.helpers.sets(forwardPatch, columnConfig);

    try {
        const buildingUserRow: BuildingUserAttributesRow = await (t || db).one(
            `UPDATE
                    building_user_attributes
                SET
                    $1:raw
                WHERE
                    building_id = $2
                    AND user_id = $3
                RETURNING
                    *
                ;`,
            [sets, buildingId, userId]
        );

        delete buildingUserRow.building_id;
        delete buildingUserRow.user_id;

        return buildingUserRow;
    } catch(error) {
        throw new DatabaseError(error);
    }
}

async function buildingExists(buildingId: number, t?: ITask<any>) {
    return (
        await (t || db).oneOrNone(
            'SELECT building_id FROM buildings WHERE building_id = $1',
            [buildingId]
        )
    ) !== null;
}

function makeDefaultUserData() {
    return _.mapValues(buildingUserAttributesConfig, () => null);
}

export async function getBuildingUserData(
    buildingId: number,
    userId: string,
    lockForUpdate: boolean = false,
    t?: ITask<any>
): Promise<BuildingUserAttributes> {
    try {
        const buildingUserRow = await (t || db).oneOrNone(
            `SELECT
                *
            FROM building_user_attributes
            WHERE
                building_id = $1
                AND user_id = $2
            ${lockForUpdate ? ' FOR UPDATE' : ''};
            `,
            [buildingId, userId]
        );

        if(buildingUserRow) {
            delete buildingUserRow.building_id;
            delete buildingUserRow.user_id;
    
            return buildingUserRow;
        } else {
            if(await buildingExists(buildingId, t)) {
                return makeDefaultUserData();
            } else {
                throw new ArgumentError(`Building ID ${buildingId} does not exist`, 'buildingId');
            }
        }

    } catch(error) {
        if(error instanceof ArgumentError) {
            throw error;
        }
        throw new DatabaseError(error);
    }
}