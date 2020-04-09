import { strictParseInt } from "../parse";

import { DataConfig } from "./types";

const BUILDING_LAYER_DEFINITIONS = {
    base_light: `(
        SELECT
            b.location_number as location_number,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`,
    base_night: `(
        SELECT
            b.location_number as location_number,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as outline`,
    date_year: `(
        SELECT
            b.date_year as date_year,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as date_year`,
    size_storeys: `(
        SELECT
            (
                coalesce(b.size_storeys_attic, 0) +
                coalesce(b.size_storeys_core, 0)
            ) as size_storeys,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as size_stories`,
    size_height: `(
        SELECT
            b.size_height_apex as size_height,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE g.geometry_id = b.geometry_id
    ) as size_height`,
    location: `(
        SELECT
            (
                case when b.location_name is null then 0 else 1 end +
                case when b.location_number is null then 0 else 1 end +
                case when b.location_street is null then 0 else 1 end +
                case when b.location_line_two is null then 0 else 1 end +
                case when b.location_town is null then 0 else 1 end +
                case when b.location_postcode is null then 0 else 1 end +
                case when b.location_latitude is null then 0 else 1 end +
                case when b.location_longitude is null then 0 else 1 end +
                case when b.ref_toid is null then 0 else 1 end +
                case when b.ref_osm_id is null then 0 else 1 end
            ) as location_info_count,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as location`,
    likes: `(
        SELECT
            g.geometry_geom,
            b.likes_total as likes
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
            AND b.likes_total > 0
    ) as likes`,
    planning_combined: `(
        SELECT
            g.geometry_geom,
            (
                CASE
                    WHEN b.planning_list_cat = 'Listed Building' and b.planning_list_grade = 'I' THEN 'Grade I Listed'
                    WHEN b.planning_list_cat = 'Listed Building' and b.planning_list_grade = 'II*' THEN 'Grade II* Listed'
                    WHEN b.planning_list_cat = 'Listed Building' and b.planning_list_grade = 'II' THEN 'Grade II Listed'
                    WHEN b.planning_in_local_list THEN 'Locally Listed'
                    ELSE 'None'
                END
            ) as listing_type,
            b.planning_in_conservation_area
        FROM geometries as g
        JOIN buildings as b
        ON g.geometry_id = b.geometry_id
        WHERE
            b.planning_in_conservation_area
            OR b.planning_in_local_list
            OR b.planning_list_cat is not null
    ) as planning_combined`, 
    conservation_area: `(
        SELECT
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
            AND b.planning_in_conservation_area = true
    ) as conservation_area`,
    sust_dec: `(
        SELECT
            b.sust_dec::text as sust_dec,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as sust_dec`,
    building_attachment_form: `(
        SELECT
            b.building_attachment_form::text as building_attachment_form,
            g.geometry_geom
        FROM
            geometries as g,
            buildings as b
        WHERE
            g.geometry_id = b.geometry_id
    ) as building_attachment_form`,
    landuse: `(
        SELECT
            b.current_landuse_order,
            g.geometry_geom
        FROM geometries as g
        JOIN buildings as b
        ON g.geometry_id = b.geometry_id
    ) as current_landuse_order`,
};

const GEOMETRY_FIELD = 'geometry_geom';

function getBuildingLayerNames() {
    return Object.keys(BUILDING_LAYER_DEFINITIONS);
}

function getAllLayerNames() {
    return ['highlight', ...getBuildingLayerNames()];
}

function getBuildingsDataConfig(tileset: string, dataParams: any): DataConfig {
    const table = BUILDING_LAYER_DEFINITIONS[tileset];

    if(table == undefined) {
        throw new Error('Invalid tileset requested');
    }

    return {
        geometry_field: GEOMETRY_FIELD,
        table: table
    };
}

function getHighlightDataConfig(tileset: string, dataParams: any): DataConfig {
    let { highlight, base } = dataParams;

    highlight = strictParseInt(highlight);
    base = base || 'default';

    if(isNaN(highlight) || base.match(/^\w+$/) == undefined) {
        throw new Error('Bad parameters for highlight layer');
    }

    return {
        geometry_field: GEOMETRY_FIELD,
        table: `(
            SELECT
                g.geometry_geom,
                '${base}' as base_layer
            FROM
                geometries as g
            WHERE
                g.geometry_id = ${highlight}
        ) as highlight`
    };
}

export {
    getBuildingLayerNames,
    getAllLayerNames,
    getBuildingsDataConfig,
    getHighlightDataConfig
};
