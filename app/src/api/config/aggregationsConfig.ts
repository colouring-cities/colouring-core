import { buildingAttributesConfig, buildingUserAttributesConfig } from '../config/dataFields';

export type AggregationMethod = 'countTrue' | 'countSubmissions' | 'countTotal' | 'countAverage';

export interface AggregationConfig {
    aggregateFieldName: keyof typeof buildingAttributesConfig;
    aggregationMethod: AggregationMethod;
};

/**
 * Configuration for building-user attribute aggregations.
 * The config defines how attributes that are collected per building, per user are aggregated into per building attributes.
 * An example is the building like mechanism: 
 */
export const aggregationsConfig: { [key in keyof typeof buildingUserAttributesConfig]?: AggregationConfig[]}  = {
    community_like: [
        {
            aggregateFieldName: 'likes_total',
            aggregationMethod: 'countTrue'
        }
    ],
    community_type_worth_keeping: [
        {
            aggregateFieldName: 'community_type_worth_keeping_total',
            aggregationMethod: 'countTrue'
        }
    ],
    community_local_significance: [
        {
            aggregateFieldName: 'community_local_significance_total',
            aggregationMethod: 'countTrue'
        }
    ],
    community_expected_planning_application: [
        {
            aggregateFieldName: 'community_expected_planning_application_total',
            aggregationMethod: 'countTrue'
        }
    ],
    community_building_hominess: [
        {
            aggregateFieldName: 'community_building_hominess_count',
            aggregationMethod: 'countSubmissions'
        },
        {
            aggregateFieldName: 'community_building_hominess_avg',
            aggregationMethod: 'countAverage'
        }
    ],
    community_building_coherence: [
        {
            aggregateFieldName: 'community_building_coherence_count',
            aggregationMethod: 'countSubmissions'
        },
        {
            aggregateFieldName: 'community_building_coherence_avg',
            aggregationMethod: 'countAverage'
        }
    ],
    community_building_fascination: [
        {
            aggregateFieldName: 'community_building_fascination_count',
            aggregationMethod: 'countSubmissions'
        },
        {
            aggregateFieldName: 'community_building_fascination_avg',
            aggregationMethod: 'countAverage'
        }
    ],
    community_streetscape_hominess: [
        {
            aggregateFieldName: 'community_streetscape_hominess_count',
            aggregationMethod: 'countSubmissions'
        },
        {
            aggregateFieldName: 'community_streetscape_hominess_avg',
            aggregationMethod: 'countAverage'
        }
    ],
    community_streetscape_coherence: [
        {
            aggregateFieldName: 'community_streetscape_coherence_count',
            aggregationMethod: 'countSubmissions'
        },
        {
            aggregateFieldName: 'community_streetscape_coherence_avg',
            aggregationMethod: 'countAverage'
        }
    ],
    community_streetscape_fascination: [
        {
            aggregateFieldName: 'community_streetscape_fascination_count',
            aggregationMethod: 'countSubmissions'
        },
        {
            aggregateFieldName: 'community_streetscape_fascination_avg',
            aggregationMethod: 'countAverage'
        }
    ],
};