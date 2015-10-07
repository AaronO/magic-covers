var pastelModifiers = [
    [.66667, .66667],
    [.33333, 1],
    [.5, .83333],
    [.83333, .5],
    [1, .33333]
];

// r: red, g: green, b: blue
var r = new HSV(0, 1, 1);
var rg = new HSV(120, 1, 1);
var g = new HSV(180, 1, .8);
var gb = new HSV(210, 1, .6);
var b = new HSV(255, .85, .7);
var br = new HSV(315, 1, .65);

var colorRanges = [
    new ColorRange(r, rg, 0.5),
    new ColorRange(rg, g, 0.5),
    new ColorRange(g, gb, 0.75),
    new ColorRange(gb, b, 1.33),
    new ColorRange(b, br, 1.33),
    new ColorRange(br, r, 1.33),
];

function HSV(h, s, v) {
    this.h = h;
    this.s = s;
    this.v = v;
}
HSV.prototype.isPrimary = function() {
    var x = this.h;
    return x == 0 || x == 180 || x == 255;
}

function ColorRange(lower, upper, ratioMult) {
    this.lower = lower;
    this.upper = upper;
    this.ratioMult = ratioMult;
}
ColorRange.prototype.contains = function(hue) {
    return hue >= this.lower && hue < this.upper;
};
ColorRange.prototype.range = function() {
    return this.upper.h - this.lower.h;
};
ColorRange.prototype.isPrimary = function() {
    return this.lower.isPrimary();
};
ColorRange.prototype.primary = function() {
    if(this.lower.isPrimary()) {
        return this.lower;
    }
    return this.upper;
};
ColorRange.prototype.nonPrimary = function() {
    if(!this.lower.isPrimary()) {
        return this.lower;
    }
    return this.upper;
};
ColorRange.prototype.getBaseColor = function(hue) {
    var ratio = this.ratio(hue);

    return new HSV(
        hue,
        this.range(this.primary().s, this.nonPrimary().s, ratio),
        this.range(this.primary().v, this.nonPrimary().v, ratio)
    );
};
ColorRange.prototype.range = function(primary, nonPrimary, ratio) {
    var p = primary;
    var n = nonPrimary;
    var r = ratio;

    // Avoid dividing by zero
    if(ratio === -1) {
        return primary;
    }

    return p + (n - p) / (1 + r)
};
ColorRange.prototype.ratio = function(hue) {
    if(hue == this.lower.h) {
        return -1;
    }

    var diff = Math.abs(this.nonPrimary().h - hue);

    return Math.tan(diff / this.range() * Math.PI / 2) * this.ratioMult;
};

function getColorRange(hue) {
    return colorRanges.
    filter(function(cr) {
        return cr.contains(hue)
    })[0] || colorRanges[0];
}

function getBaseColor(hue) {
    hue %= 360;
    return getColorRange(hue).getBaseColor(hue);
}

function normalizeSorV(value, modifier) {
    var a = value;
    var b = modifier;

    if(b <= 1) {
        return a * b;
    }

    return a + (1-a)*(b-1)
}

function monopalette(hue) {
    var base = getBaseColor(hue);

    return pastelModifiers.map(function(vals) {
        var kS = vals[0];
        var kV = vals[1];

        return [hue, normalizeSorV(base.s, kS), normalizeSorV(base.v, kV)];
    }).map(hsv2hsl);
}

function hsv2hsl(vals) {
    var h = vals[0], s = vals[1], v = vals[2];


    var ll = (2 - s) * v;
    var ss = s * v;

    return [
        h,
        ss / ((ll <= 1) ? (ll) : 2 - (ll)),
        ll / 2,
    ];
}
