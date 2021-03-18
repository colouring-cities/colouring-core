import { valueType } from '../../helpers';

/** Configuration for a single data field */
export interface DataFieldConfig {
    /**
     * Allow editing the field?
     */
    edit: boolean;

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

export const dataFieldsConfig = valueType<DataFieldConfig>()({ /* eslint-disable @typescript-eslint/camelcase */
    ref_osm_id: {
        edit: true,
    },
    location_name: {
        edit: false,
        verify: true,
    },
    location_number: {
        edit: true,
        verify: true,
    },
    location_street: {
        edit: false,
        verify: true,
    },
    location_line_two: {
        edit: false,
    },
    location_town: {
        edit: false,
    },
    location_postcode: {
        edit: false,
    },
    location_latitude: {
        edit: true,
    },
    location_longitude: {
        edit: true,
    },
    date_year: {
        edit: true,
        verify: true,
    },
    date_lower: {
        edit: true,
    },
    date_upper: {
        edit: true,
    },
    date_source: {
        edit: true,
    },
    date_source_detail: {
        edit: true,
    },
    date_link: {
        edit: true,
    },
    facade_year: {
        edit: true,
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
    size_height_apex: {
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
    size_width_frontage: {
        edit: true,
        verify: true,
    },
    construction_core_material: {
        edit: true,
    },
    construction_secondary_materials: {
        edit: false,
    },
    construction_roof_covering: {
        edit: true,
    },
    planning_portal_link: {
        edit: true,
        verify: true,
    },
    planning_in_conservation_area: {
        edit: true,
        verify: true,
    },
    planning_conservation_area_name: {
        edit: true,
        verify: true,
    },
    planning_in_list: {
        edit: false,
    },
    planning_list_id: {
        edit: false,
    },
    planning_list_cat: {
        edit: false,
    },
    planning_list_grade: {
        edit: false,
    },
    planning_heritage_at_risk_id: {
        edit: true,
        verify: true,
    },
    planning_world_list_id: {
        edit: true,
        verify: true,
    },
    planning_in_glher: {
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
    planning_apa_name: {
        edit: true,
        verify: true,
    },
    planning_apa_tier: {
        edit: true,
        verify: true,
    },
    planning_in_local_list: {
        edit: true,
        verify: true,
    },
    planning_local_list_url: {
        edit: true,
        verify: true,
    },
    planning_in_historic_area_assessment: {
        edit: true,
        verify: true,
    },
    planning_historic_area_assessment_url: {
        edit: true,
        verify: true,
    },
    sust_breeam_rating: {
        edit: true,
        verify: true,
    },
    sust_dec: {
        edit: true,
        verify: true,
    },
    sust_aggregate_estimate_epc: {
        edit: false,
    },
    sust_retrofit_date: {
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
        verify: false,
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
});

export type Building = { [k in keyof typeof dataFieldsConfig]: any };
export type BuildingUpdate = Partial<Building>;
