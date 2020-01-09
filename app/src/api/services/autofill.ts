import db from '../../db';

const autofillFunctionMap = {
    current_landuse_class: getLanduseClassOptions
};

function getLanduseClassOptions(value: string) {
    return db.manyOrNone(`
        SELECT
            landuse_id AS id,
            description as value,
            ts_rank(to_tsvector(description), plainto_tsquery($1)) as similarity
        FROM reference_tables.buildings_landuse_class
        WHERE to_tsvector(description) @@ plainto_tsquery($1)
        ORDER BY similarity DESC, description
        `, [value]
    );
}

export function getAutofillOptions(fieldName: string, fieldValue: any) {
    const optionsFn = autofillFunctionMap[fieldName];

    if (optionsFn == undefined) {
        throw new Error(`Autofill options not available for field '${fieldName}'`);
    }

    return optionsFn(fieldValue);
}
