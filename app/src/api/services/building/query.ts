import db from '../../../db';

export async function queryBuildingsAtPoint(lng: number, lat: number) {
    try {
        return await db.manyOrNone(
            `SELECT b.*
            FROM buildings as b, geometries as g
            WHERE
                b.geometry_id = g.geometry_id
            AND
                b.latest_demolish_date IS NULL
            AND
                ST_Intersects(
                    ST_Transform(
                        ST_SetSRID(ST_Point($1, $2), 4326),
                        3857
                    ),
                    geometry_geom
                )
            `,
            [lng, lat]
        );
    } catch(error) {
        console.error(error);
        return undefined;
    }
}

export async function queryBuildingsByReference(key: string, ref: string) {
    try {
        if (key === 'toid') {
            return await db.manyOrNone(
                `SELECT
                    *
                FROM
                    buildings
                WHERE
                    ref_toid = $1
                `,
                [ref]
            );
        } else if (key === 'uprn') {
            return await db.manyOrNone(
                `SELECT
                    b.*
                FROM
                    buildings as b, building_properties as p
                WHERE
                    b.building_id = p.building_id
                AND
                    b.latest_demolish_date IS NULL
                AND
                    p.uprn = $1
                `,
                [ref]
            );
        } else {
            return { error: 'Key must be UPRN or TOID' };
        }
    } catch(err) {
        console.error(err);
        return undefined;
    }
}
