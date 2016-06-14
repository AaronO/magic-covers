var magic = require('./lib/');
var covers = require('./lib/covers');
var path = magic.render.path;
var randInt = magic.random.int;
var choice = magic.random.choice;
var circle = magic.points.circle;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d', {alpha: false});

/*
ctx.fillStyle = "#fff";
ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);

ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);

var poly = magic.points.polygon(30, 6);

ctx.globalAlpha = 0.5;

var colors = magic.palette.pastel(3);
//var colors = magic.random.shuffle(magic.colors.ios).slice(0, 3);

var drawI = 0;
function draw() {
    //ctx.fillStyle = choice(colors);
    ctx.fillStyle = colors[drawI%colors.length];
    ctx.fill(path(poly));
    drawI++;
}

function drawP(p, n) {
    ctx.save();
    var x = p[0], y = p[1];

    ctx.translate(x, y);

    draw();
    if(n > 0) {
        subdraw(n-1);
    }

    ctx.restore();
}

function subdraw(n) {
    poly.forEach(function(p) {
        drawP(p, n-1);
    });
}


subdraw(5);
*/
covers.packed(ctx);
