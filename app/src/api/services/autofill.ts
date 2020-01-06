import db from '../../db';

const autofillFunctionMap = {
    current_landuse_class: getLanduseClassOptions
};

function getLanduseClassOptions(value: string) {
    return db.manyOrNone(`
        SELECT landuse_id AS id, description as value, similarity(description, $1) AS similarity
        FROM reference_tables.building_landuse_class
        WHERE description % $1
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
