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
    age_amalgamated: `
        SELECT
            geometry_id,
            COALESCE(date_year, date_year_inferred) AS date_year
        FROM
            buildings
        WHERE COALESCE(date_year, date_year_inferred) IS NOT NULL`,
    date_year: `
        SELECT
            geometry_id,
            date_year
        FROM
            buildings
        WHERE date_year IS NOT NULL`,
    age_inferred: `
        SELECT
            geometry_id,
            date_year_inferred AS date_year
        FROM
            buildings
        WHERE date_year_inferred IS NOT NULL`,
    date_year_completed: `
        SELECT
            geometry_id,
            date_year_completed
        FROM
            buildings
        WHERE date_year_completed IS NOT NULL`,
    cladding_year: `
        SELECT
            geometry_id,
            age_cladding_date::smallint AS date_year
        FROM
            buildings
        WHERE age_cladding_date IS NOT NULL`,
    extension_year: `
        SELECT
            geometry_id,
            age_extension_date::smallint AS date_year
        FROM
            buildings
        WHERE age_extension_date IS NOT NULL`,
    retrofit_year: `
        SELECT
            geometry_id,
            age_retrofit_date::smallint AS date_year
        FROM
            buildings
        WHERE age_retrofit_date IS NOT NULL`,
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
    size_total_floors: `
        SELECT
            geometry_id,
            (size_storeys_core + size_storeys_attic + size_storeys_basement) AS size_total_floors
        FROM
            buildings
        WHERE
            size_storeys_core IS NOT NULL 
            AND
            size_storeys_attic IS NOT NULL 
            AND
            size_storeys_basement IS NOT NULL`,
    size_storeys_basement: `
        SELECT
            geometry_id,
            size_storeys_basement AS size_storeys_basement
        FROM
            buildings
        WHERE
            size_storeys_basement IS NOT NULL
            AND
            size_storeys_basement != 0`,  
    size_floor_area_ground: `
        SELECT
            geometry_id,
            size_floor_area_ground AS size_floor_area_ground
        FROM
            buildings
        WHERE
            size_floor_area_ground IS NOT NULL
            AND
            size_floor_area_ground != 0`,           
    construction_core_material: `
        SELECT
            geometry_id,
            construction_core_material::text AS construction_core_material
        FROM
            buildings
        WHERE
            construction_core_material IS NOT NULL`,
    construction_structural_system: `
        SELECT
            geometry_id,
            construction_structural_system::text AS construction_structural_system
        FROM
            buildings
        WHERE
            construction_structural_system IS NOT NULL`,
    construction_foundation: `
        SELECT
            geometry_id,
            construction_foundation::text AS construction_foundation
        FROM
            buildings
        WHERE
            construction_foundation IS NOT NULL`,
    construction_roof_shape: `
        SELECT
            geometry_id,
            construction_roof_shape::text AS construction_roof_shape
        FROM
            buildings
        WHERE
            construction_roof_shape IS NOT NULL`,
    construction_roof_covering: `
        SELECT
            geometry_id,
            construction_roof_covering::text AS construction_roof_covering
        FROM
            buildings
        WHERE
            construction_roof_covering IS NOT NULL`,
    construction_material_window_frame: `
        SELECT
            geometry_id,
            construction_material_window_frame
        FROM
            buildings
        WHERE
            construction_material_window_frame IS NOT NULL`,
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
    community_building_hominess_count: `
        SELECT
            geometry_id,
            community_building_hominess_count
        FROM
            buildings
        WHERE
            community_building_hominess_count > 0
    `,
    community_building_coherence_count: `
        SELECT
            geometry_id,
            community_building_coherence_count
        FROM
            buildings
        WHERE
            community_building_coherence_count > 0
    `,
    community_building_fascination_count: `
        SELECT
            geometry_id,
            community_building_fascination_count
        FROM
            buildings
        WHERE
            community_building_fascination_count > 0
    `,
    community_streetscape_hominess_count: `
        SELECT
            geometry_id,
            community_streetscape_hominess_count
        FROM
            buildings
        WHERE
            community_streetscape_hominess_count > 0
    `,
    community_streetscape_coherence_count: `
        SELECT
            geometry_id,
            community_streetscape_coherence_count
        FROM
            buildings
        WHERE
            community_streetscape_coherence_count > 0
    `,
    community_streetscape_fascination_count: `
        SELECT
            geometry_id,
            community_streetscape_fascination_count
        FROM
            buildings
        WHERE
            community_streetscape_fascination_count > 0
    `,
    community_building_hominess_avg: `
        SELECT
            geometry_id,
            community_building_hominess_avg
        FROM
            buildings
        WHERE
            community_building_hominess_avg > 0
    `,
    community_building_coherence_avg: `
        SELECT
            geometry_id,
            community_building_coherence_avg
        FROM
            buildings
        WHERE
            community_building_coherence_avg > 0
    `,
    community_building_fascination_avg: `
        SELECT
            geometry_id,
            community_building_fascination_avg
        FROM
            buildings
        WHERE
            community_building_fascination_avg > 0
    `,
    community_building_neuroaesthetic_avg: `
        SELECT
            geometry_id,
            (community_building_hominess_avg +
            community_building_coherence_avg +
            community_building_fascination_avg) / 3 as community_building_neuroaesthetic_avg
        FROM
            buildings
        WHERE
            community_building_hominess_avg > 0 AND
            community_building_coherence_avg > 0 AND
            community_building_fascination_avg > 0

    `,
    community_streetscape_hominess_avg: `
        SELECT
            geometry_id,
            community_streetscape_hominess_avg
        FROM
            buildings
        WHERE
            community_streetscape_hominess_avg > 0
    `,
    community_streetscape_coherence_avg: `
        SELECT
            geometry_id,
            community_streetscape_coherence_avg
        FROM
            buildings
        WHERE
            community_streetscape_coherence_avg > 0
    `,
    community_streetscape_fascination_avg: `
        SELECT
            geometry_id,
            community_streetscape_fascination_avg
        FROM
            buildings
        WHERE
            community_streetscape_fascination_avg > 0
    `,
    community_streetscape_neuroaesthetic_avg: `
        SELECT
            geometry_id,
            (community_streetscape_hominess_avg +
            community_streetscape_coherence_avg +
            community_streetscape_fascination_avg) / 3 as community_streetscape_neuroaesthetic_avg
        FROM
            buildings
        WHERE
            community_streetscape_hominess_avg > 0 AND
            community_streetscape_coherence_avg > 0 AND
            community_streetscape_fascination_avg > 0

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
    planning_world_heritage_buildings: `
        SELECT
            geometry_id,
            (
                CASE
                    WHEN planning_world_list_id IS NOT NULL THEN 'In World Heritage Site'
                    ELSE 'None'
                END
            ) AS listing_type
        FROM buildings
        WHERE
            planning_world_list_id IS NOT NULL
            `,
    team_known_designer: `
            SELECT
                geometry_id,
                (
                    CASE
                        WHEN array_length(designers,1) > 0 THEN true
                        WHEN array_length(designers_links,1) > 0 THEN true
                        ELSE false
                    END
                ) AS team_known_designer
            FROM buildings
            WHERE
                designers IS NOT NULL
                OR designers IS NOT NULL
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
    original_landuse: `
        SELECT
            geometry_id,
            typology_original_use_order,
            typology_original_use[1] as typology_original_use,
            typology_original_use_verified
        FROM
            buildings
        WHERE typology_original_use IS NOT NULL`,
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
    typology_classification: `
        SELECT
            geometry_id,
            typology_classification
        FROM
            buildings
        WHERE typology_classification IS NOT NULL`,
    typology_style_period: `
        SELECT
            geometry_id,
            typology_style_period
        FROM
            buildings
        WHERE typology_style_period IS NOT NULL`,
    typology_dynamic_classification: `
        SELECT
            geometry_id,
            typology_dynamic_classification
        FROM
            buildings
        WHERE typology_dynamic_classification IS NOT NULL`,
    context_back_garden: `
        SELECT
            geometry_id,
            context_back_garden
        FROM
            buildings
        WHERE context_back_garden IS NOT NULL`,
    context_street_width: `
        SELECT
            geometry_id,
            context_street_width
        FROM
            buildings
        WHERE context_street_width IS NOT NULL`,
    designer_awards: `
        SELECT
            geometry_id,
            designer_awards
        FROM
            buildings
        WHERE designer_awards IS NOT NULL`,
    energy_solar: `
        SELECT
            geometry_id,
            energy_solar
        FROM
            buildings
        WHERE energy_solar IS NOT NULL`,
    energy_green_roof: `
        SELECT
            geometry_id,
            energy_green_roof
        FROM
            buildings
        WHERE energy_green_roof IS NOT NULL`,
    sust_aggregate_estimate_epc: `
        SELECT
            geometry_id,
            sust_aggregate_estimate_epc::text AS sust_aggregate_estimate_epc
        FROM
            buildings`,
    context_walkability_index: `
        SELECT
            geometry_id,
            context_walkability_index
        FROM
            buildings
        WHERE context_walkability_index IS NOT NULL`,
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
