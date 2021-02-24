import { useLocation } from 'react-router';
import { parse as parseQuery, ParsedQuery } from 'query-string';

export function useQuery(): ParsedQuery {
    return parseQuery(useLocation().search);
}
