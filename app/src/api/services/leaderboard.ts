import db from '../../db';

async function getLeaders(number_limit: number, time_limit: number) {
    // Hard constraint on number of users returned
    const max_limit = 100;
    number_limit = Math.min(number_limit, max_limit);

    try {
        let leaders;
        if(time_limit > 0){
            leaders = await db.manyOrNone(
                `SELECT count(log_id) as number_edits, username
                FROM logs, users
                WHERE logs.user_id = users.user_id
                AND CURRENT_TIMESTAMP::DATE - log_timestamp::DATE <= $1
                        AND NOT (users.username = 'casa_friendly_robot')
                        AND NOT (users.username = 'colouringlondon')
                GROUP by users.username
                ORDER BY number_edits DESC
                LIMIT $2`, [time_limit, number_limit]
            );
        } else {
            leaders = await db.manyOrNone(
                `SELECT count(log_id) as number_edits, username
                FROM logs, users
                WHERE logs.user_id = users.user_id
                        AND NOT (users.username = 'casa_friendly_robot')
                        AND NOT (users.username = 'colouringlondon')
                GROUP by users.username
                ORDER BY number_edits DESC
                LIMIT $1`, [number_limit]
            );
        }
        return leaders.map(d => {
            return {username: d.username, number_edits: Number(d.number_edits)};
        })
    } catch(error) {
        console.error(error);
        return [];
    }
}


export {
    getLeaders
};
