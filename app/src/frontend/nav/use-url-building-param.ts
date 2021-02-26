import { Category } from '../config/categories-config';
import { intParamTransform } from './url-param-transform';
import { useUrlParam } from './use-url-param';

export function useUrlBuildingParam(defaultMode: 'view' | 'edit' | 'multi-edit', defaultCategory: Category | 'categories' = 'categories') {
    return useUrlParam('building', intParamTransform, '/:mode/:category/:building?/(history)?', {mode: defaultMode, category: defaultCategory});
}
