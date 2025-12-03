import { valueType } from '../../helpers';

/** Configuration for a single data field */
export interface DataFieldConfig {

    /**
     * Default: false
     */
    perUser?: boolean;

    /**
     * Allow editing the field through the API?
     */
    edit: boolean;

    /**
     * Should the editing of the field be allowed - but only when
     * the change is a result of an edit of another field, from which this field is derived.
     * Example: editing Land Use Group modifies Land Use Order, too, because LU Order is automatically derived from LU Group.
     * But Land Use Order itself cannot be modified directly by users.
     * Default: false
     */
    derivedEdit?: boolean;

    /**
     * Allow verifying the field value?
     * Default: false;
     */
    verify?: boolean;

    /**
     * Should the update value be formatted as JSON text?
     * E.g. if the database column is of type json, the object coming from
     * the HTTP request body needs to be formatted as json by pg-promise
     * See more on formatting here https://vitaly-t.github.io/pg-promise/formatting.html#.format
     * Default: false
     */
    asJson?: boolean;

    /**
     * Should the formatted value be cast to a different type when inserting to db?
     * Useful when the JS object from request needs to be mapped to a Postgres-specific column
     * E.g. can map a complex object to jsonb (need to format it as text json, too, with the asJson option above)
     * (Add more options here as they become necessary)
     * Default: undefined
     */
    sqlCast?: 'json' | 'jsonb';
}

