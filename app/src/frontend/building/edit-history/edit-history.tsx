import React, { useState, useEffect } from 'react';
import { EditHistoryEntry } from '../models/edit-history-entry';
import { BuildingEditSummary } from './building-edit-summary';

import './edit-history.css';
import { Building } from '../../models/building';
import ContainerHeader from '../container-header';

interface EditHistoryProps {
    building: Building;
}

const EditHistory: React.FunctionComponent<EditHistoryProps> = (props) => {
    const [history, setHistory] = useState<EditHistoryEntry[]>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/buildings/${props.building.building_id}/history.json`);
            const data = await res.json();

            setHistory(data.history);
        };

        if (props.building != undefined) { // only call fn if there is a building provided
            fetchData(); // define and call, because effect cannot return anything and an async fn always returns a Promise
        }
    }, [props.building]); // only re-run effect on building prop change
    
    return (
        <>
            <ContainerHeader title="Edit history" backLink='.' />

            <ul className="edit-history-list">
                {history && history.map(entry => (
                    <li key={`${entry.revision_id}`} className="edit-history-list-element">
                        <BuildingEditSummary historyEntry={entry} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export {
    EditHistory
};
