var canvas;
var context;
var size, offsetx, offsety;
var u = 0.0, v = 0.0, x = 0.0, t = 0.0;

// Source: https://oldbytes.space/@zxdunny/109342959566427298

function update() {
    context.fillStyle = "rgba(0,0,0,0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const n = 200, r = 2*Math.PI/235;
    let i, j, x1;
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            u = Math.sin(i+v) + Math.sin(r*i + x);
            v = Math.cos(i+v) + Math.cos(r*i + x);
            x = u+t;
            context.fillStyle = "rgba("+i+","+j+",99,1.0)";
            context.fillRect(offsetx + size*u - 1, offsety + size*v - 1, 3, 3);
        }
    }
    t += 0.025;
}

window.onload = function() {
    document.body.style = "margin:0; padding:0;";
    canvas = document.getElementById("canvas");
    canvas.style.filter = "blur(1px)";
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
    setInterval(update, 100);
}
