import { useUrlParam } from './use-url-param';

type Mode = 'view' | 'edit' | 'multi-edit';

export function useUrlModeParam() {
    return useUrlParam<Mode>('mode', {
        fromParam: (x) => x as Mode,
        toParam: (x) => x
    });
}
