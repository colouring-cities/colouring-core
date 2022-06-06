import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import _ from 'lodash';

import { InvalidFieldError, FieldTypeError } from '../../errors/general';
import { allAttributesConfig } from '../../config/dataFields';
import { BuildingAttributes, BuildingUserAttributes } from '../../models/building';
import { fieldSchemaConfig } from '../../config/fieldSchemaConfig';

const ajv = new Ajv();
addFormats(ajv);

const compiledSchemas = _.mapValues(fieldSchemaConfig, (val) => ajv.compile(val));

function isDefined(key: string) {
    return allAttributesConfig[key] !== undefined;
}

function canEdit(key: string, allowDerived: boolean = false) {
    const config = allAttributesConfig[key];
    
    return config.edit || (allowDerived && config.derivedEdit);
}

export function validateFieldChange(field: string, value: any, isExternal: boolean = true) {
    if(!isDefined(field)) {
        throw new InvalidFieldError('Field does not exist', field);
    }
    
    const allowDerived = !isExternal;
    if(!canEdit(field, allowDerived)) {
        throw new InvalidFieldError('Field is not editable', field);
    }
    
    if(field in compiledSchemas) {
        if(!compiledSchemas[field](value)) {
            throw new FieldTypeError('Invalid format of data sent', field);
        }
    }
}

export function validateChangeSet(
    attributes: Partial<BuildingAttributes> | Partial<BuildingUserAttributes>,
    isExternal: boolean = true
) {
    _.forIn(attributes, (value, fieldKey) => validateFieldChange(fieldKey, value, isExternal));
}