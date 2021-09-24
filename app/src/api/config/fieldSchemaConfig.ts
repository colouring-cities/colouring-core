import { JSONSchemaType } from 'ajv';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { allAttributesConfig } from './dataFields';

export const fieldSchemaConfig: { [key in keyof typeof allAttributesConfig]?: SomeJSONSchema} = { /*eslint-disable @typescript-eslint/camelcase */
    
    demolished_buildings:  {
        type: 'array',
        items: {
            type: 'object',
            required: ['year_constructed', 'year_demolished', 'overlap_present', 'links'],
            properties: {
                year_constructed: {
                    type: 'object',
                    required: ['min', 'max'],
                    additionalProperties: false,
                    properties: {
                        min: {
                            type: 'integer'
                        },
                        max: {
                            type: 'integer'
                        }
                    }
                },
                year_demolished: {
                    type: 'object',
                    required: ['min', 'max'],
                    additionalProperties: false,
                    properties: {
                        min: {
                            type: 'integer'
                        },
                        max: {
                            type: 'integer'
                        }
                    }
                },
                overlap_present: {
                    type: 'string',
                    enum: ['1%', '25%', '50%', '75%', '100%']
                },
                links: {
                    type: 'array',
                    items: {
                        type: 'string'
                    },
                    minItems: 1
                }
            },
            additionalProperties: false,
        }
    } as JSONSchemaType<{
        year_constructed: {
            min: number;
            max: number;
        };
        year_demolished: {
            min: number;
            max: number;
        }
        overlap_present: string;
        links: string[];
    }[]>,

    community_type_worth_keeping_reasons: {
        type: 'object',
        properties: {
            external_design: {
                type: 'boolean',
                nullable: true
            },
            internal_design: {
                type: 'boolean',
                nullable: true
            },
            adaptable: {
                type: 'boolean',
                nullable: true
            },
            other: {
                type: 'boolean',
                nullable: true
            }
        },
        additionalProperties: false
    } as JSONSchemaType<{
        external_design: boolean,
        internal_design: boolean,
        adaptable: boolean,
        other: boolean
    }>

} as const;
