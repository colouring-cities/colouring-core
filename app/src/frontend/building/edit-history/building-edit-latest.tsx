import React from 'react';
import { Link } from 'react-router-dom';

import './building-edit-summary.css';

import { Category } from '../../config/categories-config';
import { DataFieldDefinition, dataFields } from '../../config/data-fields-config';
import { arrayToDictionary, parseDate } from '../../helpers';
import { EditHistoryEntry } from '../../models/edit-history-entry';

import { CategoryEditSummary } from './category-edit-summary';

interface BuildingEditLatestProps {
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
            const {
                title = `Unknown field (${key})`,
                category = undefined
            } = dataFields[key] as DataFieldDefinition ?? {};
            
            return {
                title,
                category,
                value,
                oldValue: reversePatch && reversePatch[key]
            };
        });
}

const BuildingEditLatest: React.FunctionComponent<BuildingEditLatestProps> = ({
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
        <h2 className="edit-history-timestamp">Building last edited on {formatDate(parseDate(historyEntry.revision_timestamp))}</h2>
    );
};

export {
    BuildingEditLatest
};
