var magic = require('./lib/');
var path = magic.render.path;
var randInt = magic.random.int;
var choice = magic.random.choice;
var circle = magic.points.circle;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Pairs of N & B for common galaxy spirals
// Ref: http://arxiv.org/pdf/0908.0892.pdf
var galaxyTypes = [
    // N, B
    [8, 0.05],
    [4, 0.5],
    [4, 1],
    [2, 5],
];

ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);

ctx.fillStyle = ctx.strokeStyle = choice(magic.colors.ios);
magic.render.antialias(ctx, function() {
    var params = choice(galaxyTypes);
    var N = params[0];
    var B = params[1];
    var RADIUS = 200;
    var POINTS = 200;

    // Randomly rotate everything
    ctx.rotate(randInt(24)*Math.PI/12);

    // Get galaxy's points
    var points = magic.points.galaxy(RADIUS, N, B, POINTS);
    
    // Draw
    ctx.stroke(path(points));
    points.forEach(function(p) {
        ctx.fillStyle = ctx.strokeStyle = choice(magic.colors.ios);
        magic.render.shift(ctx, p[0]+randInt(-3, 3), p[1]+randInt(-3, 3), function() {
            ctx.fill(path(circle(randInt(1, 6))));
        });
    });
});