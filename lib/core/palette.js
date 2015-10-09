var hsla = require('./colors').hsla;
var random = require('./random');

var golden_ratio = 0.618033988749895;

function pastel(n) {
    n = n || 10;

    // Random starting hue
    var h = random();

    var colors = [];
    for(var i = 0; i < n; i++) {
        colors.push(
            hsla((h+golden_ratio*i)%1, 0.5, 0.6, 1)
        );
    }

    return colors;
}

exports.pastel = pastel;
