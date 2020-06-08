class Canvas {
    constructor(id = "canvas", width = 2024, height = 2024) {
        this.canvas = document.getElementById(id);

        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.canvas.getContext("2d");

        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;

    }
    drawHex = (x, y, size, side = 0, [n = 0, terain = "#444444ff", color = "#00000090"] = []) => {
        this.ctx.save()
        this.ctx.beginPath();

        this.ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

        let lines = [];
        for (side; side < 7; side++) {
            this.ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
            lines.push(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6))
        }
        this.ctx.fillStyle = terain;
        this.ctx.addHitRegion({ id: [n] })
        this.ctx.fill()
        this.ctx.stroke();

        const angle = 135
        const lineTo23 = [lines[2] + size * Math.cos(angle * Math.PI / 180), lines[3] + size * Math.sin(angle * Math.PI / 180)];
        const lineTo45 = [lines[4] + size * Math.cos(angle * Math.PI / 180), lines[5] + size * Math.sin(angle * Math.PI / 180)];
        const lineTo67 = [lines[6] + size * Math.cos(angle * Math.PI / 180), lines[7] + size * Math.sin(angle * Math.PI / 180)];
        const lineTo89 = [lines[8] + size * Math.cos(angle * Math.PI / 180), lines[9] + size * Math.sin(angle * Math.PI / 180)];


        this.ctx.beginPath();

        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = "#efe"

        this.ctx.moveTo(lines[2], lines[3])
        this.ctx.lineTo(...lineTo23)
        this.ctx.lineTo(...lineTo45)
        this.ctx.lineTo(lines[4], lines[5])
        this.ctx.moveTo(lines[4], lines[5])
        this.ctx.lineTo(...lineTo45)
        this.ctx.lineTo(...lineTo67)
        this.ctx.lineTo(lines[6], lines[7])
        this.ctx.moveTo(lines[6], lines[7])
        this.ctx.lineTo(...lineTo67)
        this.ctx.lineTo(...lineTo89)
        this.ctx.lineTo(lines[8], lines[9])
        /* this.ctx.addHitRegion({ id: [n] }) */
        /* this.ctx.stroke() */
        this.ctx.fill()

        this.ctx.restore()
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
        this.ctx.fillStyle = "#000"
        this.ctx.font = "30px Arial"
        this.ctx.fillText(t, x, y);
    }
    clear = () => {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

};
class Mapgen {
    constructor(size, canvas) {
        this.size = size
        this.canvas = canvas
        this.block = 4
        this.E = 0.25
        const points = [Math.random(), Math.random(), Math.random(), Math.random()]
        this.map = new Array(this.size * this.size)

        this.map[0 + 0 * this.size] = points[0]
        this.map[this.size - 1 + 0 * this.size] = points[1]
        this.map[this.size - 1 + (this.size - 1) * this.size] = points[2]
        this.map[0 + (this.size - 1) * this.size] = points[3]

    }
    start() {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                this.genBlock(x, y)
                this.draw(x, y)
            }
        }
    }
    genBlock(x, y) {
        this.build_map([x * 13, y * 13, 14, 14])
    }
    draw(x, y) {
        this.drawBlock(x * 100, y * 100, 100, 100, x * 100, y * 100) //
    }
    getPoint(x, y) {
        return this.map[x + y * this.size]
    }
    getPointRGB(x, y) {
        return "rgb(" + this.floatToRGB(this.getPoint(x, y)).toString() + ")"
    }
    getPointHEX() { }
    floatToRGB(float) {
        const rgb = Math.round(float * 255)
        let red = 255
        let green = 255
        let blue = 255
        if (rgb <= 255 && rgb > 230) {
            red = 255
            green = 255
            blue = 255
        } else if (rgb <= 230 && rgb > 220) {
            red = 155
            green = 155
            blue = 0
        } else if (rgb <= 220 && rgb > 200) {
            red = 0
            green = 128
            blue = 0
        } else if (rgb <= 200 && rgb > 170) {
            red = 0
            green = 90
            blue = 0
        } else if (rgb <= 170 && rgb > 150) {
            red = 0
            green = 155
            blue = 0
        } else if (rgb <= 150 && rgb > 140) {
            red = 181
            green = 193
            blue = 136
        } else if (rgb <= 140 && rgb > 130) {
            red = 245
            green = 241
            blue = 162
        } else if (rgb <= 130 && rgb > 100) {
            red = 0
            green = 0
            blue = 255
        } else if (rgb <= 100 && rgb > 70) {
            red = 0
            green = 0
            blue = 200
        } else if (rgb <= 70 && rgb > 50) {
            red = 0
            green = 0
            blue = 170
        } else if (rgb <= 50 && rgb > 20) {
            red = 0
            green = 0
            blue = 120
        } else if (rgb <= 20 && rgb > 0) {
            red = 29
            green = 51
            blue = 74
        }
        return [red, green, blue]
    }
    drawBlock(szx, szy, blszx, blszy, px, py) {
        const imgx = 100
        const imgy = 100
        let imageData = this.canvas.ctx.createImageData(imgx, imgy)
        let data = imageData.data
        for (let y = 0; y < blszy; y++) {
            for (let x = szx; x < blszx + szx; x++) {
                let rgb = Math.round(this.map[x + (y + szy) * this.size] * 255)
                let red = 25
                let green = 255
                let blue = 255
                /* let color = this.floatToRGB(rgb) */
                /* console.log(color); */

                /* console.log(red, green, blue); */

                if (rgb <= 255 && rgb > 230) {
                    red = 255
                    green = 255
                    blue = 255
                } else if (rgb <= 230 && rgb > 220) {
                    red = 155
                    green = 155
                    blue = 0
                } else if (rgb <= 220 && rgb > 200) {
                    red = 0
                    green = 128
                    blue = 0
                } else if (rgb <= 200 && rgb > 170) {
                    red = 0
                    green = 90
                    blue = 0
                } else if (rgb <= 170 && rgb > 150) {
                    red = 0
                    green = 155
                    blue = 0
                } else if (rgb <= 150 && rgb > 140) {
                    red = 181
                    green = 193
                    blue = 136
                } else if (rgb <= 140 && rgb > 130) {
                    red = 245
                    green = 241
                    blue = 162
                } else if (rgb <= 130 && rgb > 100) {
                    red = 0
                    green = 0
                    blue = 255
                } else if (rgb <= 100 && rgb > 70) {
                    red = 0
                    green = 0
                    blue = 200
                } else if (rgb <= 70 && rgb > 50) {
                    red = 0
                    green = 0
                    blue = 170
                } else if (rgb <= 50 && rgb > 20) {
                    red = 0
                    green = 0
                    blue = 120
                } else if (rgb <= 20 && rgb > 0) {
                    red = 29
                    green = 51
                    blue = 74
                }
                /*   if (x == szx || y == 0 || x == blszx + szx - 1 || y == blszy - 1) {
                      red = 0
                      green = 0
                      blue = 0
                  } */
                data[4 * (x - szx + y * imgx) + 0] = red
                data[4 * (x - szx + y * imgx) + 1] = green
                data[4 * (x - szx + y * imgx) + 2] = blue
                data[4 * (x - szx + y * imgx) + 3] = 255
            }
        }
        this.canvas.ctx.putImageData(imageData, px, py)
        return imageData
    }
    build_map(offset = [0, 0, 32, 32]) {
        for (let y = offset[1]; y < offset[1] + offset[3]; y++) {
            for (let x = offset[0]; x < offset[0] + offset[2]; x++) {
                this.getblock(this.block * 2 * x - 1, this.block * 2 * y - 1)
            }
        }
        return this.map
    }
    getblock(cx, cy) {
        const e = this.E
        this.diamond(0, 0, this.size - 1, this.size - 1, e, cx, cy)
    }
    diamond(x1, y1, x2, y2, e, x, y) {
        const mid_x = (x1 + x2) / 2
        const mid_y = (y1 + y2) / 2
        let mean = (this.map[x1 + y1 * this.size] + this.map[x2 + y1 * this.size] + this.map[x2 + y2 * this.size] + this.map[x1 + y2 * this.size]) / 4.0
        const r = Math.random() * 2.0 - 1.0
        this.map[mid_x + mid_y * this.size] = mean + r * e
        this.square([mid_x, y1 - (mid_y - y1), mid_x, mid_y, x2, y1, x1, y1], mid_x, y1, e) //Up
        this.square([mid_x, mid_y, mid_x, y2 + (y2 - mid_y), x2, y2, x1, y2], mid_x, y2, e) //Down
        this.square([x2, y1, x2, y2, x2 + (x2 - mid_x), mid_y, mid_x, mid_y], x2, mid_y, e) //Right
        this.square([x1, y1, x1, y2, mid_x, mid_y, x1 - (mid_x - x1), mid_y], x1, mid_y, e) //Left
        if (mid_x - x1 > 1) {
            e *= 0.7
            if (mid_x - x1 <= this.block) {
                this.diamond(mid_x, y1, x2, mid_y, e, x, y)
                this.diamond(x1, y1, mid_x, mid_y, e, x, y)
                this.diamond(mid_x, mid_y, x2, y2, e, x, y)
                this.diamond(x1, mid_y, mid_x, y2, e, x, y)
            } else {
                if (mid_x <= x && mid_y >= y) {
                    this.diamond(mid_x, y1, x2, mid_y, e, x, y) //Top-right
                } else if (mid_x >= x && mid_y >= y) {
                    this.diamond(x1, y1, mid_x, mid_y, e, x, y) //Top-left
                } else if (mid_x <= x && mid_y <= y) {
                    this.diamond(mid_x, mid_y, x2, y2, e, x, y) //Bottom-right
                } else if (mid_x >= x && mid_y <= y) {
                    this.diamond(x1, mid_y, mid_x, y2, e, x, y) //Bottom-left
                }
            }
        }
    }

    square(points, diamond_mid_x, diamond_mid_y, e) {
        let mean = 0.0;
        let count = 0
        if (this.map[diamond_mid_x + diamond_mid_y * this.size] !== undefined) return

        for (let i = 0; i < points.length; i += 2) {
            let x = points[i];
            let y = points[i + 1]

            if (x < 0) x = this.size + x
            if (x >= this.size) x = x - this.size - 1
            if (y < 0) y = this.size + y
            if (y >= this.size) y = y - this.size - 1
            if (this.map[x + y * this.size] === undefined) continue

            mean += this.map[x + y * this.size]
            count++
        }
        const r = Math.random() * 2.0 - 1.0
        this.map[diamond_mid_x + diamond_mid_y * this.size] = mean / count + r * e
    }
}
class Tile {
    constructor(x, y, size, map, options) {
        this.x = x
        this.y = y
        this.map = map
        this.id = options[0]
        this.color = options[1]
        this.drawing = true
        /* const angle = 135 */
        /* this.lines = []; */
        /* let side = 0 */
        this.R = size
        /* this.h = (this.R * Math.sqrt(3)) / 3 */
        this.center = [x * (this.R + 10) - y * 65, y * ((this.R / 2) + 8) - x * 32]
        /*  this.center = [x * 234 - y * 65, (x % 2) * 31 + y * 120] // работает только с 2 рядами */
        /* this.center = [x * (this.R + (this.R / 2)), (x % 2) * this.h + (this.R) + 2 * ((y) * this.h)] */

        /*   for (side; side < 7; side++) {
  
              this.lines.push([this.center[0] + size * Math.cos(side * 2 * Math.PI / 6), this.center[1] + size * Math.sin(side * 2 * Math.PI / 6)])
          } */
        /* 
                this.lines.push([this.lines[1][0] + size * Math.cos(angle * Math.PI / 180), this.lines[1][1] + size * Math.sin(angle * Math.PI / 180)])
                this.lines.push([this.lines[2][0] + size * Math.cos(angle * Math.PI / 180), this.lines[2][1] + size * Math.sin(angle * Math.PI / 180)])
                this.lines.push([this.lines[4][0] + size * Math.cos(angle * Math.PI / 180), this.lines[4][1] + size * Math.sin(angle * Math.PI / 180)])
                this.lines.push([this.lines[3][0] + size * Math.cos(angle * Math.PI / 180), this.lines[3][1] + size * Math.sin(angle * Math.PI / 180)])
         */
        /*   this.up = new Path2D();
          this.up.lineTo(...this.lines[0])
          this.up.lineTo(...this.lines[1])
          this.up.lineTo(...this.lines[2])
          this.up.lineTo(...this.lines[3])
          this.up.lineTo(...this.lines[4])
          this.up.lineTo(...this.lines[5])
          this.up.lineTo(...this.lines[6]) */


        /*   this.border = new Path2D();
          this.border.lineTo(...this.lines[1])
          this.border.lineTo(...this.lines[7])
          this.border.lineTo(...this.lines[8])
          this.border.lineTo(...this.lines[2])
          this.border.moveTo(...this.lines[2])
          this.border.lineTo(...this.lines[8])
          this.border.lineTo(...this.lines[10])
          this.border.lineTo(...this.lines[3])
          this.border.moveTo(...this.lines[3])
          this.border.lineTo(...this.lines[10])
          this.border.lineTo(...this.lines[9])
          this.border.lineTo(...this.lines[4]) */


        this.selected = false




        let A = [this.center[0] + this.R / 2 * Math.cos(153 * Math.PI / 180), this.center[1] + this.R / 2 * Math.sin(153 * Math.PI / 180)]
        let B = [A[0] + (this.R * 0.6) * Math.cos(8 * Math.PI / 180), A[1] + (this.R * 0.6) * Math.sin(8 * Math.PI / 180)]
        let D = [this.center[0] - this.R / 2 * Math.cos(153 * Math.PI / 180), this.center[1] - this.R / 2 * Math.sin(153 * Math.PI / 180)]
        let C = [B[0] + this.R / 2 * Math.cos(27 * Math.PI / 180), B[1] - this.R / 2 * Math.sin(27 * Math.PI / 180)]
        let E = [D[0] - (this.R * 0.6) * Math.cos(8 * Math.PI / 180), D[1] - (this.R * 0.6) * Math.sin(8 * Math.PI / 180)]
        let F = [E[0] + this.R / 2 * Math.cos(153 * Math.PI / 180), E[1] + this.R / 2 * Math.sin(153 * Math.PI / 180)]


        this.tile = new Path2D();
        this.tile.moveTo(...A)
        this.tile.lineTo(...B)
        this.tile.lineTo(...C)
        this.tile.lineTo(...D)
        this.tile.lineTo(...E)
        this.tile.lineTo(...F)
        this.tile.lineTo(...A)



    }
    draw = () => {


    }
    drawTile = () => {
        if (this.isVisible()) {
            /* canvas.ctx.fillRect(this.center[0], this.center[1], 10, 10) */
            if (typeof (this.map.tileFilter(this.x - 1, this.y)[0]) == "undefined") {
                this.map.addTile(this.x - 1, this.y)   //add left
            }
            else if (typeof (this.map.tileFilter(this.x + 1, this.y)[0]) == "undefined") {
                this.map.addTile(this.x + 1, this.y) //add right
            }
            if (typeof (this.map.tileFilter(this.x, this.y - 1)[0]) == "undefined") {
                this.map.addTile(this.x, this.y - 1) //add up
            }
            else if (typeof (this.map.tileFilter(this.x, this.y + 1)[0]) == "undefined") {
                this.map.addTile(this.x, this.y + 1) //add down
            }

            /*  this.drawing = true */
        } else {
            /* this.drawing = false */
            return false
        }
        canvas.ctx.save()
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color
        canvas.ctx.addHitRegion({ path: this.tile, id: [this.id] })
        canvas.ctx.stroke(this.tile)
        canvas.ctx.fill(this.tile)
        canvas.drawText(this.center[0], this.center[1] - 10, [this.x, this.y])
        canvas.ctx.restore()
        return true
    }
    clamp = (val, min, max) => {

        return Math.min(Math.max(min, val), max);

    }
    length = (x, y) => {
        return Math.sqrt((this.center[0] - x) ** 2 + (this.center[1] - y) ** 2)
    }
    distance = (x, y, x0, y0, x1, y1) => {
        const p0p1X = x0 - x1;
        const p0p1Y = y0 - y1;
        const l2 = p0p1X * p0p1X + p0p1Y * p0p1Y;
        const pp0X = x - x0;
        const pp0Y = y - y0;
        if (l2 === 0) {
            return pp0X * pp0X + pp0Y * pp0Y;
        }
        const p1p0X = x1 - x0;
        const p1p0Y = y1 - y0;
        const t = this.clamp((pp0X * p1p0X + pp0Y * p1p0Y) / l2, 0, 1);
        const ptX = x0 + t * p1p0X;
        const ptY = y0 + t * p1p0Y;
        const pX = x - ptX;
        const pY = y - ptY;
        return Math.sqrt(pX * pX + pY * pY);
    }
    drawBorder = () => {

        canvas.ctx.fillStyle = "#00000066"
        canvas.ctx.fill(this.border)
    }
    isVisible = () => {
        /* return ((mouse.position.offset.y + mouse.position.tempoffset.y) <= 1000) && ((mouse.position.offset.y + mouse.position.tempoffset.y) > 500) && ((mouse.position.offset.x + mouse.position.tempoffset.x) <= 1000) && ((mouse.position.offset.x + mouse.position.tempoffset.x) > 500)
 */
        return ((mouse.position.point.y) <= (this.map.border[3]) - this.center[1]) && ((mouse.position.point.y) > (this.map.border[0]) - this.center[1]) && ((mouse.position.point.x) <= (this.map.border[2]) - this.center[0]) && ((mouse.position.point.x) > (this.map.border[0]) - this.center[0])

    }
}
class Hexmap {
    constructor(width = 1000, height = 1000) {
        this.tiles = []
        this.border = [0, 0, width, height]
        this.drawed = []
    }
    addTile = (x, y) => {
        terrain.genBlock(x, y)
        this.tiles.push(new Tile(x, y, 225, this, [this.tiles.length, terrain.getPointRGB(x, y)]));
    }
    pushTile = (x, y) => {
        console.log(this.tiles[this.tiles.length - 1]);
    }
    genTile = (szx = 5, szy = 5) => {
        for (let x = 0; x < (szx); x++) {
            for (let y = 0; y < (szy  /* - x % 2 */); y++) {
                this.addTile(x, y)
            }
        }
    }
    tileFilter = (x, y) => {
        return this.tiles.filter(e => e.x === x && e.y === y)
    }
    tileIndex = (x, y) => {
        return this.tiles.findIndex(e => e.x === x && e.y === y)
    }
    draw = () => {

        /*         this.tiles.forEach((e, i) => {
                     e.drawBorder() 
                }) */
        /* let startindex = this.drawed[1] ? this.drawed[1][1] : 0 эфффект  */
        let startindex = this.drawed[0] ? this.drawed[0][1] : 0
        let lastindex = startindex + this.drawed.length
        /*  lastindex = ((lastindex < 1) ? this.tiles.length : lastindex)
         startindex = startindex > 170 ? this.tiles.length : startindex */
        this.drawed = []
        for (let i = startindex; i < this.tiles.length; i++) {
            this.tiles[i].drawTile() ? this.drawed.push([this.tiles[i], i]) : true

        }
        /*     this.tiles.forEach((e, i) => { */
        /*  if (!e.drawing) {
             return
         } */

        /* e.drawTile() ? this.drawed.push(e) : true */


        /* }) */
        console.log(this.drawed.length, startindex, lastindex);

        /*  debugger */
    }
}
let canvas = new Canvas("canvas", window.innerWidth - 30, window.innerHeight - 30)
let terrain = new Mapgen(2 ** 10 + 1, canvas)
let map = new Hexmap(canvas.width, canvas.height)
map.genTile()


