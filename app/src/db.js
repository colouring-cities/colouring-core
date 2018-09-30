/**
 * Expose query interface to database pool
 *
 * - connection details must be set in environment variables, default to:
 *      PGHOST='localhost'
 *      PGUSER=process.env.USER
 *      PGDATABASE=process.env.USER
 *      PGPASSWORD=null
 *      PGPORT=5432
 */
import pg from 'pg-promise';

// pg-promise, can provide initialisation options
const pgp = pg();
// database connection, can provide connection string or object (should default to env vars)
const db = pgp();

export default db;
