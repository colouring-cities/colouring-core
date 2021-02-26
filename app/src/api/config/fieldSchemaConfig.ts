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
                    type: 'integer'
                },
                year_demolished: {
                    type: 'integer'
                },
                overlap_present: {
                    type: 'string'
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
        year_constructed: number;
        year_demolished: number;
        overlap_present: string;
        links: string[];
    }[]>,

} as const;
