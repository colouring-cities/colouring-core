import React, { useEffect, useState } from 'react';

import './edit-history.css';

import { apiGet } from '../../apiHelpers';
import { Building } from '../../models/building';
import { EditHistoryEntry } from '../../models/edit-history-entry';
import ContainerHeader from '../container-header';

import { BuildingEditLatest } from './building-edit-latest';

interface EditHistoryLatestProps {
    building: Building;
}

const EditHistoryLatest: React.FunctionComponent<EditHistoryLatestProps> = (props) => {
    const [history, setHistory] = useState<EditHistoryEntry[]>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const {history} = await apiGet(`/api/buildings/${props.building.building_id}/history.json`);

            setHistory(history);
        };

        if (props.building != undefined) { // only call fn if there is a building provided
            fetchData(); // define and call, because effect cannot return anything and an async fn always returns a Promise
        }
    }, [props.building]); // only re-run effect on building prop change
    
    return (
        <>
            <ul className="edit-history-first" id="first-only">
                {history && history.map(entry => (
                    <li key={`${entry.revision_id}`} className="edit-history-list-element">
                        <BuildingEditLatest historyEntry={entry} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export {
    EditHistoryLatest
};
