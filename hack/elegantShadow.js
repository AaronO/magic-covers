var canvas = document.getElementsByTagName("canvas")[0],
    ctx = canvas.getContext('2d');

//ctx.fillStyle = "#e7e5e4";
ctx.fillStyle = "#ebe9e8";
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

var shadows = [
['1px', '-1px', '0', '#767676', ],
['-1px', '2px', '1px', '#737272', ],
['-2px', '4px', '1px', '#767474', ],
['-3px', '6px', '1px', '#787777', ],
['-4px', '8px', '1px', '#7b7a7a', ],
['-5px', '10px', '1px', '#7f7d7d', ],
['-6px', '12px', '1px', '#828181', ],
['-7px', '14px', '1px', '#868585', ],
['-8px', '16px', '1px', '#8b8a89', ],
['-9px', '18px', '1px', '#8f8e8d', ],
['-10px', '20px', '1px', '#949392', ],
['-11px', '22px', '1px', '#999897', ],
['-12px', '24px', '1px', '#9e9c9c', ],
['-13px', '26px', '1px', '#a3a1a1', ],
['-14px', '28px', '1px', '#a8a6a6', ],
['-15px', '30px', '1px', '#adabab', ],
['-16px', '32px', '1px', '#b2b1b0', ],
['-17px', '34px', '1px', '#b7b6b5', ],
['-18px', '36px', '1px', '#bcbbba', ],
['-19px', '38px', '1px', '#c1bfbf', ],
['-20px', '40px', '1px', '#c6c4c4', ],
['-21px', '42px', '1px', '#cbc9c8', ],
['-22px', '44px', '1px', '#cfcdcd', ],
['-23px', '46px', '1px', '#d4d2d1', ],
['-24px', '48px', '1px', '#d8d6d5', ],
['-25px', '50px', '1px', '#dbdad9', ],
['-26px', '52px', '1px', '#dfdddc', ],
['-27px', '54px', '1px', '#e2e0df', ],
['-28px', '56px', '1px', '#e4e3e2',],
];
shadows.reverse();


ctx.font = "92px 'CenturyGothic'";
ctx.textBaseline = 'alphabetic';
ctx.fillStyle = "#131313";

shadows.forEach(function(s) {
    var x = px2n(s[0]), y = px2n(s[1]), blur = px2n(s[2]), color = s[3];
    ctx.shadowColor = color;
    ctx.shadowOffsetX = x;
    ctx.shadowOffsetY = y;
    ctx.shadowBlur = blur;
    console.log(x, y, blur, color);

    ctx.fillText("The Giant".split("").join(String.fromCharCode(8202)), 75, 200);
});

function px2n(px) {
    return Number(px) || Number(px.substring(0, px.length-2));
}