window.addEventListener("resize", (e) => {
    canvas.width = canvas.canvas.width = window.innerWidth - 30;
    canvas.height = canvas.canvas.height = window.innerHeight - 30;
})

document.addEventListener("wheel", (e) => {
    W -= Math.sign(e.deltaY)
})

canvas.canvas.addEventListener("mousemove", (m) => {
    Y = m.offsetY
    X = m.offsetX

    if (mouse.state.hit != m.region && m.region != null) {
        mouse.state.hit = m.region
        mouse.state.over = true
    } else {
        mouse.state.over = false
    }
    if (m.region == null && mouse.state.hit != null) {
        mouse.state.hit = m.region
    }
    if (mouse.state.mousedown) {
        mouse.position.tempoffset.x = m.offsetX - mouse.position.mousedown.x
        mouse.position.tempoffset.y = m.offsetY - mouse.position.mousedown.y
    }
    mouse.position.point.x = mouse.position.offset.x + mouse.position.tempoffset.x
    mouse.position.point.y = mouse.position.offset.y + mouse.position.tempoffset.y

})

canvas.canvas.addEventListener("mouseup", (m) => {
    mouse.position.point.x = mouse.position.offset.x + mouse.position.tempoffset.x
    mouse.position.point.y = mouse.position.offset.y + mouse.position.tempoffset.y
    mouse.position.offset.x += m.offsetX - mouse.position.mousedown.x
    mouse.position.offset.y += m.offsetY - mouse.position.mousedown.y
    mouse.position.tempoffset.x = 0
    mouse.position.tempoffset.y = 0



    console.log("mouseup");
    mouse.state.mousedown = false;
})
canvas.canvas.addEventListener("mousedown", (m) => {

    mouse.position.mousedown.x = m.offsetX
    mouse.position.mousedown.y = m.offsetY
    if (mouse.state.hit) {
        /*  map.tiles[mouse.state.hit].selected = true */

        /* console.log(map.tiles[mouse.state.hit], map.tiles.filter(e => e.x === 4 && e.y === 4)) */
        /*  console.log(map.tileIndex(map.tiles[mouse.state.hit].x, map.tiles[mouse.state.hit].y + 1)); */
        /* 
                if (map.tileIndex(map.tiles[mouse.state.hit].x, map.tiles[mouse.state.hit].y + 1) === -1) {
                    map.addTile(map.tiles[mouse.state.hit].x, map.tiles[mouse.state.hit].y + 1)
                }
                if (map.tileIndex(map.tiles[mouse.state.hit].x, map.tiles[mouse.state.hit].y - 1) === -1) {
                    map.addTile(map.tiles[mouse.state.hit].x, map.tiles[mouse.state.hit].y - 1)
                }
                if (map.tileIndex(map.tiles[mouse.state.hit].x - 1, map.tiles[mouse.state.hit].y) === -1) {
                    map.addTile(map.tiles[mouse.state.hit].x - 1, map.tiles[mouse.state.hit].y)
                }
                if (map.tileIndex(map.tiles[mouse.state.hit].x + 1, map.tiles[mouse.state.hit].y) === -1) {
                    map.addTile(map.tiles[mouse.state.hit].x + 1, map.tiles[mouse.state.hit].y)
                } */
        /*         if (map.tileIndex(map.tiles[mouse.state.hit].x + 1, map.tiles[mouse.state.hit].y + 1) === -1) {
                    map.addTile(map.tiles[mouse.state.hit].x + 1, map.tiles[mouse.state.hit].y + 1)
                }
                if (map.tileIndex(map.tiles[mouse.state.hit].x - 1, map.tiles[mouse.state.hit].y + 1) === -1) {
                    map.addTile(map.tiles[mouse.state.hit].x - 1, map.tiles[mouse.state.hit].y + 1)
                } */
        /*  map.addTile()  */


    }

    console.log("mousedown");
    mouse.state.mousedown = true;
})
let mouse = {
    state: {
        mousedown: false,
        over: false,
        hit: null,
    },
    position: {
        mousedown: { x: 0, y: 0 },
        offset: { x: 0, y: 0 },
        tempoffset: { x: 0, y: 0 },
        point: { x: 0, y: 0 }
    }
}
let Y = 0
let X = 0
let W = 50;
loop = (dt) => {
    canvas.clear()
    canvas.ctx.translate(mouse.position.point.x, mouse.position.point.y)

    /* canvas.ctx.setTransform(1, -0.5, 1, 0.5, mouse.position.offset.x + mouse.position.tempoffset.x, mouse.position.offset.y + mouse.position.tempoffset.y);
 */
    map.draw()
    /* terrain.start() */
    canvas.ctx.resetTransform()
    canvas.ctx.strokeRect(...map.border)

    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)

