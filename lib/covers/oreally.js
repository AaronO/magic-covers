var core = require('../core');
var render = require('../core/render');
var palette = require('../core/palette');

// Colors
var purple = palette.pastel(1)[0];
var other = palette.pastel(1)[0];
//var purple = "hsl(316, 46%, 48%)";
var black  = "#221E1F";
var white  = "#fff";


var title 

module.exports = function(ctx) {
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;

    // BG
    //render.rectangle(ctx, [0, 0, w, h], black);
    //render.rectangle(ctx, [1, 1, w-2, h-2], white);
    render.rectangle(ctx, [0, 0, w, h], white);

    // Top
    render.rectangle(ctx, [w/12, 0, w*10/12, h*1.5/100], purple);

    // Title BG
    render.rectangle(ctx, [w/12, h/6, w*10/12, h/6], purple);

    // Title
    render.antialias(ctx, function() {
        ctx.translate(w/12, h*1.15/6);
        ctx.font = "60px Garamond";
        ctx.fillStyle = white;
        ctx.fillText("   Modern JS", 10,50);
    });

    // Description
    render.ctxDo(ctx, function() {
        ctx.translate(w/2, h*2/6);
        ctx.font = "italic 14px Garamond";
        ctx.fillStyle = black;
        ctx.fillText("Javascript for the modern programmer",10, 14);
    });

    drawArt(ctx);
};

function drawArt(ctx) {
    var randInt = core.random.int;
    var circloid = core.points.circloid;

    // Ratio
    var r = 3;
    // Number of points
    var n = 1000;

    var b = randInt(-10, 10);
    var b2 = randInt(-10, 10);
    var eq1 = circloid(1/r*-135, -b, n);
    var eq2 = circloid(1/r*-165, b2, n);
    var eq3 = circloid(1/r*150, randInt(3, 9), n);
    var eq4 = circloid(1/r*325, b2, n);
    var eq5 = circloid(1/r*100, randInt(2, 10), n);

    var w = ctx.canvas.width;
    var h = ctx.canvas.height;

    ctx.translate(w/2, h*2/3);

    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = "rgb(30,30,30)";
    ctx.stroke(render.bezierPath(eq1, eq2, core.points.sum(eq3, eq4)));
    //ctx.stroke(render.bezierPath(eq1, eq2, core.points.sum(eq5, core.points.sum(eq3, eq4))));
}