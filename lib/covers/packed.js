// Colors
var orange = "#F89422";
var black  = "#221E1F";
var white  = "#fff";

var render = require('../core/render');

var title 

module.exports = function(ctx) {
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;

    // BG
    render.rectangle(ctx, [0, 0, w, h], black);

    // Footer
    render.rectangle(ctx, [0, h*10/11, w, h*1/11], orange);

    // Separator
    render.rectangle(ctx, [w/12, h/2, w, h/30], orange);

    // Title
    render.antialias(ctx, function() {
        ctx.translate(w/12, h/2+h/30);
        ctx.font = "30px ArialMT";
        ctx.fillStyle = white;
        ctx.fillText("Modern JS Frameworks", 10,50);
    });

    // Description
    render.antialias(ctx, function() {
        ctx.translate(w/12, h*8/11);
        ctx.font = "14px Arial";
        ctx.fillStyle = orange;
        ctx.fillText("Modern JS Frameworks",10,50);
    });

    render.ctxDo(ctx, function() {
        drawGalaxy(ctx);
    });
};

function drawGalaxy(ctx) {
    var magic = require('../core/');
    var path = magic.render.path;
    var randInt = magic.random.int;
    var choice = magic.random.choice;
    var circle = magic.points.circle;

    var galaxyTypes = [
        // N, B
        [2, 0.5],
        [4, 0.5],
        [4, 1],
        [2, 5],
    ];

    var w = ctx.canvas.width;
    var h = ctx.canvas.height;

    ctx.translate(w/2, h*3/11);
    ctx.globalAlpha = 0.4;

    // var colors = magic.colors.ios;
    // var colors = magic.palette.pastel(50);
    var colors = ["rgba(255,255,255,0.4)"];

    ctx.fillStyle = ctx.strokeStyle = choice(colors);
    magic.render.antialias(ctx, function() {
        var params = choice(galaxyTypes);
        var N = params[0];
        var B = params[1];
        var RADIUS = h*1.5/11;
        var POINTS = 200;

        // Randomly rotate everything
        ctx.rotate(randInt(24)*Math.PI/12);

        // Get galaxy's points
        var points = magic.points.galaxy(RADIUS, N, B, POINTS);
        
        // Draw
        //ctx.stroke(path(points));
        points.forEach(function(p) {
            ctx.fillStyle = ctx.strokeStyle = choice(colors);
            magic.render.shift(ctx, p[0]+randInt(-5, 5), p[1]+randInt(-5, 5), function() {
                ctx.fill(path(circle(randInt(1, 10))));
            });
        });
    });
}
