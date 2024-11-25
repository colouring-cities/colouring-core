/**
 * This file defines all the valid tileset names that can be obtained from the tilserver.
 * Adjust the values here if modifying the list of styles in the tileserver.
 */

export type BuildingMapTileset = 
    'date_year' | 
    'cladding_year' | 
    'extension_year' | 
    'retrofit_year' | 
    'size_height' |
    'size_total_floors' |
    'size_storeys_basement' |
    'size_floor_area_ground' |
    'construction_core_material' |
    'construction_structural_system' |
    'construction_foundation' |
    'construction_roof_shape' |
    'construction_roof_covering' |
    'location' |
    "building_footprint_issues" |
    'is_domestic' |
    'likes' |
    'typology_likes' |
    'community_local_significance_total' |
    'community_expected_planning_application_total' |
    'community_in_public_ownership' |
    'community_building_hominess_avg' |
    'community_building_coherence_avg' |
    'community_building_fascination_avg' |
    'community_building_neuroaesthetic_avg' |
    'community_streetscape_hominess_avg' |
    'community_streetscape_coherence_avg' |
    'community_streetscape_fascination_avg' |
    'community_streetscape_neuroaesthetic_avg' |
    'planning_applications_status_all' |
    'planning_applications_status_recent' |
    'planning_applications_status_very_recent' |
    'planning_combined' |
    'sust_dec' |
    'building_attachment_form' |
    'landuse' |
    'original_landuse' |
    'dynamics_demolished_count' |
    'disaster_severity' |
    'team' |
    'team_known_designer' |
    'survival_status'|
    'typology_classification'|
    'typology_style_period' |
    'typology_dynamic_classification'|
    'context_back_garden'|
    'context_street_width'|
    'context_walkability_index' |
    'designer_awards' |
    'energy_solar' |
    'energy_green_roof' |
    'sust_aggregate_estimate_epc';
    

export type SpecialMapTileset = 'base_light' | 'base_night' | 'base_night_outlines' | 'highlight' | 'number_labels' | 'base_boroughs';

export type MapTileset = BuildingMapTileset | SpecialMapTileset;
