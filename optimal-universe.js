var canvas;
var context;
var size, offsetx, offsety;
var u = 0.0, v = 0.0, x = 0.0, t = 0.0;

function update() {
    context.fillStyle = "rgba(0,0,0,0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const n = 200, r = 2 * Math.PI / 235;
    let lastColor;
    context.beginPath();

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const sin_i_v = Math.sin(i + v);
            const cos_i_v = Math.cos(i + v);
            u = sin_i_v + Math.sin(r * i + x);
            v = cos_i_v + Math.cos(r * i + x);
            x = u + t;

            const currentColor = `rgba(${i},${j},99,1.0)`;
            if (currentColor !== lastColor) {
                context.fillStyle = currentColor;
                lastColor = currentColor;
            }

            context.fillRect(offsetx + size * u - 1, offsety + size * v - 1, 3, 3);
        }
    }

    t += 0.025;

    requestAnimationFrame(update);
}

window.onload = function () {
    document.body.style = "margin:0; padding:0;";
    canvas = document.getElementById("canvas");
    canvas.style.filter = "blur(1px)";
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    offsetx = canvas.width / 2;
    offsety = canvas.height / 2;

    size = (canvas.width > canvas.height ? canvas.height : canvas.width) * 0.225;

    if (canvas.getContext) {
        context = canvas.getContext("2d");
        requestAnimationFrame(update);
    }
}

