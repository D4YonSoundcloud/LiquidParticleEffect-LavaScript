const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Button {
  constructor(x, y, width, height, baseX) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.baseX = x;
  }
  update() {
    let directionX = 2.2;
    if (
      mouse.x < this.x + this.width &&
      mouse.x > this.x &&
      mouse.y < this.y + this.height &&
      mouse.y > this.y &&
      this.x > this.baseX - 50
    ) {
      this.x -= directionX;
      this.width += directionX;
    } else if (this.x < this.baseX) {
      this.x += directionX;
      this.width -= directionX;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}

const buttons = [];
function createButtons() {
  for (let i = 0; i < 5; i++) {
    let topMargin = 158;
    let buttonMargin = 7;
    let x = 150;
    let y = topMargin + (50 + buttonMargin) * i;
    let height = 50;
    let width = 200;
    buttons.push(new Button(x, y, width, height));
  }
}

createButtons();
console.log(buttons);

function drawButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].update();
    buttons[i].draw();
  }
}
//other divs
class Container {
  constructor(x, y, width, height, baseX) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.baseX = x;
  }
  draw() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}

let container = new Container(360, 180, 550, 250);
console.log(container);
console.log("2");

function drawContainer() {
  container.draw();
}
//handle water particles
class Particle {
  constructor(x, y, size, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.weight = weight;
    this.flowingRight = false;
  }

  update() {
    //collision detection for particle/mouse
    if (
      this.x > mouse.x - 50 &&
      this.x < mouse.x + 50 &&
      this.y > mouse.y - 5 &&
      this.y < mouse.y + 5
    ) {
      this.x -= this.weight;
      this.y += this.weight;
      this.flowingRight = true;
    }
    //collision detection for container
    if (
      this.x < container.x + container.width &&
      this.x > container.x &&
      this.y < container.y + container.height &&
      this.y > container.y
    ) {
      this.weight = 0;
      if (!this.flowingRight) {
        this.x -= 4;
      } else {
        this.x -= 4;
      }
    } else {
      this.weight += 0.01;
    }
    //collision detection for particle/button
    for (let i = 0; i < buttons.length; i++) {
      if (
        this.x < buttons[i].x + buttons[i].width &&
        this.x > buttons[i].x &&
        this.y < buttons[i].y + buttons[i].height &&
        this.y > buttons[i].y
      ) {
        this.weight = 0;
        if (!this.flowingRight) {
          this.x -= 4;
        } else {
          this.x += 4;
        }
      } else {
        this.weight += 0.007;
      }
    }
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random()* 60 + this.x;
      this.weight = Math.random() * 0.2 + 0.1;
    }
    this.y += this.weight;
  }
  
  draw() {
    ctx.fillStyle = "rgba(204, 0, 0,0.6)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const particleArray = [];
const numberOfParticles = 80;
function createParticles() {
  for (let i = 0; i < numberOfParticles; i++) {
    const x = Math.random() * 60 + 500;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 20 + 10;
    const weight = Math.random() * 0.2 + 1;
    particleArray.push(new Particle(x, y, size, weight));
  }
}

const particleArray2 = [];
const numberOfParticles2 = 80;
function createMoreParticles2() {
  for (let i = 0; i < numberOfParticles; i++) {
    const x = Math.random() * 60 + 200;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 20 + 10;
    const weight = Math.random() * 0.2 + 1;
    particleArray2.push(new Particle(x, y, size, weight));
  }
}

createParticles();
createMoreParticles2()

// animate canvas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }
  for (let i = 0; i < particleArray2.length; i++) {
    particleArray2[i].update();
    particleArray2[i].draw();
  }
  drawButtons();
  drawContainer();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", function(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
