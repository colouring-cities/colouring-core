import { useQuery } from './use-query';
import { parseJsonOrDefault } from '../../helpers';

export function useMultiEditData(): [object, string] {
    const query = useQuery();
    
    let data: object, error: string;
    
    const dataString = query.data;
    if(dataString == undefined) {
        return [undefined, undefined];
    }
    if(Array.isArray(dataString)) {
        return [undefined, 'Invalid parameters supplied'];
    }

    data = parseJsonOrDefault(dataString);

    if(data == undefined) {
        error = 'Invalid parameters supplied';
    } else if(Object.values(data).some(x => x == undefined)) {
        error = 'Cannot copy empty values';
        data = undefined;
    }

    return [data, error];
}
