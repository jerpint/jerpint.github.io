let width = 640;
let height = 640;
let circleX = width / 2;
let circleY = height / 2;
let radius = width / 2.5;


"use strict";

// monokai colorscheme for the lines
let colors = [
  [121, 121, 121], // grey
  [229, 181, 103], // yellow
  [180, 210, 115], // green
  [232, 125, 62], // orange
  [158, 134, 200], // purple
  [176, 82, 121], // pink
  [108, 153, 187], // blue
  [214, 214, 214], // white
];

function setup() {
  canv = createCanvas(width, height).parent(sketchHolder);
}


function getModulus() {
    return document.getElementById('modulus-text').value;
}
function getMultiplier() {
    return document.getElementById('multiplier-text').value;
}

function updateModulus(val) {
    document.getElementById('modulus-slider').value = val;
    document.getElementById('modulus-text').value = val;
}

function updateMultiplier(val) {
    document.getElementById('multiplier-slider').value = val;
    document.getElementById('multiplier-text').value = val;
}


function duplicateExists(arr) {
  return new Set(arr).size !== arr.length;
}

function getPath(multiplier, modulus, start) {
  let path = [start];
  let currentNumber = path[0];
  // break once we found a duplicate, it just loops on itself afterwards
  while (path.length < 2 || !duplicateExists(path)) {
    currentNumber = currentNumber * multiplier;
    currentNumber = currentNumber % modulus;
    path.push(currentNumber);
  }
  return path;
}

function drawPath(path, color) {
  let modulus = getModulus()
  let multiplier = getMultiplier()

  for (let i = 0; i < path.length - 1; i++) {
    angle0 = (path[i] * 2 * Math.PI) / modulus + Math.PI;
    angle1 = (path[i + 1] * 2 * Math.PI) / modulus + Math.PI;

    let x0 = -radius * sin(angle0) + circleX;
    let y0 = radius * cos(angle0) + circleY;

    let x1 = -radius * sin(angle1) + circleX;
    let y1 = radius * cos(angle1) + circleY;

    stroke(color);
    strokeWeight(1);

    line(x0, y0, x1, y1);
  }
}
function draw() {
  background(220);
  let modulus = getModulus()
  let multiplier = getMultiplier()
 
  stroke("white");

  // Draw the circle and evenly spaced dots
  circle(circleX, circleY, radius * 2);
  for (let i = 0; i < modulus; i++) {
    angle = (i * 2 * Math.PI) / modulus + Math.PI;
    let x = -radius * sin(angle) + circleX;
    let y = radius * cos(angle) + circleY;
    stroke("black");
    strokeWeight(3);
    point(x, y);
  }

  // don't revisit a point if not necessary
  let visited = [];
  for (let start = 0; start < modulus; start++) {
    if (!visited.includes(start)) {
      path = getPath(multiplier, modulus, start);
      drawPath(path, colors[start % colors.length]);
      visited = visited.concat(path);
    }
  }
}
