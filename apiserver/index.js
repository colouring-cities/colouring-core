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
        `SELECT 
        b.building_id as id, 
        b.building_doc as doc, 
        g.geometry_id as geometry_id
        FROM buildings as b, geometries as g
        WHERE
        b.geometry_id = g.geometry_id
        AND
        ST_Intersects(
            ST_Transform(
                ST_SetSRID(ST_Point($1, $2), 4326),
                3857
            ),
            g.geometry_geom
        )
        LIMIT 1
        `,
        [lng, lat]
    ).then(function(data){
        const rows = data.rows
        if (rows.length){
            const id = rows[0].id
            const doc = rows[0].doc
            const geometry_id = rows[0].geometry_id
            console.log(lng, lat, id)
            doc.id = id
            doc.geometry_id = geometry_id
            res.send(doc)
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