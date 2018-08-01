/**
 * Dev server for local development 
 * - serve static files from frontend
 * - proxy /api calls to 8081
 * - proxy /tiles calls to 8082
 */
const path = require('path')

const express = require('express')
const proxy = require('express-http-proxy');

const app = express()
app.use(express.static(path.join(__dirname, '..', 'frontend')))
app.use('/api', proxy('localhost:8081'))
app.use('/tiles', proxy('localhost:8082'))

app.listen(8080, () => console.log('Dev server listening on port 8080...'))
