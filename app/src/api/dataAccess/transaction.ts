import { ITask } from 'pg-promise';

import db from '../../db';

// Create a transaction mode (serializable, read-write):
const serializableMode = new db.$config.pgp.txMode.TransactionMode({
    tiLevel: db.$config.pgp.txMode.isolationLevel.serializable,
    readOnly: false
});

export function startUpdateTransaction<T>(cb: (t: ITask<any>) => Promise<T>): Promise<T> {
    return db.tx({mode: serializableMode}, cb);
}