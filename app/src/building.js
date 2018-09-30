import { compare, deepClone } from 'fast-json-patch'

import db from './db';
// data type note: PostgreSQL bigint (64-bit) is handled as string in JavaScript, because of
// JavaScript numerics are 64-bit double, giving only partial coverage.

function queryBuildingsAtPoint(lng, lat) {
    return db.manyOrNone(
        `SELECT b.*
        FROM buildings as b, geometries as g
        WHERE
            b.geometry_id = g.geometry_id
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
    ).catch(function(error){
        console.error(error);
        return undefined;
    });
}
function queryBuildingsByReference(key, id) {
    if (key === 'toid'){
        return db.manyOrNone(
            "SELECT * FROM buildings WHERE b.ref_toid = $1",
            [id]
        ).catch(function(error){
            console.error(error);
            return undefined;
        });
    }
    if (key === 'uprn') {
        return db.manyOrNone(
            `SELECT b.*
            FROM buildings as b, building_properties as p
            WHERE
                b.building_id = p.building_id
            AND
                p.uprn = $1
            `,
            [id]
        ).catch(function(error){
            console.error(error);
            return undefined;
        });
    }
    return {error: 'Key must be UPRN or TOID'};
}

function getBuildingById(id) {
    return db.one(
        "SELECT * FROM buildings WHERE building_id = $1",
        [id]
    ).catch(function(error){
        console.error(error);
        return undefined;
    });
}

function saveBuilding(building_id, building, user_id) {
    // save building must fail if the revision seen by the user != the latest revision
    // - any 'intuitive' retries to be handled by clients of this code
    // revision id allows for a long user 'think time' between view-building, update-building
    // (optimistic locking implemented using field-based row versioning)
    const previous_revision_id = building.revision_id;

    // remove read-only fields from consideration
    delete building.building_id;
    delete building.revision_id;
    delete building.geometry_id;

    // start transaction around save operation
    // - select and compare to identify changeset
    // - insert changeset
    // - update to latest state
    // commit or rollback (repeated-read sufficient? or serializable?)
    return db.tx(t => {
        return t.one(
            "SELECT * FOR UPDATE FROM buildings WHERE building_id = $1 and revision_id = $2;",
            [building_id, previous_revision_id]
        ).then(old_building => {
            // full new building (possibly a subset of keys were sent as building)
            const new_building = Object.assign(deepClone(old_building), building);
            // uses JSON Patch (see RFC6902) to identify forward- and reverse- changesets
            const patch = compare(old_building, new_building);
            const reverse = compare(new_building, old_building);
            return t.one(
                `INSERT INTO logs (
                    forward_patch, reverse_patch, building_id, user_id
                ) VALUES (
                    $1:jsonb, $2:jsonb, $3, $4
                ) RETURNING log_id
                `,
                [patch, reverse, building_id, user_id]
            ).then(revision => {
                const sets = db.$config.pgp.helpers.sets(building);
                return t.one(
                    `UPDATE
                        buildings
                    SET
                        revision_id = $1,
                        $2:raw
                    WHERE
                        building_id = $3 AND revision_id = $4
                    RETURNING
                        *
                    `,
                    [revision.log_id, sets, building_id, previous_revision_id]
                )
            });
        });
    }).catch(function(error){
        // TODO report transaction error as 'Need to re-fetch building before update'
        console.error(error);
        return undefined;
    });
}

export { queryBuildingsAtPoint, queryBuildingsByReference, getBuildingById, saveBuilding };
