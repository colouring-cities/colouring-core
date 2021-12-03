import { useCallback, useEffect, useState } from 'react';

import { apiGet } from '../apiHelpers';

export function useRevisionId(initialRevisionId: string): [string, (newId: string) => void, () => void] {
    const [revisionId, setRevisionId] = useState(initialRevisionId ?? '0');
    const [isOld, setIsOld] = useState(initialRevisionId == undefined);

    const updateRevisionId = useCallback(
        (newId: string) => newId != undefined && +newId > +revisionId && setRevisionId(newId),
        [revisionId]
    );
    
    useEffect(() => {
        async function fetchLatestRevision() {
            try {
                const { revision_id: latestRevisionId } = await apiGet(`/api/buildings/revision`);
                updateRevisionId(latestRevisionId);
            } catch(err) {
                console.error(err);
            }
            setIsOld(false);
        }

        if(isOld) {
            fetchLatestRevision();
        }
    }, [isOld]);

    const reloadRevisionId = useCallback(() => setIsOld(true), []);

    return [revisionId, updateRevisionId, reloadRevisionId];
}
