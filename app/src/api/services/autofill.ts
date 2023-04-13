import db from '../../db';

interface AutofillOption {
    id: string;
    value: string;
    similarity?: number;
}

type GetAutofillOptionsFn = (value: string, all?: boolean) => Promise<AutofillOption[]>;

const autofillFunctionMap : { [fieldName: string] : GetAutofillOptionsFn } = {
    current_landuse_group: getLanduseGroupOptions,
    construction_secondary_materials: getConstructionMaterialOptions,
};

function getConstructionMaterialOptions(value: string, all: boolean = false) {
    return db.manyOrNone(`SELECT * FROM (
        SELECT unnest(enum_range(NULL::construction_materials)) AS value) AS materials_from_enum 
        CROSS JOIN (SELECT '' AS id) AS dummy
    `)
}


function getLanduseGroupOptions(value: string, all: boolean = false) {
    if(all) {
        return db.manyOrNone(`
            SELECT
                landuse_id AS id,
                description AS value
            FROM reference_tables.buildings_landuse_group
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
