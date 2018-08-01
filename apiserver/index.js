/**
 * Serve API
 */
const express = require('express')

// db connection pool
const db = require('./db')

// set up app
const app = express()

// building geometry by lat/lon - TODO join geometry against buildings
app.get('/buildings', function(req, res){
    const { lng, lat } = req.query
    db.query(
        `SELECT geometry_id
        FROM geometries
        WHERE
        ST_Intersects(
            ST_Transform(
                ST_SetSRID(ST_Point($1, $2), 4326),
                3857
            ),
            geometries.geometry_geom
        )
        `,
        [lng, lat]
    ).then(function(data){
        const rows = data.rows
        if (rows.length){
            const geometry_id = rows[0].geometry_id
            console.log(lng, lat, geometry_id)
            res.send({geometry_id: geometry_id})
        } else {
            console.log(lng, lat, undefined)
            res.status(404).send({error:'Not Found'})
        }
    }).catch(function(error){
        console.error('Error:', error)
        res.status(500).send({error:'Database error'})
    })
})

app.listen(8081, () => console.log('API server listening on port 8081'))