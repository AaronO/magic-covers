function curve(func, width, steps) {
    // 100 step resolution by default
    steps = steps || 100;
    // Step size
    var dt = width/steps;
    // Build points
    var points = [];
    for(var t = 0; steps-- > 0; t += dt) {
        points.push(func(t));
    }
    return points;
}

function parametric(func, steps) {
    return curve(func, 2*Math.PI, steps);
}

function petal(radius, steps) {
    return parametric(function(t) {
        return [
            Math.cos(t) * radius,
            0.5 * Math.sin(t) * Math.sin(0.5*t) * radius,
        ];
    }, steps);
}

function circle(radius, steps) {
    return parametric(function(t) {
        return [
            Math.cos(t) * radius,
            Math.sin(t) * radius,
        ];
    }, steps);
}

function galaxySpiral(radius, N, B, steps) {
    return parametric(function(t) {
        return [
            Math.cos(t) * radius / Math.log(B*Math.tan(t/(2*N))),
            Math.sin(t) * radius / Math.log(B*Math.tan(t/(2*N))),
        ];
    }, steps);
    
}

function galaxy(radius, N, B, POINTS) {
    // Create spiral
    var spiral = galaxySpiral(radius, N, B, POINTS);
    // Rotated copy (2nd spiral)
    var spiral2 = rotate(spiral, Math.PI);

    // Reverse 1st sprial
    // so both spirals join at the center
    spiral.reverse();

    // Join spirals
    return spiral.concat(spiral2);
}

function waveCircle(radius, steps) {
    return parametric(function(t) {
        return [
            (radius + radius/10*Math.sin(3*t)) * Math.cos(t),
            (radius + radius/10*Math.sin(3*t)) * Math.sin(t),
        ];
    }, steps);
}

function roundPolygon(radius, nSides, steps) {
    return parametric(function(t) {
        return [
            (radius + Math.sqrt(radius)*Math.sin(nSides*t)) * Math.cos(t),
            (radius + Math.sqrt(radius)*Math.sin(nSides*t)) * Math.sin(t),
        ];
    }, steps);
}

function circloid(radius, dt, steps) {
    return curve(function(t) {
        return [
            Math.cos(t) * radius,
            Math.sin(t) * radius,
        ];
    }, dt*steps, steps);
}

function wave(amplitude, periods, width, steps) {
    return curve(function(t) {
        return [
            t,
            amplitude*Math.sin(t/(width/periods)*Math.PI*2),
        ];
    }, width, steps);
}

function negate(points) {
    return point.map(function(p) {
        return [-p[0], -p[1]];
    })
}

function sum(a, b) {
    var points = [];
    for(var i=0; i < a.length; i++) {
        points.push([
            a[i][0]+b[i][0],
            a[i][1]+b[i][1],
        ]);
    }
    return points;
}

function rotate(points, theta) {
    return points
    .map(function(p) {
        return rotatePoint(p, theta);
    });
}

// Rotate a point around origin
function rotatePoint(point, theta) {
    var px = point[0];
    var py = point[1];
    var ox = 0;
    var oy = 0;

    return [
        Math.cos(theta) * (px-ox) - Math.sin(theta) * (py-oy) + ox,
        Math.sin(theta) * (px-ox) + Math.cos(theta) * (py-oy) + oy,   
    ];
}

// Zip combines multiple arrays of points together
// useful for combining equations
function zip(arrs) {
    // How many arrays
    var n = arrs.length;
    // How many per array
    var x = arrs[0].length;

    var points = [];
    for(var xi=0; xi < x; xi++) {
        for(var ni=0; ni < n; ni++) {
            points.push(arrs[ni][xi]);
        }
    }

    return points;
}

exports.curve = curve;
exports.parametric = parametric;
exports.petal = petal;
exports.circle = circle;
exports.galaxySpiral = galaxySpiral;
exports.galaxy = galaxy;
exports.waveCircle = waveCircle;
exports.roundPolygon = roundPolygon;
exports.circloid = circloid;
exports.wave = wave;
exports.negate = negate;
exports.sum = sum;
exports.rotate = rotate;
exports.rotatePoint = rotatePoint;
exports.zip = zip;
