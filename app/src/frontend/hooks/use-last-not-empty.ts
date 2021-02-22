import { usePrevious } from './use-previous';

export function useLastNotEmpty<T>(value: T): T {
    const previousValue = usePrevious(value);

    return value ?? previousValue;
}
