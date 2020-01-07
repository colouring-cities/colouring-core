import { useEffect, useRef, useState } from 'react';

export function useThrottledValue<V>(value: V, delay: number): V {
    const [throttledValue, setThrottledValue] = useState(value);
    let lastUpdated = useRef(Date.now());

    useEffect(() => {
        const timer = setTimeout(() => {
            if(Date.now() - lastUpdated.current >= delay) {
                setThrottledValue(value);
                console.log('Updating to', value);
                lastUpdated.current = Date.now();
            }
        }, delay - (Date.now() - lastUpdated.current));

        return () => {
            clearTimeout(timer);
        };
    }, [delay, value]);

    return throttledValue;
}
