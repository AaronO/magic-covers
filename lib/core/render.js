function path(points) {
    var p = new Path2D();
    points.forEach(function(point) {
        p.lineTo(point[0], point[1]);
    });
    return p;
}

function bezierPath(controlA, controlB, points) {
    var p = new Path2D();
    for(var i=0; i < points.length; i++) {
        p.bezierCurveTo(
            controlA[i][0], controlA[i][1],
            controlB[i][0], controlB[i][1],
            points[i][0], points[i][1]
        );
    }
    return p;
}

function shift(ctx, x, y, func) {
    ctx.translate(x, y);
    func();
    ctx.translate(-x, -y);
}

function antialias(ctx, func) {
    shift(ctx, 0.5, 0.5, func);
}

exports.path = path;
exports.bezierPath = bezierPath;
exports.shift = shift;
exports.antialias = antialias;
