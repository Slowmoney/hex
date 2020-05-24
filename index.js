


class Canvas {
    constructor(id = "canvas", width = 1024, height = 1024) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;

    }
    drawHex = (x, y, size, side = 0, ) => {
        /*  this.drawLine(x, y, x - r, y, "#000")
         this.drawLine(x, y, x + r, y, "#000") */

        this.ctx.beginPath();
        this.ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
        /* this.ctx.lineTo(x, y); */
        for (side; side < 7; side++) {

            this.ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
        }

        this.ctx.fillStyle = "#333333";
        this.ctx.stroke();
    }
    drawBox = (options = { x, y, color, c, szx, szy, s, n }) => {

        this.ctx.save();

        this.ctx.beginPath();

        this.ctx.rect(options.x, options.y, options.szx, options.szy);

        if (options.c) {
            this.ctx.fillStyle = options.color;
            this.ctx.fill()
        }
        if (options.s) {
            this.ctx.stroke();
        }
        this.ctx.addHitRegion({ id: [options.n, this.name] })
        this.ctx.restore()
    }
    drawCircle = (x, y, r, color) => {
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#fff"
        this.ctx.strokeStyle = "rgb(" + color * 0 + "," + color * 255 + "," + 0 + ")"
        this.ctx.lineWidth = color * 5 + 1;
        this.ctx.fill();
        this.ctx.stroke()
        this.ctx.restore()
    }
    drawLine = (x0, y0, x1, y1, color) => {
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.strokeStyle = color
        this.ctx.stroke();
        this.ctx.restore()
    }
    drawText = (x, y, t) => {
        this.ctx.font = this.text.font;
        this.ctx.fillText(t, x, y);
    }
};
let canvas = new Canvas()
let R = 50
let h = (R * Math.sqrt(3)) / 2
let p = []
//let p = [{ x: 100, y: 100 }, { x: 2 * R + (R / 2), y: 100 + h }, { x: 100, y: 100 + 2 * h }]
/* let p = new Int16Array(10) */
/* let p = Array.apply(null, Array(10)).map((e, i) => {
    return { x: i % 2 * (R + (R / 2)), y: 100 + i * h }
}) */

for (let x = 1; x < 10; x++) {
    for (let y = 0; y < (10 - x % 2); y++) {
        p.push({ x: x * (R + (R / 2)), y: (x % 2) * h + (R) + 2 * ((y) * h) });
    }

}


p.forEach((e) => {
    canvas.drawHex(e.x, e.y, R)
})
/* canvas.drawHex(100, 100, 30)
canvas.drawHex(100, 150, 30)
canvas.drawHex(145, 125, 30)
canvas.drawHex(205, 125, 30)
canvas.drawHex(250, 125, 30) */
/* canvas.drawHex(205, 125, 30) */