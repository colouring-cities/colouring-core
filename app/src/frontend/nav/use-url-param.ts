import { useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch, generatePath } from 'react-router';

import { UrlParamTransform } from './url-param-transform';

export function useUrlParam<T>(
    param: string,
    paramTransform: UrlParamTransform<T>
): [T, (newParam: T) => void] {
    const match = useRouteMatch();
    const history = useHistory();
    
    const [paramValue, setParamValue] = useState<T>();
    
    useEffect(() => {
        const stringValue: string = match.params[param];

        setParamValue(stringValue && paramTransform.fromParam(stringValue));
    }, [param, paramTransform, match.url]);

    const setUrlParam = useCallback((value: T) => {
        const stringValue = value == undefined ? '' : paramTransform.toParam(value);
        const newPath = generatePath(match.path, {
            ...match.params,
            ...{
                [param]: stringValue
            }
        });
        history.push(newPath);
    }, [param, paramTransform, match.url]);

    return [paramValue, setUrlParam];
}
