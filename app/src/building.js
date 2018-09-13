import { query } from './db';

function queryBuildingAtPoint(lng, lat) {
    return query(
        `SELECT
        b.building_id as id,
        b.building_doc as doc,
        g.geometry_id as geometry_id
        FROM buildings as b, geometries as g
        WHERE
        b.geometry_id = g.geometry_id
        AND
        ST_Intersects(
            ST_Transform(
                ST_SetSRID(ST_Point($1, $2), 4326),
                3857
            ),
            g.geometry_geom
        )
        LIMIT 1
        `,
        [lng, lat]
    ).then(function(data){
        const rows = data.rows
        if (rows.length){
            const id = rows[0].id
            const doc = rows[0].doc
            const geometry_id = rows[0].geometry_id

            doc.id = id
            doc.geometry_id = geometry_id
            return doc
        }
        return undefined;
    }).catch(function(error){
        console.error(error);
        return undefined;
    });
}

function getBuildingById(id) {
    return query(
        `SELECT
            building_id as id,
            geometry_id,
            building_doc as doc
        FROM
            buildings
        WHERE
            building_id = $1
        `,
        [ id ]
    ).then(function(data){
        const rows = data.rows
        if (rows.length){
            const id = rows[0].id
            const doc = rows[0].doc
            const geometry_id = rows[0].geometry_id

            doc.id = id
            doc.geometry_id = geometry_id
            return doc
        }
        return undefined;
    }).catch(function(error){
        console.error(error);
        return undefined;
    });
}

function saveBuilding(id, building_doc) {
    // don't save id or geometry_id into doc
    delete building_doc.id;
    delete building_doc.geometry_id;

    return query(
        `UPDATE
            buildings
        SET
            building_doc = $2::jsonb
        WHERE
            building_id = $1
        `,
        [ id, building_doc ]
    ).catch(function(error){
        console.error(error);
        return undefined;
    });
}

export { queryBuildingAtPoint, getBuildingById, saveBuilding };
