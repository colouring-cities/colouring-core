import { useCallback, useEffect, useState } from 'react';

import { Building, BuildingAttributeVerificationCounts } from '../models/building';
import { apiGet } from '../apiHelpers';

/**
 * 
 * @param buildingId Requested building ID
 * @param preloadedData Data preloaded through SSR, to return before the request is first sent
 * @param includeUserAttributes Should the building-user attributes be included in the result? This requires login session cookies to be present
 * @returns 
 */
export function useBuildingData(buildingId: number, preloadedData: Building, includeUserAttributes: boolean = false): [Building, (updatedBuilding: Building) => void, () => void] {
    const [buildingData, setBuildingData] = useState<Building>(preloadedData);
    const [isOld, setIsOld] = useState<boolean>(preloadedData == undefined);

    const fetchData = useCallback(async () => {
        if(buildingId == undefined) {
            setBuildingData(undefined);
            setIsOld(false);
            return;
        }
        try {
            let [building, buildingUprns] = await Promise.all([
                apiGet(`/api/buildings/${buildingId}.json${includeUserAttributes ? '?user_attributes=true' : ''}`),
                apiGet(`/api/buildings/${buildingId}/uprns.json`)
            ]);

            building.uprns = buildingUprns.uprns;
            building = Object.assign(building, {...building.user_attributes});
            delete building.user_attributes;

            setBuildingData(building);
        } catch(error) {
            console.error(error);
            // TODO: add UI for API errors
        }
        setIsOld(false);
    }, [buildingId]);

    const updateData = useCallback((building: Building) => {
        if(building == undefined) {
            setBuildingData(building);
        } else {
            if(building.verified == undefined) {
                building.verified = {} as BuildingAttributeVerificationCounts;
            }
            setBuildingData(building);
        }
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
