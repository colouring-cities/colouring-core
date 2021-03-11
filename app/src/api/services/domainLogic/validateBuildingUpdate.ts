import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import { mapObject } from '../../../helpers';
import { FieldTypeError } from '../../errors/general';
import { fieldSchemaConfig } from '../../config/fieldSchemaConfig';

const ajv = new Ajv();
addFormats(ajv);

const compiledSchemas = mapObject(fieldSchemaConfig, ([, val]) => ajv.compile(val))

export function validateBuildingUpdate(buildingId: number, building: any) {
    for(const field of Object.keys(building)) {
        if(field in compiledSchemas) {
            if(!compiledSchemas[field](building[field])) {
                throw new FieldTypeError('Invalid format of data sent', field);
            }
        }
    }
}