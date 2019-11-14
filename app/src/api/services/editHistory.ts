import db from '../../db';

async function getGlobalEditHistory() {
    try {
        return await db.manyOrNone(
            `SELECT log_id as revision_id, forward_patch, reverse_patch, date_trunc('minute', log_timestamp), username, building_id
            FROM logs, users
            WHERE logs.user_id = users.user_id
                AND log_timestamp >= now() - interval '21 days'
            ORDER BY log_timestamp DESC`
        );
    } catch (error) {
        console.error(error);
        return [];
    }
}


export {
    getGlobalEditHistory
};
