import React from 'react';
import { Link } from 'react-router-dom';

import './building-edit-summary.css';

import { dataFields } from '../../data_fields';
import { arrayToDictionary, parseDate } from '../../helpers';
import { EditHistoryEntry } from '../../models/edit-history-entry';

import { CategoryEditSummary } from './category-edit-summary';

interface BuildingEditSummaryProps {
    historyEntry: EditHistoryEntry;
    showBuildingId?: boolean;
    hyperlinkCategories?: boolean;
}

function formatDate(dt: Date) {
    return dt.toLocaleString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

const BuildingEditSummary: React.FunctionComponent<BuildingEditSummaryProps> = ({
    historyEntry,
    showBuildingId = false,
    hyperlinkCategories = false
}) => {
    const entriesWithMetadata = Object
            .entries(historyEntry.forward_patch)
            .map(([key, value]) => {
                const info = dataFields[key] || {};
                return {
                    title: info.title || `Unknown field (${key})`,
                    category: info.category || 'Unknown',
                    value: value,
                    oldValue: historyEntry.reverse_patch && historyEntry.reverse_patch[key]
                };
            });
    const entriesByCategory = arrayToDictionary(entriesWithMetadata, x => x.category);

    const categoryHyperlinkTemplate = hyperlinkCategories && historyEntry.building_id != undefined ?
            `/edit/$category/${historyEntry.building_id}` :
            undefined;

    return (
        <div className="edit-history-entry">
            <h2 className="edit-history-timestamp">Edited on {formatDate(parseDate(historyEntry.date_trunc))}</h2>
            <h3 className="edit-history-username">By {historyEntry.username}</h3>
            {
                showBuildingId && historyEntry.building_id != undefined &&
                <h3 className="edit-history-building-id">
                    Building <Link to={`/edit/categories/${historyEntry.building_id}`}>{historyEntry.building_id}</Link>
                </h3>
            }
            {
                Object.entries(entriesByCategory).map(([category, fields]) => 
                    <CategoryEditSummary
                        category={category}
                        fields={fields}
                        hyperlinkCategory={hyperlinkCategories}
                        hyperlinkTemplate={categoryHyperlinkTemplate}
                    />
                )
            }
        </div>
    );
};

export {
    BuildingEditSummary
};
