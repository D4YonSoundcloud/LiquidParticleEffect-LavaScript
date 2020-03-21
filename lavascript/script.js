const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
    x: undefined,
    y: undefined

}

window.addEventListerner('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    console.log(mouse.x, mouse.y)
})

class button {
    constructor(x, y, width, height, baseX) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.baseY = x;
    }
    update() {
        let directionX = 2.2;
        if ((collision detection) && (button position)) {

        } else if (not colliding with mouse and buttin is out of base position) {

        }
    }
}

