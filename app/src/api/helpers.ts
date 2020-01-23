import { strictParseInt } from '../parse';

export function parseIntParam(param: string, paramName?: string) {
    const result = strictParseInt(param);
    if (isNaN(result)) {
        const paramNameString = paramName == undefined ? '' : paramName + ' ';
        throw new Error(`Invalid parameter ${paramNameString}format: not an integer`);
    }
    return result;
}
