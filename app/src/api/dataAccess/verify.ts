import db from '../../db';
import { DatabaseError, InvalidOperationError } from '../errors/general';


export async function getBuildingVerifiedAttributes(buildingId: number): Promise<any[]> {
    try {
        return await (db).manyOrNone(
            `SELECT
                attribute,
                verified_value
            FROM
                building_verification
            WHERE
                building_id = $1;
            `,
            [buildingId]
        );
    } catch(error) {
        throw new DatabaseError(error.detail);
    }
}

export async function getBuildingUserVerifiedAttributes(buildingId: number, userId: string): Promise<any> {
    try {
        const verifications = await (db).manyOrNone(
            `SELECT
                attribute,
                verified_value,
                date_trunc('minute', verification_timestamp) as verification_timestamp
            FROM
                building_verification
            WHERE
                building_id = $1
                AND user_id = $2;
            `,
            [buildingId, userId]
        );
        return asVerified(verifications)
    } catch(error) {
        throw new DatabaseError(error.detail);
    }
}

function asVerified(verifications){
    const user_verified = {};
    for (const item of verifications) {
        user_verified[item.attribute] = item.verified_value
    }
    return user_verified;
}

export async function updateBuildingUserVerifiedAttribute(buildingId: number, userId: string, attribute: string, value: any): Promise<void> {
    console.log(typeof value, value)
    try {
        if (typeof value === 'string'){
            // cast strings to text explicitly - otherwise Postgres fails to cast to jsonb directly
            await (db).none(
                `INSERT INTO
                    building_verification
                    ( building_id, user_id, attribute, verified_value )
                VALUES
                    ($1, $2, $3, to_jsonb($4::text));
                `,
                [buildingId, userId, attribute, value]
            );
        } else {
            await (db).none(
                `INSERT INTO
                    building_verification
                    ( building_id, user_id, attribute, verified_value )
                VALUES
                    ($1, $2, $3, to_jsonb($4));
                `,
                [buildingId, userId, attribute, value]
            );
        }
    } catch(error) {
        console.error(error)
        if(error.detail?.includes('already exists')) {
            const msg = 'User already verified that attribute for this building'
            throw new InvalidOperationError(msg);
        } else {
            throw new DatabaseError(error.detail);
        }
    }
}

export async function removeBuildingUserVerifiedAttribute(buildingId: number, userId: string, attribute: string) : Promise<null> {
    try {
        return await (db).none(
            `DELETE FROM
                building_verification
            WHERE
                building_id = $1
                AND user_id = $2
                AND attribute = $3;
            `,
            [buildingId, userId, attribute]
        );
    } catch(error) {
        throw new DatabaseError(error.detail);
    }
}