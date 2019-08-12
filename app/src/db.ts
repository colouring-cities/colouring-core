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
// database connection (default to env vars)
const db = pgp({
    'host': process.env.PGHOST,
    'database': process.env.PGDATABASE,
    'user': process.env.PGUSER,
    'password': process.env.PGPASSWORD,
    'port': parseInt(process.env.PGPORT)
});

export default db;
