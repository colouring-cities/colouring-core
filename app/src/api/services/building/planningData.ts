import db from '../../../db';

export async function getBuildingPlanningDataById(id: number) {
    try {
        return await db.any(
            'SELECT building_properties.uprn, building_properties.building_id, planning_data.description, planning_data.status, planning_data.uprn, planning_data.planning_application_id, planning_application_link, to_char(planning_data.registered_with_local_authority_date, \'YYYY-MM-DD\') AS registered_with_local_authority_date, to_char(planning_data.decision_date, \'YYYY-MM-DD\') AS decision_date, to_char(planning_data.last_synced_date, \'YYYY-MM-DD\') AS last_synced_date, planning_data.data_source, planning_data.data_source_link \
            FROM building_properties \
            INNER JOIN planning_data ON \
            building_properties.uprn = planning_data.uprn WHERE building_id = $1',
            [id]
        );
    } catch(error) {
        console.error(error);
        return undefined;
    }
}
