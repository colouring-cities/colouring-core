/**
 * Building data access
 *
 */
import db from '../db';
import { removeAllAtBbox } from '../tiles/cache';

// data type note: PostgreSQL bigint (64-bit) is handled as string in JavaScript, because of
// JavaScript numerics are 64-bit double, giving only partial coverage.

const TransactionMode = db.$config.pgp.txMode.TransactionMode;
const isolationLevel = db.$config.pgp.txMode.isolationLevel;

// Create a transaction mode (serializable, read-write):
const serializable = new TransactionMode({
    tiLevel: isolationLevel.serializable,
    readOnly: false
});

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
    ).catch(function (error) {
        console.error(error);
        return undefined;
    });
}

function queryBuildingsByReference(key, id) {
    if (key === 'toid') {
        return db.manyOrNone(
            `SELECT
                *
            FROM
                buildings
            WHERE
                ref_toid = $1
            `,
            [id]
        ).catch(function (error) {
            console.error(error);
            return undefined;
        });
    }
    if (key === 'uprn') {
        return db.manyOrNone(
            `SELECT
                b.*
            FROM
                buildings as b, building_properties as p
            WHERE
                b.building_id = p.building_id
            AND
                p.uprn = $1
            `,
            [id]
        ).catch(function (error) {
            console.error(error);
            return undefined;
        });
    }
    return { error: 'Key must be UPRN or TOID' };
}

function getBuildingById(id) {
    return db.one(
        'SELECT * FROM buildings WHERE building_id = $1',
        [id]
    ).catch(function (error) {
        console.error(error);
        return undefined;
    });
}

function getBuildingLikeById(buildingId, userId) {
    return db.oneOrNone(
        'SELECT true as like FROM building_user_likes WHERE building_id = $1 and user_id = $2 LIMIT 1',
        [buildingId, userId]
    ).then(res => {
        return res && res.like
    }).catch(function (error) {
        console.error(error);
        return undefined;
    });
}

function getBuildingUPRNsById(id) {
    return db.any(
        'SELECT uprn, parent_uprn FROM building_properties WHERE building_id = $1',
        [id]
    ).catch(function (error) {
        console.error(error);
        return undefined;
    });
}

function saveBuilding(buildingId, building, userId) {
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
            'SELECT * FROM buildings WHERE building_id = $1 FOR UPDATE;',
            [buildingId]
        ).then(oldBuilding => {
            const patches = compare(oldBuilding, building, BUILDING_FIELD_WHITELIST);
            console.log('Patching', buildingId, patches)
            const forward = patches[0];
            const reverse = patches[1];
            if (Object.keys(forward).length === 0) {
                return Promise.reject('No change provided')
            }
            return t.one(
                `INSERT INTO logs (
                    forward_patch, reverse_patch, building_id, user_id
                ) VALUES (
                    $1:json, $2:json, $3, $4
                ) RETURNING log_id
                `,
                [forward, reverse, buildingId, userId]
            ).then(revision => {
                const sets = db.$config.pgp.helpers.sets(forward);
                console.log('Setting', buildingId, sets)
                return t.one(
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
                    [revision.log_id, sets, buildingId]
                ).then((data) => {
                    expireBuildingTileCache(buildingId)
                    return data
                })
            });
        });
    }).catch(function (error) {
        console.error(error);
        return { error: error };
    });
}

function likeBuilding(buildingId, userId) {
    // start transaction around save operation
    // - insert building-user like
    // - count total likes
    // - insert changeset
    // - update building to latest state
    // commit or rollback (serializable - could be more compact?)
    return db.tx({ serializable }, t => {
        return t.none(
            'INSERT INTO building_user_likes ( building_id, user_id ) VALUES ($1, $2);',
            [buildingId, userId]
        ).then(() => {
            return t.one(
                'SELECT count(*) as likes FROM building_user_likes WHERE building_id = $1;',
                [buildingId]
            ).then(building => {
                return t.one(
                    `INSERT INTO logs (
                        forward_patch, building_id, user_id
                    ) VALUES (
                        $1:json, $2, $3
                    ) RETURNING log_id
                    `,
                    [{ likes_total: building.likes }, buildingId, userId]
                ).then(revision => {
                    return t.one(
                        `UPDATE buildings
                        SET
                            revision_id = $1,
                            likes_total = $2
                        WHERE
                            building_id = $3
                        RETURNING
                            *
                        `,
                        [revision.log_id, building.likes, buildingId]
                    ).then((data) => {
                        expireBuildingTileCache(buildingId)
                        return data
                    })
                })
            });
        });
    }).catch(function (error) {
        console.error(error);
        if (error.detail && error.detail.includes('already exists')) {
            // 'already exists' is thrown if user already liked it
            return { error: 'It looks like you already like that building!' };
        } else {
            return undefined
        }
    });
}

