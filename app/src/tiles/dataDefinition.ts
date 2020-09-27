import { strictParseInt } from "../parse";

import { DataConfig } from "./types";

const BUILDING_LAYER_DEFINITIONS = {
    base_light: `
        SELECT
            geometry_id,
            location_number
        FROM
            buildings`,
    base_night: `
        SELECT
            geometry_id,
            location_number
        FROM
            buildings`,
    date_year: `
        SELECT
            geometry_id,
            date_year
        FROM
            buildings
        WHERE date_year IS NOT NULL`,
    size_storeys: `
        SELECT
            geometry_id,
            (
                coalesce(size_storeys_attic, 0) +
                coalesce(size_storeys_core, 0)
            ) AS size_storeys
        FROM
            buildings
        WHERE
            size_storeys_attic IS NOT NULL OR size_storeys_core IS NOT NULL`,
    size_height: `
        SELECT
            geometry_id,
            size_height_apex AS size_height
        FROM
            buildings
        WHERE
            size_height_apex IS NOT NULL`,
    construction_core_material: `
        SELECT
            geometry_id,
            construction_core_material::text AS construction_core_material
        FROM
            buildings
        WHERE
            construction_core_material IS NOT NULL`,
    location: `
        SELECT
            geometry_id,
            (
                case when location_name IS NULL then 0 else 1 end +
                case when location_number IS NULL then 0 else 1 end +
                case when location_street IS NULL then 0 else 1 end +
                case when location_line_two IS NULL then 0 else 1 end +
                case when location_town IS NULL then 0 else 1 end +
                case when location_postcode IS NULL then 0 else 1 end +
                case when location_latitude IS NULL then 0 else 1 end +
                case when location_longitude IS NULL then 0 else 1 end +
                case when ref_toid IS NULL then 0 else 1 end +
                case when ref_osm_id IS NULL then 0 else 1 end
            ) AS location_info_count
        FROM
            buildings`,
    likes: `
        SELECT
            geometry_id,
            likes_total AS likes
        FROM
            buildings
        WHERE
            likes_total > 0`,
    planning_combined: `
        SELECT
            geometry_id,
            (
                CASE
                    WHEN planning_list_cat = 'Listed Building' and planning_list_grade = 'I' THEN 'Grade I Listed'
                    WHEN planning_list_cat = 'Listed Building' and planning_list_grade = 'II*' THEN 'Grade II* Listed'
                    WHEN planning_list_cat = 'Listed Building' and planning_list_grade = 'II' THEN 'Grade II Listed'
                    WHEN planning_in_local_list THEN 'Locally Listed'
                    ELSE 'None'
                END
            ) AS listing_type,
            planning_in_conservation_area
        FROM buildings
        WHERE
            planning_in_conservation_area
            OR planning_in_local_list
            OR planning_list_cat IS NOT NULL`,
    conservation_area: `
        SELECT
            geometry_id
        FROM
            buildings
        WHERE
            planning_in_conservation_area = true`,
    sust_dec: `
        SELECT
            geometry_id,
            sust_dec::text AS sust_dec
        FROM
            buildings
        WHERE
            sust_dec IS NOT NULL`,
    building_attachment_form: `
        SELECT
            geometry_id,
            building_attachment_form::text AS building_attachment_form
        FROM
            buildings
        WHERE
            building_attachment_form IS NOT NULL`,
    landuse: `
        SELECT
            geometry_id,
            current_landuse_order
        FROM
            buildings
        WHERE
            current_landuse_order IS NOT NULL`,
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

    const query = `(
        SELECT
            d.*,
            g.geometry_geom
        FROM (
            ${table}
        ) AS d
        JOIN
            geometries AS g
        ON d.geometry_id = g.geometry_id
    ) AS data
    `;

    return {
        geometry_field: GEOMETRY_FIELD,
        table: query
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
                '${base}' AS base_layer
            FROM
                geometries AS g
            WHERE
                g.geometry_id = ${highlight}
        ) AS highlight`
    };
}

export {
    getBuildingLayerNames,
    getAllLayerNames,
    getBuildingsDataConfig,
    getHighlightDataConfig
};
