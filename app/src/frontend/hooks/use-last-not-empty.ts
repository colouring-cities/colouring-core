import { useEffect, useState } from 'react';
export function useLastNotEmpty<T>(value: T): T {
    const [notEmpty, setNotEmpty] = useState(value);
    useEffect(() => {
        if(value != undefined) {
            setNotEmpty(value);
        }
    }, [value]);

    return notEmpty;
}
