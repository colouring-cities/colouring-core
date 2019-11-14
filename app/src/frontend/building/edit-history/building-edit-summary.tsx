import React from 'react';
import { Link } from 'react-router-dom';

import './building-edit-summary.css';

import { Category, DataFieldDefinition, dataFields } from '../../data_fields';
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

function enrichHistoryEntries(forwardPatch: object, reversePatch: object) {
    return Object
        .entries(forwardPatch)
        .map(([key, value]) => {
            const info = dataFields[key] || {} as DataFieldDefinition;
            return {
                title: info.title || `Unknown field (${key})`,
                category: info.category || Category.Unknown,
                value: value,
                oldValue: reversePatch && reversePatch[key]
            };
        });
}

const BuildingEditSummary: React.FunctionComponent<BuildingEditSummaryProps> = ({
    historyEntry,
    showBuildingId = false,
    hyperlinkCategories = false
}) => {
    const entriesWithMetadata = enrichHistoryEntries(historyEntry.forward_patch, historyEntry.reverse_patch);
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
                        category={category as keyof typeof Category} // https://github.com/microsoft/TypeScript/issues/14106
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
