import db from '../../db';
import { EditHistoryEntry } from '../../frontend/models/edit-history-entry';
import { DatabaseError } from '../errors/general';

const baseQuery = `
        SELECT
            log_id as revision_id,
            forward_patch,
            reverse_patch,
            date_trunc('minute', log_timestamp) as revision_timestamp,
            username,
            building_id
        FROM logs
        JOIN users ON logs.user_id = users.user_id`;

const deletionCondition = `
    EXISTS (SELECT * from jsonb_each(forward_patch) WHERE value = 'null' )
`;

export function getHistoryAfterId(id: string, count: number, filterDeletions: boolean = false): Promise<EditHistoryEntry[]> {
    /** 
     * SQL with lower time bound specified (records after ID).
     * The outer SELECT is so that final results are sorted by descending ID
     * (like the other queries). The inner select is sorted in ascending order
     * so that the right rows are returned when limiting the result set.
     */
    try {
        return db.any(`
            SELECT * FROM (
                ${baseQuery}
                WHERE log_id > $1
                ${filterDeletions ? 'AND ' + deletionCondition : ''}
                ORDER BY revision_id ASC
                LIMIT $2
            ) AS result_asc ORDER BY revision_id DESC`,
            [id, count]
        );
    } catch(err) {
        throw new DatabaseError(err);
    }
}

export function getHistoryBeforeId(id: string, count: number, filterDeletions: boolean = false): Promise<EditHistoryEntry[]> {
    try {
        if(id == undefined) {
            
            return db.any(`
                ${baseQuery}
                ${filterDeletions ? 'WHERE' + deletionCondition : ''}
                ORDER BY revision_id DESC
                LIMIT $1
            `, [count]);
            
        } else {
            
            return db.any(`
                ${baseQuery}
                WHERE log_id < $1
                ${filterDeletions ? 'AND ' + deletionCondition : ''}
                ORDER BY revision_id DESC
                LIMIT $2
            `, [id, count]);
        }
    } catch(err) {
        throw new DatabaseError(err);
    }
}

export async function getIdOlderThan(id: string): Promise<string> {
    try {
        const result = await db.oneOrNone<{revision_id:string}>(`
            SELECT MAX(log_id) as revision_id
            FROM logs
            WHERE log_id < $1
        `, [id]);

        return result?.revision_id;
    } catch(err) {
        throw new DatabaseError(err);
    }
}

export async function getIdNewerThan(id: string): Promise<string> {
    try {
        const result = await db.oneOrNone<{revision_id:string}>(`
            SELECT MIN(log_id) as revision_id
            FROM logs
            WHERE log_id > $1
        `, [id]);

        return result?.revision_id;
    } catch(err) {
        throw new DatabaseError(err);
    }
}
