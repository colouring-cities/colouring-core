import { strictParseInt } from "../parse";

import { DataConfig } from "./types";

const LAYER_QUERIES = {
    base_light: `
        SELECT
            geometry_id
        FROM
            buildings`,
    base_night: `
        SELECT
            geometry_id
        FROM
            buildings`,
    base_night_outlines: `
        SELECT
            geometry_id
        FROM
            buildings`,
    base_boroughs: `
        SELECT
            geometry_id,
            name
        FROM
            external_data_borough_boundary`,
    number_labels:`
        SELECT
            geometry_id,
            location_number
        FROM
            buildings`,
    highlight: `
        SELECT
            geometry_id
        FROM
            buildings
        WHERE building_id = !@highlight!`,
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
        SELECT blds_with_data.* 
        FROM (
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
                    buildings
            ) AS blds_with_data
        WHERE blds_with_data.location_info_count > 0`,
    team: `
        SELECT blds_with_data.* 
        FROM (
            SELECT
                    geometry_id,
                    (
                        case when has_extension IS NULL then 0 else 1 end +
                        case when extension_year IS NULL then 0 else 1 end +
                        case when developer_type IS NULL then 0 else 1 end +
                        case when developer_name IS NULL then 0 else 1 end +
                        case when developer_source_link IS NULL then 0 else 1 end +
                        case when designers IS NULL then 0 else 1 end +
                        case when designers_source_link IS NULL then 0 else 1 end +
                        case when lead_designer_type IS NULL then 0 else 1 end +
                        case when designer_awards IS NULL then 0 else 1 end +
                        case when awards_source_link IS NULL then 0 else 1 end +
                        case when builder IS NULL then 0 else 1 end +
                        case when builder_source_link IS NULL then 0 else 1 end +
                        case when other_team IS NULL then 0 else 1 end +
                        case when other_team_source_link IS NULL then 0 else 1 end +
                        case when date_year IS NULL then 0 else 1 end
                    ) AS team_info_count
                FROM
                    buildings
            ) AS blds_with_data
        WHERE blds_with_data.team_info_count > 0`,
    is_domestic: `
        SELECT
            geometry_id,
            is_domestic
        FROM
            buildings
        WHERE
            is_domestic IS NOT NULL`,
    survival_status: `
        SELECT
            geometry_id,
            survival_status
        FROM
            buildings
        WHERE
        survival_status IS NOT NULL`,
    survival_source: `
        SELECT
            geometry_id,
            survival_source
        FROM
            buildings
        WHERE
        survival_source IS NOT NULL`,
    likes: `
        SELECT
            geometry_id,
            likes_total AS likes
        FROM
            buildings
        WHERE
            is_domestic <> 'yes'
            AND
            likes_total > 0`,
    typology_likes: `
        SELECT
            geometry_id,
            community_type_worth_keeping_total AS likes
        FROM
            buildings
        WHERE
            community_type_worth_keeping_total > 0`,
    community_local_significance_total: `
        SELECT
            geometry_id,
            community_local_significance_total
        FROM
            buildings
        WHERE
            community_local_significance_total > 0
    `,
    community_expected_planning_application_total: `
        SELECT
            geometry_id,
            community_expected_planning_application_total
        FROM
            buildings
        WHERE
        community_expected_planning_application_total > 0
    `,
    community_in_public_ownership: `
        SELECT
            geometry_id,
            CASE
                WHEN community_public_ownership = 'Not in public/community ownership' THEN false
                ELSE true
            END AS in_public_ownership
        FROM
            buildings
        WHERE
            community_public_ownership IS NOT NULL
    `,
    planning_applications_status_all: `SELECT 
        buildings.geometry_id, building_properties.uprn, building_properties.building_id, planning_data.status AS status, planning_data.uprn
        FROM building_properties
        INNER JOIN planning_data ON building_properties.uprn = planning_data.uprn
        INNER JOIN buildings ON building_properties.building_id = buildings.building_id`,
    planning_applications_status_recent: `SELECT 
        buildings.geometry_id, building_properties.uprn, building_properties.building_id, planning_data.status AS status, planning_data.uprn, 
        planning_data.days_since_decision_date_cached AS days_since_decision_date,
        planning_data.days_since_registration_cached AS days_since_registered_with_local_authority_date
        FROM building_properties
        INNER JOIN planning_data ON building_properties.uprn = planning_data.uprn
        INNER JOIN buildings ON building_properties.building_id = buildings.building_id`,
    planning_applications_status_very_recent: `SELECT 
        buildings.geometry_id, building_properties.uprn, building_properties.building_id, planning_data.status AS status, planning_data.uprn, 
        planning_data.days_since_decision_date_cached AS days_since_decision_date,
        planning_data.days_since_registration_cached AS days_since_registered_with_local_authority_date
        FROM building_properties
        INNER JOIN planning_data ON building_properties.uprn = planning_data.uprn
        INNER JOIN buildings ON building_properties.building_id = buildings.building_id`,
    planning_combined: `
        SELECT
            geometry_id,
            (
                CASE
                    WHEN planning_list_grade = 'I' THEN 'Grade I Listed'
                    WHEN planning_list_grade = 'II*' THEN 'Grade II* Listed'
                    WHEN planning_list_grade = 'II' THEN 'Grade II Listed'
                    WHEN planning_local_list_url <> '' THEN 'Locally Listed'
                    WHEN planning_heritage_at_risk_url <> '' THEN 'Heritage at Risk'
                    WHEN planning_world_list_id IS NOT NULL THEN 'In World Heritage Site'
                    WHEN planning_in_apa_url <> '' THEN 'In Archaeological Priority Area'
                    ELSE 'None'
                END
            ) AS listing_type,
            planning_in_conservation_area_url <> '' AS planning_in_conservation_area
        FROM buildings
        WHERE
            planning_list_grade IS NOT NULL
            OR planning_in_conservation_area_url <> ''
            OR planning_local_list_url <> ''
            OR planning_world_list_id IS NOT NULL
            OR planning_heritage_at_risk_url <> ''
            OR planning_in_apa_url <> ''
            `,
    conservation_area: `
        SELECT
            geometry_id
        FROM
            buildings
        WHERE
            planning_in_conservation_area_url = true`,
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
            current_landuse_order,
            current_landuse_group[1] as current_landuse_group,
            current_landuse_verified
        FROM
            buildings
        WHERE
            current_landuse_order IS NOT NULL`,
    disaster_severity: `
        SELECT
            geometry_id,
            disaster_severity
        FROM
            buildings
        WHERE disaster_severity IS NOT NULL`,
    dynamics_demolished_count: `
        SELECT
            geometry_id,
            jsonb_array_length(demolished_buildings) as demolished_buildings_count,
            dynamics_has_demolished_buildings
        FROM
            buildings
        WHERE jsonb_array_length(demolished_buildings) > 0 OR dynamics_has_demolished_buildings = FALSE`,
};

const GEOMETRY_FIELD = 'geometry_geom';

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
    
    if(tileset == 'base_boroughs') {
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
        JOIN
            external_data_borough_boundary AS b
        ON d.geometry_id = b.geometry_id
    ) AS data
        `;
    
        return {
            geometry_field: GEOMETRY_FIELD,
            table: query
        };    
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
        JOIN
            buildings AS b
        ON d.geometry_id = b.geometry_id
        WHERE
            b.latest_demolish_date IS NULL
    ) AS data
    `;

    return {
        geometry_field: GEOMETRY_FIELD,
        table: query
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
