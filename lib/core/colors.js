// http://designmodo.com/wp-content/uploads/2014/03/iOS7-colors-pallette.jpg
var ios = [
    "#5856d6",
    "#007aff",
    "#34aadc",
    "#5ac8fa",
    "#4cd964",
    "#ff2d55",
    "#ff3b30",
    "#ff9500",
    "#ffcc00",
    "#8e8e93"
];


function rgba(r, g, b, a) {
    var colors = [r,g,b].map(function(x) {
        return Math.floor(255*x);
    }).join(', ');

    return "rgba("+colors+", "+a+")";
}

function hsla(h, s, l, a) {
    var colors = [
        Math.floor(h*360),
        Math.floor(s*100)+'%',
        Math.floor(l*100)+'%',
    ].join(', ');

    return "hsla("+colors+", "+a+")";
}

exports.ios = ios;
exports.rgba = rgba;
exports.hsla = hsla;
