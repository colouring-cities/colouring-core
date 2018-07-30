/**
 * Client interactions
 */
var map = L.map('map').setView([51.505, -0.09], 14)
OS_API_KEY = "NVUxtY5r8eA6eIfwrPTAGKrAAsoeI9E9"

// Basemap
L.tileLayer('https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Outdoor 3857/{z}/{x}/{y}.png?key='+OS_API_KEY, {
    maxZoom: 20,
    minZoom: 7
}).addTo(map)

// Rendered layer
var vis_tiles = L.tileLayer('/tiles/{z}/{x}/{y}.png', {
    maxZoom: 20,
    minZoom: 14,
    attribution: 'Geometries &copy; Ordnance Survey Crown Copyright, Data &copy; Colouring London contributors;'
})

vis_tiles.addTo(map);

// Query for building on click
map.on('click', function(e){
    console.log(e.latlng)
    const lat = e.latlng.lat
    const lng = e.latlng.lng
    fetch(
        '/buildings?lat='+lat+'&lng='+lng
    ).then(
        response => response.json()
    ).then(function(data){
        console.log(data)
        if (data.geometry_id){
            vis_tiles.setUrl('/tiles/{z}/{x}/{y}.png?highlight='+data.geometry_id)
        }
    })
})
