import { strictParseInt } from '../parse';


export function processParam<T>(params: object, paramName: string, processingFn: (x: string) => T, required: boolean = false) {
    const stringValue = params[paramName];

    if(stringValue == undefined && required) {
        const err = new ParamRequiredError('Parameter required but not supplied');
        err.paramName = paramName;
        throw err;
    }

    try {
        return processingFn(stringValue);
    } catch(error) {
        if(error instanceof RequestParameterError) {
            error.paramName = paramName;
        }
        
        throw error;
    }
}

export function parseIntParam(param: string) {
    if(param == undefined) return undefined;
    
    const result = strictParseInt(param);
    if (isNaN(result)) {
        throw new ParamInvalidFormatError('Invalid format: not an integer');
    }
    return result;
}

export function checkRegexParam(param: string, regex: RegExp): string {
    if(param == undefined) return undefined;

    if(param.match(regex) == undefined) {
        throw new ParamInvalidFormatError(`Invalid format: does not match regular expression ${regex}`);
    }
}
