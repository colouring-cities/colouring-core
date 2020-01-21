import React, { useEffect, useState } from 'react';

import { apiGet } from '../apiHelpers';
import { BuildingEditSummary } from '../building/edit-history/building-edit-summary';
import InfoBox from '../components/info-box';
import { EditHistoryEntry } from '../models/edit-history-entry';

const ChangesPage = () => {
    const [history, setHistory] = useState<EditHistoryEntry[]>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const {history} = await apiGet(`/api/history`);

            setHistory(history);
        };

        fetchData();
    }, []);
    
    return (
        <article>
            <section className="main-col">
                <h1>Global edit history</h1>

                <ul className="edit-history-list">
                    {(history == undefined || history.length == 0) ?
                        <InfoBox msg="No changes in the last week"></InfoBox> :
                        history.map(entry => (
                            <li key={`${entry.revision_id}`} className="edit-history-list-element">
                                <BuildingEditSummary
                                    historyEntry={entry}
                                    showBuildingId={true}
                                    hyperlinkCategories={true}
                                />
                            </li>
                        ))
                    }
                </ul>
            </section>
        </article>
    );
};

export default ChangesPage;
