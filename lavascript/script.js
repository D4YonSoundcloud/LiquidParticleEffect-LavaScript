const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        if ((mouse.x < this.x + width && 
            mouse.x > this.x && 
            mouse.y < this.y + this.height && 
            mouse.y > this.y
            ) && (this.x > this.baseX - 50)) {
                //animate button to the left
                this.x -= directionX;
        } else if (this.x < this.baseX)  {
            this.x += directionX;
        }

    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.closePath()
    }
}

const buttons = []
function createButtons() {
    for (let i = 0; i < 5; i++) {
        let topMargin = 100;
        let buttonMargin = 5;
        let x = 150;
        let y = topMargin + ((50 + buttonMargin) * i);
        let height = 50;
        let width = 200;
        buttons.push(new buttons(x,y,width, height))
    }
}
