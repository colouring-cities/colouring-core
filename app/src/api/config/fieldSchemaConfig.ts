import { JSONSchemaType } from 'ajv';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { dataFieldsConfig } from './dataFields';

export const fieldSchemaConfig: { [key in keyof typeof dataFieldsConfig]?: SomeJSONSchema} = { /*eslint-disable @typescript-eslint/camelcase */

} as const;
