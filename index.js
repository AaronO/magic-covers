var magic = require('./lib/');
var covers = require('./lib/covers');
var path = magic.render.path;
var randInt = magic.random.int;
var choice = magic.random.choice;
var circle = magic.points.circle;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d', {alpha: false});

covers.oreally(ctx);
