var canvas;
var context;
var size, offsetx, offsety;
var u = 0.0, v = 0.0, x = 0.0, t = 0.0;
var table;
const tabsiz = 8192;

// Source: https://oldbytes.space/@zxdunny/109342959566427298

function make_table() {
    const q = (tabsiz/2/Math.PI)|0;
    let i;
    table = [];
    for (i = 0; i < tabsiz; i++)
        table[i] = (q*Math.sin(2*Math.PI*i/tabsiz))|0;
}

function sinTab(x) {
    return table[(x|0) & (tabsiz-1)];
}

function cosTab(x) {
    return sinTab((x|0) + (tabsiz/4));
}

function update() {
    context.fillStyle = "rgba(0,0,0,0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const n = 200, r = 2*Math.PI/235;
    const q = (tabsiz/2/Math.PI)|0;
    const tstep = (0.025*q)|0;
    const rstep = (r*q)|0;
    const imax = (q*n)|0;
    let i, j;
    for (i = 0, ri = 0, R = 0; i < imax; i += q, ri += rstep, R++) {
        for (j = 0, G = 0; j < imax; j += q, G++) {
            u = (sinTab(i + v) + sinTab(ri + x))|0;
            v = (cosTab(i + v) + cosTab(ri + x))|0;
            x = (u+t)|0;
            context.fillStyle = "rgba("+R+","+G+",99,1.0)";
            context.fillRect(offsetx-1 + size*u/q, offsety-1 + size*v/q, 3, 3);
        }
    }
    t += tstep;
}

window.onload = function() {
    document.body.style = "margin:0; padding:0;";
    canvas = document.getElementById("canvas");
    canvas.style.filter = "blur(0.5px)";
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    offsetx = canvas.width/2;
    offsety = canvas.height/2;
    if (canvas.width > canvas.height)
        size = canvas.height / 4;
    else
        size = canvas.width / 4;
    size *= 0.9;
    if (canvas.getContext)
        context = canvas.getContext("2d");
    make_table();
    setInterval(update, 100);
}
