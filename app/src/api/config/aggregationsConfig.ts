import { buildingAttributesConfig, buildingUserAttributesConfig } from '../config/dataFields';

export type AggregationMethod = 'countTrue';

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
    ]
};