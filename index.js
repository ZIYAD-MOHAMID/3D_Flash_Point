game.width = 800;
game.height = 800;
const ctx = game.getContext("2d");

const BackgroundColor = "black";
const ForegroundColor = "white";

function clear() {
  ctx.fillStyle = BackgroundColor;
  ctx.fillRect(0, 0, game.width, game.height);
}
function draw({ x, y }) {
  const s = 10;
  ctx.fillStyle = ForegroundColor;
  ctx.fillRect(x - s / 2, y - s / 2, s, s);
}
function screen(p) {
  return {
    x: ((p.x + 1) / 2) * game.width,
    y: (1 - (p.y + 1) / 2) * game.height,
  };
}
function project({ x, y, z }) {
  return {
    x: x / z,
    y: y / z,
  };
}

const FPS = 140;
let dz = 1.2;
let angle = 0;

//THE CUBE
// const fs = [
//   [0, 1, 2, 3],
//   [0, 4, 7, 3],
//   [4, 5, 6, 7],
//   [1, 5, 6, 2],
// ];
// const vs = [
//   { x: 0.25, y: 0.25, z: 0.25 },
//   { x: -0.25, y: 0.25, z: 0.25 },
//   { x: -0.25, y: -0.25, z: 0.25 },
//   { x: 0.25, y: -0.25, z: 0.25 },

//   { x: 0.25, y: 0.25, z: -0.25 },
//   { x: -0.25, y: 0.25, z: -0.25 },
//   { x: -0.25, y: -0.25, z: -0.25 },
//   { x: 0.25, y: -0.25, z: -0.25 },
// ];
let goCube;
//THE PENGER
import pengerModel from "./penger.js";
const { vs, fs } = pengerModel();

function tZ({ x, y, z }, tz) {
  return { x, y, z: z + tz };
}
function rotate_on_y({ x, y, z }, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: x * cos - z * sin,
    y,
    z: x * sin + z * cos,
  };
}
function line(p1, p2) {
  ctx.strokeStyle = ForegroundColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}
function frame() {
  const dt = 1 / FPS;
  // dz += 1 * dt;
  angle += 1 * Math.PI * dt;
  clear();

  // vs.forEach((v) => draw(screen(project(tZ(rotate_on_y(v, angle), dz)))));
  for (const f of fs) {
    for (let i = 0; i < f.length; ++i) {
      const a = vs[f[i]];
      const b = vs[f[(i + 1) % f.length]];
      const p1 = screen(project(tZ(rotate_on_y(a, angle), dz)));
      const p2 = screen(project(tZ(rotate_on_y(b, angle), dz)));
      line(p1, p2);
    }
  }

  setTimeout(frame, 1000 / FPS);
}
setTimeout(frame, 1000 / FPS);
