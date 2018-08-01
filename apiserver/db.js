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
const { Pool } = require('pg')

const pool = new Pool()

module.exports = {
  query: (text, params) => pool.query(text, params)
}
