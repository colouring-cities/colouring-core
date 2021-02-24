import { Category } from '../config/categories-config';
import { useUrlParam } from './use-url-param';

export function useUrlCategoryParam() {
    return useUrlParam('category', {
        fromParam: (x: string) => {
            // TODO: add validation
            return x as Category | 'categories';
        },
        toParam: (x: Category | 'categories') => {
            return x as string;
        }
    });
}
