import { strictParseInt } from '../parse';

export function parseIntParam(param: string) {
    const result = strictParseInt(param);
    if (isNaN(result)) {
        throw new Error('Invalid parameter format: not an integer');
    }
    return result;
}
