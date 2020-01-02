import React, { useEffect, useState } from 'react';

import './edit-history.css';

import { apiGet } from '../../apiHelpers';
import { Building } from '../../models/building';
import { EditHistoryEntry } from '../../models/edit-history-entry';
import ContainerHeader from '../container-header';

import { BuildingEditSummary } from './building-edit-summary';

interface EditHistoryProps {
    building: Building;
}

const EditHistory: React.FunctionComponent<EditHistoryProps> = (props) => {
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
            <ContainerHeader title="Edit history" backLink='.' cat='edit-history' />

            <ul className="edit-history-list">
                {history && history.map(entry => (
                    <li key={`${entry.revision_id}`} className="edit-history-list-element">
                        <BuildingEditSummary historyEntry={entry} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export {
    EditHistory
};
