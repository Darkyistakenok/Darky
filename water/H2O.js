let canvas, ctx, w, h,
  bubbles = [],
  bubbleCount = 100,
  bubbleChance = 0.7,
  hue = 0;

let mouse = {
  x: undefined,
  y: undefined
};

function init() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  resizeReset();
  arrayCleanup();
  animationLoop();
}

function resizeReset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function mousemove(e) {
  mouse.x = e.x;
  mouse.y = e.y;
}

function mouseout() {
  mouse.x = undefined;
  mouse.y = undefined;
}

function animationLoop() {
  if (bubbles.length < bubbleCount && Math.random() < bubbleChance) {
    bubbles.push(new Bubble());
    hue++;
  }
  ctx.clearRect(0, 0, w, h);

  // Set the global alpha for transparency
  ctx.globalAlpha = 0.7; // Adjust between 0 (fully transparent) and 1 (fully opaque)

  collisionDetect();
  drawScene();
  arrayCleanup();
  requestAnimationFrame(animationLoop);
}

function drawScene() {
  bubbles.map((bubble) => {
    bubble.update();
    bubble.draw();
  });
}

function arrayCleanup() {
  let dump = [];
  bubbles.map((bubble) => {
    if (!bubble.destroyed) {
      dump.push(bubble);
    }
  });
  bubbles = dump;
}

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

class Bubble {
  constructor() {
    this.bottom = h - 20;
    this.x = Math.random() * w;
    this.y = this.bottom;
    this.size = 0;
    this.sizeMax = getRandomInt(10, 20);
    this.targetY = this.sizeMax;
    this.tick = 0;
    this.burstedTick = 0;
    this.sizeTick = 60;
    this.moveTick = 180;
    this.burstTick = 60;
    this.bursted = false;
    this.destroyed = false;
    this.hue = hue; // Assuming you want each bubble to have a unique hue
  }
  draw() {
    if (!this.bursted) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, 1)`;
      ctx.shadowBlur = 10;
      // Use a transparent fill color with the desired hue
      ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, 0.3)`;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    } else {
      // ... burst drawing logic (unchanged)
    }
  }
  // ... update logic (unchanged)
}

function collisionDetect() {
  // ... collision detection logic (unchanged)
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
