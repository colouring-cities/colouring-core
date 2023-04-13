import db from '../../db';

export async function isMaterialAllowed(group: string): Promise<boolean> {
    let groupResult = await db.oneOrNone(`
        SELECT * 
        FROM (
            SELECT unnest(enum_range(NULL::construction_materials)) AS value
            ) AS value
        WHERE value = $1
        `, [group]
    );

    return (groupResult != undefined);
}
