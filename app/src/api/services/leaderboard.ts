import db from '../../db';

async function getLeaders(number_limit: number, time_limit: number) {
    try {
        if(time_limit > 0){
	    return await db.manyOrNone(
		`SELECT count(log_id) as number_edits, username
		FROM logs, users
		WHERE logs.user_id=users.user_id
		AND CURRENT_TIMESTAMP::DATE - log_timestamp::DATE <= $1
                AND NOT (users.username = 'casa_friendly_robot') 
                AND NOT (users.username = 'colouringlondon')
		GROUP by users.username
		ORDER BY number_edits DESC
		LIMIT $2`, [number_limit, time_limit]
	    );
			
	}else{
	    return await db.manyOrNone(
		`SELECT count(log_id) as number_edits, username 
		FROM logs, users 
		WHERE logs.user_id=users.user_id
                AND NOT (users.username = 'casa_friendly_robot') 
                AND NOT (users.username = 'colouringlondon')
		GROUP by users.username
		ORDER BY number_edits DESC
		LIMIT $1`, [number_limit]
            );
	}
    } catch(error) {
	console.error(error);
	return [];
    }
}


export {
    getLeaders
};