export const buildingAttributesConfig = valueType<DataFieldConfig>()({ /* eslint-disable @typescript-eslint/camelcase */
    ref_toid: {
        edit: false
    },
    ref_osm_id: {
        edit: true,
        verify: true,
    },
    location_name: {
        edit: true,
        verify: true,
    },
    location_name_link: {
        edit: true,
        verify: true,
    },
    location_residential_name_link: {
        edit: true,
        verify: true,
    },
    location_number: {
        edit: true,
        verify: true,
    },
    location_street: {
        edit: true,
        verify: true,
    },
    location_line_two: {
        edit: true,
        verify: true
    },
    location_town: {
        edit: true,
        verify: true
    },
    location_postcode: {
        edit: true,
        verify: true
    },
    location_address_source: {
        edit: true,
        verify: true
    },
    location_address_links: {
        edit: true,
        verify: true
    },
    location_latitude: {
        edit: true,
        verify: true,
    },
    location_longitude: {
        edit: true,
        verify: true,
    },
    location_coordinates_source: {
        edit: true,
        verify: true
    },
    location_coordinates_links: {
        edit: true,
        verify: true
    },
    location_alternative_footprint_links: {
        edit: true,
        verify: true
    },
    location_subdivided: {
        edit: true,
        verify: true
    },
    location_num_subdivisions: {
        edit: true,
        verify: true
    },
    location_subdivisions_source_type: {
        edit: true,
        verify: true
    },
    location_subdivisions_source_links: {
        edit: true,
        verify: true
    },
    date_year: {
        edit: true,
        verify: true,
    },
    date_year_completed: {
        edit: true,
        verify: true,
    },
    date_lower: {
        edit: true,
        verify: true,
    },
    date_upper: {
        edit: true,
        verify: true,
    },
    date_source_type: {
        edit: true,
        verify: true,
    },
    date_source_links: {
        edit: true,
        verify: true,
    },
    facade_year: {
        edit: true,
        verify: true,
    },
    facade_upper: {
        edit: false,
    },
    facade_lower: {
        edit: false,
    },
    facade_source: {
        edit: false,
    },
    facade_source_detail: {
        edit: false,
    },
    size_storeys_attic: {
        edit: true,
        verify: true,
    },
    size_storeys_core: {
        edit: true,
        verify: true,
    },
    size_storeys_basement: {
        edit: true,
        verify: true,
    },
    size_storeys_source_type: {
        edit: true,
        verify: true,
    },
    size_storeys_source_links: {
        edit: true,
        verify: true,
    },
    size_height_apex: {
        edit: true,
        verify: true,
    },
    size_height_apex_source_type: {
        edit: true,
        verify: true,
    },
    size_height_apex_source_links: {
        edit: true,
        verify: true,
    },
    size_height_eaves: {
        edit: true,
        verify: true,
    },
    size_height_eaves_source_type: {
        edit: true,
        verify: true,
    },
    size_height_eaves_source_links: {
        edit: true,
        verify: true,
    },
    size_floor_area_ground: {
        edit: true,
        verify: true,
    },
    size_floor_area_total: {
        edit: true,
        verify: true,
    },
    size_floor_area_source_type: {
        edit: true,
        verify: true,
    },
    size_floor_area_source_links: {
        edit: true,
        verify: true,
    },
    size_width_frontage: {
        edit: true,
        verify: true,
    },
    size_width_frontage_source_type: {
        edit: true,
        verify: true,
    },
    size_width_frontage_source_links: {
        edit: true,
        verify: true,
    },
    size_far_ratio: {
        edit: true,
        verify: true,
    },
    size_far_ratio_source_type: {
        edit: true,
        verify: true,
    },
    size_far_ratio_source_links: {
        edit: true,
        verify: true,
    },
    size_plot_area_total: {
        edit: true,
        verify: true,
    },
    size_plot_area_total_source_type: {
        edit: true,
        verify: true,
    },
    size_plot_area_total_source_links: {
        edit: true,
        verify: true,
    },
    size_parcel_geometry: {
        edit: true,
        verify: true,
    },
    size_parcel_geometry_source_type: {
        edit: true,
        verify: true,
    },
    size_parcel_geometry_source_links: {
        edit: true,
        verify: true,
    },
    construction_material_window_frame: {
        edit: true,
        verify: true,
    },
    construction_material_window_frame_source_type: {
        edit: true,
        verify: true,
    },
    construction_material_window_frame_source_links: {
        edit: true,
        verify: true,
    },
    construction_core_material: {
        edit: true,
        verify: true,
    },
    construction_core_material_source_type: {
        edit: true,
        verify: true,
    },
    construction_core_material_source_links: {
        edit: true,
        verify: true,
    },
    construction_secondary_materials: {
        edit: false,
    },
    construction_roof_covering: {
        edit: true,
        verify: true,
    },
    construction_roof_covering_source_type: {
        edit: true,
        verify: true,
    },
    construction_roof_covering_source_links: {
        edit: true,
        verify: true,
    },
    construction_structural_system: {
        edit: true,
        verify: true,
    },
    construction_structural_system_source_type: {
        edit: true,
        verify: true,
    },
    construction_structural_system_source_links: {
        edit: true,
        verify: true,
    },
    construction_foundation: {
        edit: true,
        verify: true,
    },
    construction_foundation_source_type: {
        edit: true,
        verify: true,
    },
    construction_foundation_source_links: {
        edit: true,
        verify: true,
    },
    construction_roof_shape: {
        edit: true,
        verify: true,
    },
    construction_roof_shape_source_type: {
        edit: true,
        verify: true,
    },
    construction_roof_shape_source_links: {
        edit: true,
        verify: true,
    },
    construction_irregularities: {
        edit: true,
        verify: true,
    },
    construction_irregularities_source_type: {
        edit: true,
        verify: true,
    },
    construction_irregularities_source_links: {
        edit: true,
        verify: true,
    },
    construction_decorative_features: {
        edit: true,
        verify: true,
    },
    construction_decorative_feature_materials: {
        edit: true,
        verify: true,
    },
    construction_decorative_feature_source_type: {
        edit: true,
        verify: true,
    },
    construction_decorative_feature_source_links: {
        edit: true,
        verify: true,
    },
    construction_external_wall: {
        edit: true,
        verify: true,
    },
    construction_external_wall_source_type: {
        edit: true,
        verify: true,
    },
    construction_external_wall_source_links: {
        edit: true,
        verify: true,
    },
    construction_internal_wall: {
        edit: true,
        verify: true,
    },
    construction_internal_wall_source_type: {
        edit: true,
        verify: true,
    },
    construction_internal_wall_source_links: {
        edit: true,
        verify: true,
    },
    construction_ground_floor: {
        edit: true,
        verify: true,
    },
    construction_ground_floor_source_type: {
        edit: true,
        verify: true,
    },
    construction_ground_floor_source_links: {
        edit: true,
        verify: true,
    },


    planning_portal_link: {
        edit: true,
        verify: true,
    },
    work_on_site_is_completed: {
        edit: true,
        verify: true,
    },
    planning_crowdsourced_site_completion_status: {
        edit: true,
        verify: true,
    },
    planning_crowdsourced_site_completion_year: {
        edit: true,
        verify: true,
    },
    planning_crowdsourced_site_completion_source_type: {
        edit: true,
        verify: true,
    },
    planning_crowdsourced_site_completion_source_links: {
        edit: true,
        verify: true,
    },
    planning_crowdsourced_planning_id: {
        edit: true,
        verify: true,
    },
    planning_in_conservation_area: {
        edit: true,
        verify: true,
    },
    planning_in_conservation_area_id: {
        edit: true,
        verify: true,
    },
    planning_in_conservation_area_url: {
        edit: true,
        verify: true,
    },
    planning_in_conservation_area_source_url: {
        edit: true,
        verify: true,
    },
    planning_list_grade: {
        edit: true,
        verify: true,
    },
    planning_heritage_at_risk_url: {
        edit: true,
        verify: true,
    },
    planning_world_heritage_site: {
        edit: true,
        verify: true,
    },
    planning_world_list_id: {
        edit: true,
        verify: true,
    },
    planning_glher_url: {
        edit: true,
        verify: true,
    },
    planning_in_apa: {
        edit: true,
        verify: true,
    },
    planning_in_apa_url: {
        edit: true,
        verify: true,
    },
    planning_local_list: {
        edit: true,
        verify: true,
    },
    planning_local_list_url: {
        edit: true,
        verify: true,
    },
    planning_historic_area_assessment: {
        edit: true,
        verify: true,
    },
    planning_historic_area_assessment_url: {
        edit: true,
        verify: true,
    },
    planning_listed: {
        edit: true,
        verify: true,
    },
    planning_list_id: {
        edit: true,
        verify: true,
    },
    planning_missing_data: {
        edit: true,
        verify: true,
    },
    planning_missing_data_links: {
        edit: true,
        verify: true,
    },
    planning_heritage_at_risk: {
        edit: true,
        verify: true,
    },
    planning_scientific_interest: {
        edit: true,
        verify: true,
    },
    planning_scientific_interest_source_type: {
        edit: true,
        verify: true,
    },
    planning_scientific_interest_source_links: {
        edit: true,
        verify: true,
    },
    planning_flood_zone: {
        edit: true,
        verify: true,
    },
    planning_housing_zone: {
        edit: true,
        verify: true,
    },
    planning_enterprise_zone: {
        edit: true,
        verify: true,
    },
    planning_protected_vista: {
        edit: true,
        verify: true,
    },
    sust_breeam_rating: {
        edit: true,
        verify: true,
    },
    sust_breeam_rating_source_type: {
        edit: true,
        verify: true
    },
    sust_breeam_rating_source_link: {
        edit: true,
        verify: true
    },
    sust_dec: {
        edit: true,
        verify: true,
    },
    sust_aggregate_estimate_epc: {
        edit: true,
    },
    sust_aggregate_estimate_epc_source_type: {
        edit: true,
        verify: true
    },
    sust_aggregate_estimate_epc_source_link: {
        edit: true,
        verify: true
    },
    sust_dec_source_type: {
        edit: true,
        verify: true
    },
    sust_dec_source_link: {
        edit: true,
        verify: true
    },
    sust_retrofit_date: {
        edit: true,
        verify: true,
    },
    sust_retrofit_source_type: {
        edit: true,
        verify: true,
    },
    sust_retrofit_source_links: {
        edit: true,
        verify: true,
    },
    sust_life_expectancy: {
        edit: false,
    },
    building_attachment_form: {
        edit: true,
        verify: true,
    },
    building_attachment_source_type: {
        edit: true,
        verify: true,
    },
    building_attachment_source_links: {
        edit: true,
        verify: true,
    },
    building_residential_typology_description: {
        edit: true,
        verify: true,
    },
    building_residential_typology_source_type: {
        edit: true,
        verify: true,
    },
    building_residential_typology_source_links: {
        edit: true,
        verify: true,
    },
    date_change_building_use: {
        edit: true,
    },
    current_landuse_class: {
        edit: false,
    },
    current_landuse_group: {
        edit: true,
        verify: true,
    },
    current_landuse_order: {
        edit: false,
        derivedEdit: true,
        verify: false,
    },
    current_landuse_source: {
        edit: true,
        verify: true,
    },
    current_landuse_source_detail: {
        edit: true,
    },
    current_landuse_link: {
        edit: true,
        verify: true,
    },
    current_landuse_verified: {
        edit: true,
    },
    dynamics_has_demolished_buildings: {
        edit: true,
        verify: true
    },
    demolished_buildings: {
        edit: true,
        verify: false,
        asJson: true,
        sqlCast: 'jsonb',
    },
    is_domestic: {
        edit: true,
        verify: true
    },
    is_domestic_source: {
        edit: true,
        verify: true
    },
    is_domestic_links: {
        edit: true,
        verify: true
    },
    survival_status: {
        edit: true,
        verify: true
    },
    survival_source: {
        edit: true,
        verify: true
    },
    survival_source_links: {
        edit: true,
        verify: true
    },
    likes_total: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_type_worth_keeping_total: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_building_worth_keeping_total: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_streetscape_worth_keeping_total: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_local_significance_total: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_expected_planning_application_total: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_building_hominess_count: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_building_coherence_count: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_building_fascination_count: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_streetscape_hominess_count: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_streetscape_coherence_count: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_streetscape_fascination_count: {
        edit: false,
        derivedEdit: true,
        verify: false
    },
    community_building_hominess_avg: {
        perUser: false,
        edit: true,
        verify: false
    },
    community_building_coherence_avg: {
        perUser: false,
        edit: true,
        verify: false
    },
    community_building_fascination_avg: {
        perUser: false,
        edit: true,
        verify: false
    },
    community_building_neuroaesthetic_avg: {
        perUser: false,
        edit: true,
        verify: false
    },
    community_streetscape_hominess_avg: {
        perUser: false,
        edit: true,
        verify: false
    },
    community_streetscape_coherence_avg: {
        perUser: false,
        edit: true,
        verify: false
    },
    community_streetscape_fascination_avg: {
        perUser: false,
        edit: true,
        verify: false
    },
    community_streetscape_neuroaesthetic_avg: {
        perUser: false,
        edit: true,
        verify: false
    },
    community_activities_current: {
        edit: true,
        verify: false
    },
    community_activities: {
        edit: true,
        verify: false
    },
    community_activities_always: {
        edit: true,
        verify: false
    },
    community_public_ownership: {
        edit: true,
        verify: true
    },
    community_public_ownership_source_type: {
        edit: true,
        verify: true
    },
    community_public_ownership_sources: {
        edit: true,
        verify: true
    },
    has_extension: {
        edit: true,
        verify: true
    },
    extension_year: {
        edit: true,
        verify: true
    },
    extension_source_type: {
        edit: true,
        verify: true
    },
    extension_source_links: {
        edit: true,
        verify: true
    },
    developer_type: {
        edit: true,
        verify: true
    },
    developer_name: {
        edit: true,
        verify: true
    },
    developer_links: {
        edit: true,
        verify: true
    },
    developer_source_type: {
        edit: true,
        verify: true
    },
    developer_source_link: {
        edit: true,
        verify: true
    },
    extension_developer_type: {
        edit: true,
        verify: true
    },
    extension_developer_name: {
        edit: true,
        verify: true
    },
    extension_developer_links: {
        edit: true,
        verify: true
    },
    extension_developer_source_type: {
        edit: true,
        verify: true
    },
    extension_developer_source_link: {
        edit: true,
        verify: true
    },
    landowner: {
        edit: true,
        verify: true
    },
    landowner_links: {
        edit: true,
        verify: true
    },
    landowner_source_type: {
        edit: true,
        verify: true
    },
    landowner_source_link: {
        edit: true,
        verify: true
    },
    designers: {
        edit: true,
        verify: true
    },
    designers_links: {
        edit: true,
        verify: true
    },
    designers_source_type: {
        edit: true,
        verify: true
    },
    designers_source_link: {
        edit: true,
        verify: true
    },
    lead_designer_type: {
        edit: true,
        verify: true
    },
    extension_designers: {
        edit: true,
        verify: true
    },
    extension_designers_links: {
        edit: true,
        verify: true
    },
    extension_designers_source_type: {
        edit: true,
        verify: true
    },
    extension_designers_source_link: {
        edit: true,
        verify: true
    },
    extension_lead_designer_type: {
        edit: true,
        verify: true
    },
    designer_awards: {
        edit: true,
        verify: true
    },
    awards_source_link: {
        edit: true,
        verify: true
    },
    builder: {
        edit: true,
        verify: true
    },
    builder_links: {
        edit: true,
        verify: true
    },
    builder_source_type: {
        edit: true,
        verify: true
    },
    builder_source_link: {
        edit: true,
        verify: true
    },
    extension_builder: {
        edit: true,
        verify: true
    },
    extension_builder_links: {
        edit: true,
        verify: true
    },
    extension_builder_source_type: {
        edit: true,
        verify: true
    },
    extension_builder_source_link: {
        edit: true,
        verify: true
    },
    other_team: {
        edit: true,
        verify: true
    },
    other_team_source_link: {
        edit: true,
        verify: true
    },
    building_client: {
        edit: true,
        verify: true
    },
    building_client_source_type: {
        edit: true,
        verify: true
    },
    building_client_source_link: {
        edit: true,
        verify: true
    },
    extension_client: {
        edit: true,
        verify: true
    },
    extension_client_source_type: {
        edit: true,
        verify: true
    },
    extension_client_source_link: {
        edit: true,
        verify: true
    },
    disaster_type: {
        edit: true,
        verify: true
    },
    disaster_severity: {
        edit: true,
        verify: true
    },
    disaster_assessment_method: {
        edit: true,
        verify: true
    },
    disaster_source_link: {
        edit: true,
        verify: true
    },
    disaster_start_date : {
        edit: true,
        verify: true
    },
    disaster_end_date : {
        edit: true,
        verify: true
    },
    context_front_garden : {
        edit: true,
        verify: true
    },
    context_back_garden : {
        edit: true,
        verify: true
    },
    context_flats_garden : {
        edit: true,
        verify: true
    },
    context_garden_source_type : {
        edit: true,
        verify: true
    },
    context_garden_source_links : {
        edit: true,
        verify: true
    },
    context_street_width : {
        edit: true,
        verify: true
    },
    context_street_width_source_type : {
        edit: true,
        verify: true
    },
    context_street_width_source_links : {
        edit: true,
        verify: true
    },
    context_walkability_index : {
        edit: true,
        verify: true
    },
    context_pavement_width : {
        edit: true,
        verify: true
    },
    context_pavement_width_source_type : {
        edit: true,
        verify: true
    },
    context_pavement_width_source_links : {
        edit: true,
        verify: true
    },
    context_street_geometry : {
        edit: true,
        verify: true
    },
    context_street_geometry_source_type : {
        edit: true,
        verify: true
    },
    context_street_geometry_source_links : {
        edit: true,
        verify: true
    },
    context_green_space_distance : {
        edit: true,
        verify: true
    },
    context_green_space_distance_source_type : {
        edit: true,
        verify: true
    },
    context_green_space_distance_source_links : {
        edit: true,
        verify: true
    },
    context_tree_distance : {
        edit: true,
        verify: true
    },
    context_tree_distance_source_type : {
        edit: true,
        verify: true
    },
    context_tree_distance_source_links : {
        edit: true,
        verify: true
    },
    age_cladding_date : {
        edit: true,
        verify: true
    },
    age_cladding_date_source_type : {
        edit: true,
        verify: true
    },
    age_cladding_date_source_links : {
        edit: true,
        verify: true
    },
    age_extension_date : {
        edit: true,
        verify: true
    },
    age_extension_date_source_type : {
        edit: true,
        verify: true
    },
    age_extension_date_source_links : {
        edit: true,
        verify: true
    },
    age_retrofit_date : {
        edit: true,
        verify: true
    },
    age_retrofit_date_source_type : {
        edit: true,
        verify: true
    },
    age_retrofit_date_source_links : {
        edit: true,
        verify: true
    },
    age_historical_raster_map_links : {
        edit: true,
        verify: true
    },
    age_historical_vectorised_footprint_links : {
        edit: true,
        verify: true
    },
    energy_solar : {
        edit: true,
        verify: true
    },
    energy_solar_source_type : {
        edit: true,
        verify: true
    },
    energy_solar_source_links : {
        edit: true,
        verify: true
    },
    energy_green_roof : {
        edit: true,
        verify: true
    },
    energy_green_roof_source_type : {
        edit: true,
        verify: true
    },
    energy_green_roof_source_links : {
        edit: true,
        verify: true
    },
    typology_classification : {
        edit: true,
        verify: true
    },
    typology_classification_source_type : {
        edit: true,
        verify: true
    },
    typology_classification_source_links: {
        edit: true,
        verify: true
    },
    typology_style_period : {
        edit: true,
        verify: true
    },
    typology_style_period_source_type : {
        edit: true,
        verify: true
    },
    typology_style_period_source_links: {
        edit: true,
        verify: true
    },
    typology_dynamic_classification : {
        edit: true,
        verify: true
    },
    typology_dynamic_classification_source_type : {
        edit: true,
        verify: true
    },
    typology_dynamic_classification_source_links: {
        edit: true,
        verify: true
    },
    typology_original_use : {
        edit: true,
        derivedEdit: true,
        verify: true
    },
    typology_original_use_verified: {
        edit: true,
    },
    typology_original_use_order : {
        edit: true,
        verify: true
    },
    typology_original_use_source_type : {
        edit: true,
        verify: true
    },
    typology_original_use_source_links: {
        edit: true,
        verify: true
    },
});


export const buildingUserAttributesConfig = valueType<DataFieldConfig>()({
    community_like: {
        perUser: true,
        edit: true,
        verify: false,
    },
    community_type_worth_keeping: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_type_worth_keeping_reasons: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_building_worth_keeping: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_building_worth_keeping_reasons: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_building_worth_keeping_based_on: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_streetscape_worth_keeping: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_streetscape_worth_keeping_reasons: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_streetscape_worth_keeping_based_on: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_school_project_data: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_local_significance: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_expected_planning_application: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_building_hominess: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_building_coherence: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_building_fascination: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_streetscape_hominess: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_streetscape_coherence: {
        perUser: true,
        edit: true,
        verify: false
    },
    community_streetscape_fascination: {
        perUser: true,
        edit: true,
        verify: false
    },
});

export const allAttributesConfig = Object.assign({}, buildingAttributesConfig, buildingUserAttributesConfig);
