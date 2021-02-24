import { useCallback, useEffect, useState } from 'react';

import { Building, BuildingAttributeVerificationCounts } from '../models/building';
import { apiGet } from '../apiHelpers';

export function useBuildingData(buildingId: number, preloadedData: Building): [Building, (updatedBuilding: Building) => void, () => void] {
    const [buildingData, setBuildingData] = useState<Building>(preloadedData);
    const [isOld, setIsOld] = useState<boolean>(preloadedData == undefined);

    const fetchData = useCallback(async () => {
        if(buildingId == undefined) {
            setBuildingData(undefined);
            setIsOld(false);
            return;
        }
        try {
            const [building, buildingUprns] = await Promise.all([
                apiGet(`/api/buildings/${buildingId}.json`),
                apiGet(`/api/buildings/${buildingId}/uprns.json`)
            ]);

            building.uprns = buildingUprns.uprns;

            setBuildingData(building);
        } catch(error) {
            console.error(error);
            // TODO: add UI for API errors
        }
        setIsOld(false);
    }, [buildingId]);

    const updateData = useCallback((building: Building) => {
        if(building.verified == undefined) {
            building.verified = {} as BuildingAttributeVerificationCounts;
        }
        setBuildingData(building);
    }, []);

    useEffect(() => {
        return () => {
            setIsOld(true);
        };
    }, [buildingId]);

    useEffect(() => {
        if(isOld) {
            fetchData();
        }
    }, [isOld]);

    const reloadData = useCallback(() => setIsOld(true), []);

    return [buildingData, updateData, reloadData];
}
