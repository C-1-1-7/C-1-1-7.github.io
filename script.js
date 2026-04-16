const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_XLINK = "http://www.w3.org/1999/xlink";

let svg = document.getElementById("svg");

const CENTER = { x: 5000, y: 5000 };
let flowers = [];

class Flower {
  constructor(n, radius, angle, speed, scale, parent) {
    this.n = n;
    this.radius = radius;
    this.angle = angle;
    this.speed = speed;
    this.scale = scale;
    this.parent = parent;

    this.width = 40;
    this.height = 40;

    this.create();
  }

  create() {
    this.G = document.createElementNS(SVG_NS, "g");

    let ga = document.createElementNS(SVG_NS, "g");
    ga.setAttribute("class", "a");

    // velocidad distinta de color
    this.G.style.animationDuration = (Math.random() * 4 + 4) + "s";

    for (let i = 0; i < 2; i++) {
      let g = document.createElementNS(SVG_NS, "g");

      for (let j = 0; j < this.n; j++) {
        let use = document.createElementNS(SVG_NS, "use");
        use.setAttributeNS(SVG_XLINK, "xlink:href", `#petal${this.n}`);
        use.setAttribute("width", this.width);
        use.setAttribute("height", this.height);
        g.appendChild(use);
      }

      ga.appendChild(g);
    }

    this.G.appendChild(ga);
    this.parent.appendChild(this.G);

    setTimeout(() => {
      this.G.setAttribute("class", `_${this.n}`);
    }, 50);
  }

  update() {
    this.angle += this.speed;

    let x = CENTER.x + this.radius * Math.cos(this.angle);
    let y = CENTER.y + this.radius * Math.sin(this.angle);

    this.G.setAttribute(
      "transform",
      `translate(${x},${y}) scale(${this.scale}) rotate(${this.angle * 50})`
    );
  }
}

function createCircle() {
  let total = 100;
  let radius = 3700;

  for (let i = 0; i < total; i++) {
    let angle = (i / total) * Math.PI * 2;

    let n = 2 + Math.floor(Math.random() * 4);
    let speed = 0.002;
    let scale = 5.5;

    let flower = new Flower(n, radius, angle, speed, scale, svg);
    flowers.push(flower);
  }
}

function animate() {
  requestAnimationFrame(animate);
  flowers.forEach(f => f.update());
}

createCircle();
animate();