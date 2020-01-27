import db from '../../db';
import { EditHistoryEntry } from '../../frontend/models/edit-history-entry';

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

export function getHistoryAfterId(id: string, count: number): Promise<EditHistoryEntry[]> {
    /** 
     * SQL with lower time bound specified (records after ID).
     * The outer SELECT is so that final results are sorted by descending ID
     * (like the other queries). The inner select is sorted in ascending order
     * so that the right rows are returned when limiting the result set.
     */
    return db.manyOrNone(`
        SELECT * FROM (
            ${baseQuery}
            WHERE log_id > $1
            ORDER BY log_id ASC
            LIMIT $2
        ) AS result_asc ORDER BY log_id DESC`,
        [id, count]
    );
}

export function getHistoryBeforeId(id: string, count: number): Promise<EditHistoryEntry[]> {
    return db.manyOrNone(`
        ${baseQuery}
        WHERE log_id < $1
        ORDER BY log_id DESC
        LIMIT $2
    `, [id, count]);
}

export async function getLatestHistory(count: number) : Promise<EditHistoryEntry[]> {
    return await db.manyOrNone(`
        ${baseQuery}
        ORDER BY log_id DESC
        LIMIT $1
    `, [count]);
}

export async function getIdOlderThan(id: string): Promise<string> {
    return await db.oneOrNone(`
        SELECT MAX(log_id) as log_id
        FROM logs
        WHERE log_id < $1
    `, [id]);
}

export async function getIdNewerThan(id: string): Promise<string> {
    return await db.oneOrNone(`
        SELECT MIN(log_id) as log_id
        FROM logs
        WHERE log_id > $1
    `, [id]);
}
