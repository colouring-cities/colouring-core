import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import { mapObject } from '../../../helpers';
import { InvalidFieldError, FieldTypeError } from '../../errors/general';
import { dataFieldsConfig } from '../../config/dataFields';
import { fieldSchemaConfig } from '../../config/fieldSchemaConfig';

const ajv = new Ajv();
addFormats(ajv);

const compiledSchemas = mapObject(fieldSchemaConfig, ([, val]) => ajv.compile(val))

const EXTERNAL_FIELD_EDIT_ALLOWLIST = new Set(Object.entries(dataFieldsConfig).filter(([, value]) => value.edit).map(([key]) => key));

export function validateBuildingUpdate(buildingId: number, building: any) {
    for(const field of Object.keys(building)) {
        if(!EXTERNAL_FIELD_EDIT_ALLOWLIST.has(field)) {
            throw new InvalidFieldError('Field is not editable', field);
        }
        
        if(field in compiledSchemas) {
            if(!compiledSchemas[field](building[field])) {
                throw new FieldTypeError('Invalid format of data sent', field);
            }
        }
    }
}