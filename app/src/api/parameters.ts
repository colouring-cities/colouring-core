import { strictParseInt } from '../parse';

import { ApiParamInvalidFormatError, ApiParamRequiredError } from './errors/api';


/**
 * Processing functions return undefined only for a missing parameter,
 * so a required parameter is never undefined.
 */
export function processParam<T>(params: object, paramName: string, processingFn: (x: string | undefined, paramName: string) => T, required: true): NonNullable<T>;
export function processParam<T>(params: object, paramName: string, processingFn: (x: string | undefined, paramName: string) => T, required?: boolean): T;
export function processParam<T>(params: object, paramName: string, processingFn: (x: string | undefined, paramName: string) => T, required: boolean = false) {
    const stringValue = params[paramName];

    if(stringValue == undefined && required) {
        throw new ApiParamRequiredError('Parameter required but not supplied', paramName);
    }

    return processingFn(stringValue, paramName);
}

export function parsePositiveIntParam(param: string | undefined, paramName: string) {
    if(param == undefined) return undefined;
    
    const result = strictParseInt(param);
    if (isNaN(result)) {
        throw new ApiParamInvalidFormatError('Invalid format: not a positive integer', paramName);
    }
    return result;
}

export function parseBooleanParam(param: string | undefined, paramName: string) {
    if(param == undefined) return undefined;

    if(param === 'true') return true;
    if(param === 'false') return false;

    throw new ApiParamInvalidFormatError('Invalid format: not a true/false value', paramName);
}

export function checkRegexParam(param: string | undefined, paramName: string, regex: RegExp): string | undefined {
    if(param == undefined) return undefined;

    if(param.match(regex) == undefined) {
        throw new ApiParamInvalidFormatError(`Invalid format: does not match regular expression ${regex}`, paramName);
    }
    
    return param;
}
