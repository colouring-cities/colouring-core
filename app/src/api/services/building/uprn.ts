import db from '../../../db';

export async function getBuildingUPRNsById(id: number) {
    try {
        return await db.any(
            'SELECT uprn, parent_uprn FROM building_properties WHERE building_id = $1',
            [id]
        );
    } catch(error) {
        console.error(error);
        return undefined;
    }
}