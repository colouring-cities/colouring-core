import { useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch, generatePath } from 'react-router';

import { UrlParamTransform } from './url-param-transform';

export function useUrlParam<T>(
    param: string,
    paramTransform: UrlParamTransform<T>,
    pathPattern?: string,
    defaultParams: { [key: string]: string} = {}
): [T, (newParam: T) => void] {
    const match = useRouteMatch();
    const history = useHistory();
    
    const [paramValue, setParamValue] = useState<T>();
    
    useEffect(() => {
        const stringValue: string = match.params[param];

        setParamValue(stringValue && paramTransform.fromParam(stringValue));
    }, [param, paramTransform, match.url]);

    const setUrlParam = useCallback((value: T) => {
        const newParams = Object.assign({}, defaultParams, match.params);
        newParams[param] = value == undefined ? undefined : paramTransform.toParam(value);
        
        const newPath = generatePath(pathPattern ?? match.path, newParams);
        history.push(newPath);
    }, [param, paramTransform, pathPattern, defaultParams, match.url]);

    return [paramValue, setUrlParam];
}
