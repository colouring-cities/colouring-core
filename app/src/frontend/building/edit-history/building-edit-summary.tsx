import React from 'react';

import { dataFields } from '../../data_fields';
import { arrayToDictionary, parseDate } from '../../helpers';
import { EditHistoryEntry } from '../../models/edit-history-entry';

import { CategoryEditSummary } from './category-edit-summary';

import './building-edit-summary.css';

interface BuildingEditSummaryProps {
    historyEntry: EditHistoryEntry;
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

const BuildingEditSummary: React.FunctionComponent<BuildingEditSummaryProps> = props => {
    const entriesWithMetadata = Object
            .entries(props.historyEntry.forward_patch)
            .map(([key, value]) => {
                const info = dataFields[key] || {};
                return {
                    title: info.title || `Unknown field (${key})`,
                    category: info.category || 'Unknown category',
                    value: value,
                    oldValue: props.historyEntry.reverse_patch && props.historyEntry.reverse_patch[key]
                };
            });
    const entriesByCategory = arrayToDictionary(entriesWithMetadata, x => x.category);


    return (
        <div className="edit-history-entry">
            <h2 className="edit-history-timestamp">Edited on {formatDate(parseDate(props.historyEntry.date_trunc))}</h2>
            <h3 className="edit-history-username">By {props.historyEntry.username}</h3>
            {
                Object.entries(entriesByCategory).map(([category, fields]) => <CategoryEditSummary category={category} fields={fields} />)
            }
        </div>
    );
};

export {
    BuildingEditSummary
};
