let canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("canvas")
);
canvas.width = 200;

let ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9, (lanes = 3));
const car = new Car(road.getLaneCenter(1), 400, 30, 50);

// Start the game loop
start();

function start() {
  // 1- Update and draw background
  canvas.height = window.innerHeight;
  ctx.translate(0, -car.y + canvas.height * 0.7);

  // 2- Update and draw road lanes
  road.draw(ctx);

  // 3- Update and draw driver car
  car.update();
  car.draw(ctx);

  // Start infinite loop on the start function
  requestAnimationFrame(start);
}
