import { strictParseInt } from "../parse";

import { DataConfig } from "./types";

const LAYER_QUERIES = {
    base_light: `
        SELECT
            geometry
        FROM
            map_data`,
    base_night: `
        SELECT
            geometry
        FROM
            map_data`,
    number_labels:`
        SELECT
            geometry,
            location_number
        FROM
            map_data`,
    highlight: `
        SELECT
            geometry
        FROM
            map_data
        WHERE building_id = !@highlight!`,
    date_year: `
        SELECT
            geometry,
            date_year
        FROM
            map_data
        WHERE date_year IS NOT NULL`,
    size_storeys: `
        SELECT
            geometry,
            (
                coalesce(size_storeys_attic, 0) +
                coalesce(size_storeys_core, 0)
            ) AS size_storeys
        FROM
            map_data
        WHERE
            size_storeys_attic IS NOT NULL OR size_storeys_core IS NOT NULL`,
    size_height: `
        SELECT
            geometry,
            size_height_apex AS size_height
        FROM
            map_data
        WHERE
            size_height_apex IS NOT NULL`,
    construction_core_material: `
        SELECT
            geometry,
            construction_core_material::text AS construction_core_material
        FROM
            map_data
        WHERE
            construction_core_material IS NOT NULL`,
    location: `
        SELECT
            geometry,
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
            map_data`,
    likes: `
        SELECT
            geometry,
            likes_total AS likes
        FROM
            map_data
        WHERE
            likes_total > 0`,
    planning_combined: `
        SELECT
            geometry,
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
        FROM map_data
        WHERE
            planning_in_conservation_area
            OR planning_in_local_list
            OR planning_list_cat IS NOT NULL`,
    conservation_area: `
        SELECT
            geometry
        FROM
            map_data
        WHERE
            planning_in_conservation_area = true`,
    sust_dec: `
        SELECT
            geometry,
            sust_dec::text AS sust_dec
        FROM
            map_data
        WHERE
            sust_dec IS NOT NULL`,
    building_attachment_form: `
        SELECT
            geometry,
            building_attachment_form::text AS building_attachment_form
        FROM
            map_data
        WHERE
            building_attachment_form IS NOT NULL`,
    landuse: `
        SELECT
            geometry,
            current_landuse_order
        FROM
            map_data
        WHERE
            current_landuse_order IS NOT NULL`,
};

function getBuildingLayerNames() {
    return Object.keys(LAYER_QUERIES);
}

function getAllLayerNames() {
    return ['highlight', ...getBuildingLayerNames()];
}

function getDataConfig(tileset: string): DataConfig {
    const table = LAYER_QUERIES[tileset];

    if(table == undefined) {
        throw new Error('Invalid tileset requested');
    }

    return {
        geometry_field: 'geometry',
        table: `(${table}) AS data`
    };
}

function getLayerVariables(tileset: string, dataParams: any): object {
    if(tileset == 'highlight') {
        let { highlight, base } = dataParams;

        highlight = strictParseInt(highlight);
        base = base || 'default';

        if(isNaN(highlight) || base.match(/^\w+$/) == undefined) {
            throw new Error('Bad parameters for highlight layer');
        }

        return {
            highlight,
            base_data_layer: base
        };
    }

    return {};
}

export {
    getBuildingLayerNames,
    getAllLayerNames,
    getDataConfig,
    getLayerVariables
};
