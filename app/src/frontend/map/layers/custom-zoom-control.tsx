
import * as React from 'react';
import { useMap } from 'react-leaflet';

export function CustomZoomControl() {
    const map = useMap();

    const timerRef = React.useRef<number | null>(null);
    const pendingZoomRef = React.useRef(map.getZoom());
    const [displayZoom, setDisplayZoom] = React.useState(map.getZoom());

    const scheduleZoom = React.useCallback((delta: number) => {
        const nextZoom = pendingZoomRef.current + delta;

        pendingZoomRef.current = Math.max(
            map.getMinZoom(),
            Math.min(map.getMaxZoom(), nextZoom)
        );
        setDisplayZoom(pendingZoomRef.current);

        if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
            map.setZoom(pendingZoomRef.current);
            timerRef.current = null;
        }, 300); // delay before refreshing map
    }, [map]);

    React.useEffect(() => {
        const syncZoom = () => {
            const z = map.getZoom();
            pendingZoomRef.current = z;
            setDisplayZoom(z);
        };

        map.on('zoomend', syncZoom);

        return () => {
            map.off('zoomend', syncZoom);
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, [map]);

    return (
        <div className="debounced-zoom-control">
            <button type="button" onClick={() => scheduleZoom(1)}>+</button>
            <div className="debounced-zoom-value">{displayZoom}</div>
            <button type="button" onClick={() => scheduleZoom(-1)}>−</button>
        </div>
    );
}


