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

function ctxDo(ctx, func) {
    ctx.save();
    var ret = func();
    ctx.restore();
    return ret;
}

function shift(ctx, x, y, func) {
    return ctxDo(ctx, function() {
        ctx.translate(x, y);
        return func();
    });
}

function antialias(ctx, func) {
    return shift(ctx, 0.5, 0.5, func);
}

exports.path = path;
exports.bezierPath = bezierPath;
exports.shift = shift;
exports.ctxDo = ctxDo;
exports.antialias = antialias;
