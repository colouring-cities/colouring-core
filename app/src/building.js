import { query } from './db';

function queryBuildingsAtPoint(lng, lat) {
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
        `,
        [lng, lat]
    ).then(buildingRowsToDocs).catch(function(error){
        console.error(error);
        return undefined;
    });
}
function queryBuildingsByReference(key, id) {
    if (key === 'toid'){
        return query(
            `SELECT
            b.building_id as id,
            b.building_doc as doc,
            g.geometry_id as geometry_id
            FROM buildings as b, geometries as g
            WHERE
            b.geometry_id = g.geometry_id
            AND
            b.ref_toid = $1
            `,
            [id]
        ).then(buildingRowsToDocs).catch(function(error){
            console.error(error);
            return undefined;
        });
    }
    if (key === 'uprn') {
        return query(
            `SELECT
            b.building_id as id,
            b.building_doc as doc,
            g.geometry_id as geometry_id
            FROM buildings as b, geometries as g
            WHERE
            b.geometry_id = g.geometry_id
            AND
            b.ref_uprn = $1
            `,
            [id]
        ).then(buildingRowsToDocs).catch(function(error){
            console.error(error);
            return undefined;
        });
    }
    return {error: 'Key must be UPRN or TOID'};
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
    ).then(buildingRowsToDocs).catch(function(error){
        console.error(error);
        return undefined;
    });
}

function buildingRowsToDocs(data){
    const rows = data.rows
    const data = rows.map(function(row){
        const id = row.id
        const doc = row.doc
        const geometry_id = row.geometry_id

        doc.id = id
        doc.geometry_id = geometry_id
        return doc
    });
    return data;
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

export { queryBuildingsAtPoint, queryBuildingsByReference, getBuildingById, saveBuilding };
