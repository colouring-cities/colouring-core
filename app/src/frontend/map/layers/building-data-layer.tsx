import * as React from 'react';
import { TileLayer } from 'react-leaflet';

import { BuildingMapTileset } from '../../config/tileserver-config';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { getTileLayerUrl } from './get-tile-layer-url';

export function BuildingDataLayer({
    tileset,
    revisionId
}: {
    tileset: BuildingMapTileset,
    revisionId: string
}) {
    const { editableBuildings } = useDisplayPreferences();

    const [isLoading, setIsLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [elapsedMs, setElapsedMs] = React.useState(0);

    const totalTilesRef = React.useRef(0);
    const loadedTilesRef = React.useRef(0);
    const startTimeRef = React.useRef<number | null>(null);
    const timerRef = React.useRef<number | null>(null);

    const stopTimer = React.useCallback(() => {
        if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const resetProgress = React.useCallback(() => {
        totalTilesRef.current = 0;
        loadedTilesRef.current = 0;
        setProgress(0);
        setElapsedMs(0);
        startTimeRef.current = null;
        stopTimer();
    }, [stopTimer]);

    const startTimer = React.useCallback(() => {
        if (timerRef.current !== null) return;

        startTimeRef.current = Date.now();
        timerRef.current = window.setInterval(() => {
            if (startTimeRef.current !== null) {
                setElapsedMs(Date.now() - startTimeRef.current);
            }
        }, 100);
    }, []);

    const updateProgress = React.useCallback(() => {
        if (totalTilesRef.current === 0) {
            setProgress(0);
            return;
        }

        const value = Math.round(
            (loadedTilesRef.current / totalTilesRef.current) * 100
        );
        setProgress(value);

        if (loadedTilesRef.current >= totalTilesRef.current) {
            stopTimer();
            setTimeout(() => {
                setIsLoading(false);
                resetProgress();
            }, 200);
        }
    }, [resetProgress, stopTimer]);

    React.useEffect(() => {
        return () => stopTimer();
    }, [stopTimer]);

    if (editableBuildings !== 'enabled') {
        return <div></div>;
    }

    return (
        <>
            {isLoading && (
                <div className="tile-loading-overlay">
                    <div className="tile-loading-bar-wrapper">
                        <div
                            className="tile-loading-bar"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="tile-loading-timer">
                        {(elapsedMs / 1000).toFixed(1)}s
                    </div>
                </div>
            )}

            <TileLayer
                updateWhenIdle={true}
                updateWhenZooming={false}
                updateInterval={200}
                key={`${tileset}-${revisionId}`}
                url={getTileLayerUrl(tileset, { rev: revisionId })}
                minZoom={9}
                maxZoom={19}
                detectRetina={false}
                eventHandlers={{
                    loading: () => {
                        resetProgress();
                        setIsLoading(true);
                        startTimer();
                    },
                    tileloadstart: () => {
                        totalTilesRef.current += 1;
                        if (!isLoading) {
                            setIsLoading(true);
                            startTimer();
                        }
                        updateProgress();
                    },
                    tileload: () => {
                        loadedTilesRef.current += 1;
                        updateProgress();
                    },
                    tileerror: () => {
                        loadedTilesRef.current += 1;
                        updateProgress();
                    }
                }}
            />
        </>
    );
}