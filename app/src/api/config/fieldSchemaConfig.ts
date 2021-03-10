import { JSONSchemaType } from 'ajv';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { dataFieldsConfig } from './dataFields';

export const fieldSchemaConfig: { [key in keyof typeof dataFieldsConfig]?: SomeJSONSchema} = { /*eslint-disable @typescript-eslint/camelcase */
    
    past_buildings:  {
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
                    enum: ['25%', '50%', '75%', '100%']
                },
                links: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'uri',
                        pattern: '^https?://'
                    }
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

} as const;
