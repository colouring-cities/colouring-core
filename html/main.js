/**
 * Simple carousel
 *
 * Based on example code by Christian Heilmann
 * http://christianheilmann.com/2015/04/08/keeping-it-simple-coding-a-carousel/
 */
carousel = function(){
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
 * "Cut the mustard" and setup page
 */
if('querySelector' in document
   && 'addEventListener' in window) {
    carousel();
}
