import { useCallback, useEffect, useState } from 'react';

import { apiGet } from '../apiHelpers';

export function useBuildingLikeData(buildingId: number, preloadedData: boolean): [boolean, (updatedBuildingLike: boolean) => void, () => void] {
    const [buildingLikeData, setBuildingLikeData] = useState<boolean>(preloadedData);
    // const [fetchedId, setFetchedId] = useState(preloadedData == undefined ? undefined : buildingId);
    const [isOld, setIsOld] = useState<boolean>(preloadedData == undefined);

    const fetchData = useCallback(async () => {
        if(buildingId == undefined) {
            setBuildingLikeData(undefined);
            setIsOld(false);
            return;
        }
        try {
            const { like } = await apiGet(`/api/buildings/${buildingId}/like.json`);

            setBuildingLikeData(like);
        } catch(error) {
            console.error(error);
            // TODO: add UI for API errors
        }
        setIsOld(false);
    }, [buildingId]);

    useEffect(() => {
        return () => {
            setIsOld(true);
            setBuildingLikeData(undefined);
        };
    }, [buildingId]);

    useEffect(() => {
        if(isOld) {
            fetchData();
        }
    }, [isOld]);

    const reloadData = useCallback(() => setIsOld(true), []);

    return [buildingLikeData, setBuildingLikeData, reloadData];
}
