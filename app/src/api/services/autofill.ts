import db from '../../db';

interface AutofillOption {
    id: string;
    value: string;
    similarity?: number;
}

type GetAutofillOptionsFn = (value: string, all?: boolean) => Promise<AutofillOption[]>;

const autofillFunctionMap : { [fieldName: string] : GetAutofillOptionsFn } = {
    current_landuse_group: getLanduseGroupOptions,
    typology_original_use: getLanduseGroupOptions,
    building_footprint_issues: getBuildingFootprintIssues,
};

function getBuildingFootprintIssues(value: string, all: boolean = false) {
    return [
        {id: "detach", value: "Should be detached from adjacent polygon.", similarity: 1},
        {id: "split", value: "Should be split into two or more buildings.", similarity: 1},
        {id: "remove", value: "Remove thin spikes.", similarity: 1},
        {id: "adjacent", value: "Adjacent building is missing.", similarity: 1},
        {id: "merge", value: "Two or more buildings merged in one polygon.", similarity: 1},
    ]
}

function getLanduseGroupOptions(value: string, all: boolean = false) {
    if(all) {
        return db.manyOrNone(`
            SELECT
                landuse_id AS id,
                description AS value
            FROM reference_tables.buildings_landuse_group
            ORDER BY description
            `
        );
    }

    let query = buildPartialMatchQuery(value);

    return db.manyOrNone(`
        SELECT
            landuse_id AS id,
            description AS value,
            ts_rank(to_tsvector('simple', description), to_tsquery('simple', $1)) AS similarity
        FROM reference_tables.buildings_landuse_group
        WHERE to_tsvector('simple', description) @@ to_tsquery('simple', $1)
        ORDER BY similarity DESC, description
        `, [query]
    );
}

function buildPartialMatchQuery(value: string) {
    return tokenizeValue(value).map(x => `${x}:*`).join(' & ');
}
function tokenizeValue(value: string) {
    return value.split(/[^\w]+/).filter(x => x !== '');
}

export function getAutofillOptions(fieldName: string, fieldValue: any, allValues: boolean) {
    const optionsFn = autofillFunctionMap[fieldName];

    if (optionsFn == undefined) {
        throw new Error(`Autofill options not available for field '${fieldName}'`);
    }

    return optionsFn(fieldValue, allValues);
}