function unlikeBuilding(buildingId, userId) {
    // start transaction around save operation
    // - insert building-user like
    // - count total likes
    // - insert changeset
    // - update building to latest state
    // commit or rollback (serializable - could be more compact?)
    return db.tx({ serializable }, t => {
        return t.none(
            'DELETE FROM building_user_likes WHERE building_id = $1 AND user_id = $2;',
            [buildingId, userId]
        ).then(() => {
            return t.one(
                'SELECT count(*) as likes FROM building_user_likes WHERE building_id = $1;',
                [buildingId]
            ).then(building => {
                return t.one(
                    `INSERT INTO logs (
                        forward_patch, building_id, user_id
                    ) VALUES (
                        $1:json, $2, $3
                    ) RETURNING log_id
                    `,
                    [{ likes_total: building.likes }, buildingId, userId]
                ).then(revision => {
                    return t.one(
                        `UPDATE buildings
                        SET
                            revision_id = $1,
                            likes_total = $2
                        WHERE
                            building_id = $3
                        RETURNING
                            *
                        `,
                        [revision.log_id, building.likes, buildingId]
                    ).then((data) => {
                        expireBuildingTileCache(buildingId)
                        return data
                    })
                })
            });
        });
    }).catch(function (error) {
        console.error(error);
        if (error.detail && error.detail.includes('already exists')) {
            // 'already exists' is thrown if user already liked it
            return { error: 'It looks like you already like that building!' };
        } else {
            return undefined
        }
    });
}

function privateQueryBuildingBBOX(buildingId){
    return db.one(
        `SELECT
            ST_XMin(envelope) as xmin,
            ST_YMin(envelope) as ymin,
            ST_XMax(envelope) as xmax,
            ST_YMax(envelope) as ymax
        FROM (
            SELECT
                ST_Envelope(g.geometry_geom) as envelope
            FROM buildings as b, geometries as g
            WHERE
                b.geometry_id = g.geometry_id
            AND
                b.building_id = $1
        ) as envelope`,
        [buildingId]
    )
}

function expireBuildingTileCache(buildingId) {
    privateQueryBuildingBBOX(buildingId).then((bbox) => {
        const buildingBbox = [bbox.xmax, bbox.ymax, bbox.xmin, bbox.ymin]
        removeAllAtBbox(buildingBbox);
    })
}

const BUILDING_FIELD_WHITELIST = new Set([
    'ref_osm_id',
    // 'location_name',
    'location_number',
    // 'location_street',
    // 'location_line_two',
    'location_town',
    'location_postcode',
    'location_latitude',
    'location_longitude',
    'date_year',
    'date_lower',
    'date_upper',
    'date_source',
    'date_source_detail',
    'date_link',
    'facade_year',
    'facade_upper',
    'facade_lower',
    'facade_source',
    'facade_source_detail',
    'size_storeys_attic',
    'size_storeys_core',
    'size_storeys_basement',
    'size_height_apex',
    'size_floor_area_ground',
    'size_floor_area_total',
    'size_width_frontage',
    'planning_portal_link',
    'planning_in_conservation_area',
    'planning_conservation_area_name',
    'planning_in_list',
    'planning_list_id',
    'planning_list_cat',
    'planning_list_grade',
    'planning_heritage_at_risk_id',
    'planning_world_list_id',
    'planning_in_glher',
    'planning_glher_url',
    'planning_in_apa',
    'planning_apa_name',
    'planning_apa_tier',
    'planning_in_local_list',
    'planning_local_list_url',
    'planning_in_historic_area_assessment',
    'planning_historic_area_assessment_url',
]);

/**
 * Compare old and new data objects, generate shallow merge patch of changed fields
 * - forward patch is object with {keys: new_values}
 * - reverse patch is object with {keys: old_values}
 *
 * @param {object} oldObj
 * @param {object} newObj
 * @param {Set} whitelist
 * @returns {[object, object]}
 */
function compare(oldObj, newObj, whitelist) {
    const reverse = {}
    const forward = {}
    for (const [key, value] of Object.entries(newObj)) {
        if (oldObj[key] !== value && whitelist.has(key)) {
            reverse[key] = oldObj[key];
            forward[key] = value;
        }
    }
    return [forward, reverse]
}

export {
    queryBuildingsAtPoint,
    queryBuildingsByReference,
    getBuildingById,
    getBuildingLikeById,
    getBuildingUPRNsById,
    saveBuilding,
    likeBuilding,
    unlikeBuilding
};
