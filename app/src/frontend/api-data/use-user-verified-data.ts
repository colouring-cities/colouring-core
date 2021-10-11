import { useCallback, useEffect, useState } from 'react';

import { UserVerified } from '../models/building';
import { apiGet } from '../apiHelpers';

export function useUserVerifiedData(buildingId: number, preloadedData: UserVerified): [UserVerified, (updatedBuilding: UserVerified) => void, () => void] {
    const [userVerifyData, setUserVerifyData] = useState<UserVerified>(preloadedData);
    const [isOld, setIsOld] = useState<boolean>(preloadedData == undefined);

    const fetchData = useCallback(async () => {
        if(buildingId == undefined) {
            setUserVerifyData(undefined);
            setIsOld(false);
            return;
        }
        try {
            const userVerify = await apiGet(`/api/buildings/${buildingId}/verify.json`);

            setUserVerifyData(userVerify);
        } catch(error) {
            console.error(error);
            // TODO: add UI for API errors
        }
        setIsOld(false);
    }, [buildingId]);

    useEffect(() => {
        return () => {
            setIsOld(true);
        }
    }, [buildingId]);

    useEffect(() => {
        if(isOld) {
            fetchData();
        }
    }, [isOld])

    return [userVerifyData, setUserVerifyData, () => setIsOld(true)];
}
