/**
 * Background map
 */
function map(){
    // Rendered layer
    var data_layers = {}
    var data_layer_names = ["size_storeys", "date_year"]
    var active_data_layer = "date_year"
    var name;
    for (var index = 0; index < data_layer_names.length; index++) {
        name = data_layer_names[index];

        data_layers[name] = L.tileLayer('/tiles/'+name+'/{z}/{x}/{y}.png', {
            maxZoom: 20,
            minZoom: 14
        })
        data_layers[name].setZIndex(10);

        var el = document.querySelector('a[data-map="'+name+'"]')
        if (!el){
            continue;
        }
        el.addEventListener("click", function(e){
            e.preventDefault();
            var layer = e.target.dataset.map
            if (active_data_layer !== layer){
                map.removeLayer(data_layers[active_data_layer])
                data_layers[layer].addTo(map)
                active_data_layer = layer
            }
        })
    }
    data_layers[active_data_layer].addTo(map);

    var highlight_layer = L.tileLayer('/tiles/highlight/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 14
    })
    highlight_layer.setZIndex(20);
    var highlight_layer_added = false;

    // Query for building on click
    map.on('click', function(e){
        var lat = e.latlng.lat
        var lng = e.latlng.lng
        fetch(
            '/api/buildings?lat='+lat+'&lng='+lng+'&field='+active_data_layer
        ).then(function(response){
            return response.json()
        }).then(function(data){
            if (data.geometry_id){
                highlight_layer.setUrl('/tiles/highlight/{z}/{x}/{y}.png?highlight='+data.geometry_id)
            } else {
                map.removeLayer(highlight_layer)
                highlight_layer_added = false
            }
            if (!highlight_layer_added && data.geometry_id){
                highlight_layer.addTo(map);
            }
            var preview_el = document.getElementById('building-detail');
            if (data.error){
                preview_el.textContent = 'Click a building to see data';
            } else {
                preview_el.textContent = JSON.stringify(data, ["id", active_data_layer], 2);
            }
        })
    })
}

/**
 * Simple carousel
 *
 * Based on example code by Christian Heilmann
 * http://christianheilmann.com/2015/04/08/keeping-it-simple-coding-a-carousel/
 */
function carousel(){
    var box = document.querySelector('.carousel');
    if (!box) {
        return
    }
    var next = box.querySelector('.next');
    var prev = box.querySelector('.back');
    // Define the global counter, the items and the
    // current item
    var counter = 0;
    var items = box.querySelectorAll('.carousel-content li');
    var amount = items.length;
    var current = items[0];
    box.classList.add('active');
    // navigate through the carousel
    function navigate(direction) {
        // hide the old current list item
        current.classList.remove('current');

        // calculate the new position
        counter = (counter + direction) % amount;
        counter = counter < 0 ? amount - 1 : counter;
        // set new current element
        // and add CSS class
        current = items[counter];
        current.classList.add('current');
    }
    // add event handlers to buttons
    next.addEventListener('click', function(ev) {
        navigate(1);
    });
    prev.addEventListener('click', function(ev) {
        navigate(-1);
    });
    // show the first element
    // (when direction is 0 counter doesn't change)
    navigate(0);
}

/**
 * Expand/collapse
 *
 * Create a toggle with:
 *   - data-toggle="collapse"
 *   - data-target="<CSS-selector>"
 * E.g.
 *   <button data-toggle="collapse" data-target="#section1">Toggle 1<button>
 *   <div id="section1">...</div>
 */
function collapse(){
    var toggles = document.querySelectorAll('[data-toggle="collapse"]')
    if(!toggles.length){
        return
    }
    function toggle_collapse(e){
        e.preventDefault()
        var toggle = e.target
        var targets = document.querySelectorAll(toggle.dataset.target)
        for (let index = 0; index < targets.length; index++) {
            const target = targets[index];
            const now_showing = target.classList.toggle('show')
            if (now_showing){
                toggle.classList.add('toggled-on')
            } else {
                toggle.classList.remove('toggled-on')
            }
        }
    }
    for (let index = 0; index < toggles.length; index++) {
        const toggle = toggles[index];
        toggle.addEventListener("click", toggle_collapse)
    }
}

/**
 * Intro interactions
 */
function intro(){
    var welcome = document.querySelector('.welcome-float')
    var info = document.querySelector('.info-container')
    var links = document.querySelectorAll('a[href="maps.html"]')
    if(!welcome || !info || !links.length){
        return;
    }
    function from_intro_to_maps(e){
        e.preventDefault()
        welcome.classList.add('offscreen')
        window.setTimeout(function(){
            welcome.classList.add('remove')
            info.classList.remove('offscreen')
            window.history.pushState({}, 'Maps', 'maps.html')

            for (let index = 0; index < links.length; index++) {
                const link = links[index];
                link.classList.add('active')
            }
        }, 400)
    }
    for (let index = 0; index < links.length; index++) {
        const link = links[index];
        link.addEventListener("click", from_intro_to_maps)
    }

}

/**
 * "Cut the mustard" and setup page
 */
if('querySelector' in document
   && 'addEventListener' in window) {
    carousel();
    map();
    intro();
    collapse();
}
