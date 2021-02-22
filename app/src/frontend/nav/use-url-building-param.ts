import { intParamTransform } from './url-param-transform';
import { useUrlParam } from './use-url-param';

export function useUrlBuildingParam() {
    return useUrlParam('building', intParamTransform);
}
