/**
 * This file defines all the valid tileset names that can be obtained from the tilserver.
 * Adjust the values here if modifying the list of styles in the tileserver.
 */

export type BuildingMapTileset = 'date_year' | 
    'size_height' |
    'construction_core_material' |
    'location' |
    'likes' |
    'community_local_significance_total' |
    'community_expected_planning_application_total' |
    'community_in_public_ownership' |
    'planning_combined' |
    'sust_dec' |
    'building_attachment_form' |
    'landuse' |
    'dynamics_demolished_count' |
    'team';

export type SpecialMapTileset = 'base_light' | 'base_night' | 'highlight' | 'number_labels';

export type MapTileset = BuildingMapTileset | SpecialMapTileset;
