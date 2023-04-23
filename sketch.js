const SKETCH_MARGIN = 32;
const PRECISION = 1e2;

let scale;

function getCanvasWidth() {
  return windowWidth - SKETCH_MARGIN * 2;
}

function getCanvasHeight() {
  return windowHeight - SKETCH_MARGIN * 2;
}

function f(x) {
  return Math.sin(x);
}

function df(x, dx) {
  const x0 = x - dx / 2;
  const y0 = f(x0);
  const x1 = x + dx / 2;
  const y1 = f(x1);

  return (y0 - y1) / (x0 - x1);
}

function setup() {
  createCanvas(getCanvasWidth(), getCanvasHeight());
  scale = createSlider(1, 250, 100, 1);
}

function draw() {
  background(24, 25);

  translate(getCanvasWidth() / 2, getCanvasHeight() / 2);

  const x = (mouseX - getCanvasWidth() / 2) / scale.value();
  const dx = 1e-5;
  const showValue = false;

  drawPoint(x, f(x), 'gold', showValue);
  drawPoint(x, df(x, dx), 'slateblue', showValue);
}

function drawPoint(x, y, color, showValue = false) {
  push();

  translate(x * scale.value(), -y * scale.value());

  if (showValue) {
    fill(255);
    textAlign(CENTER, BASELINE);
    const precise_x = Math.floor(x * PRECISION) / PRECISION;
    const precise_y = Math.floor(y * PRECISION) / PRECISION;
    text('(' + precise_x + ' , ' + precise_y + ')', 0, -16);
  }

  strokeWeight(8);
  stroke(color);
  point(0, 0);

  pop();
}

function windowResized() {
  resizeCanvas(getCanvasWidth(), getCanvasHeight());
}
