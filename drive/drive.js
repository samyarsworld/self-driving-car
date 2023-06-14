let canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("canvas")
);
canvas.width = 200;
let ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9, (lanes = 3));
const car = new Car(
  road.getLaneCenter(1),
  400,
  30,
  50,
  "black",
  "AI",
  (acceleration = 0.2),
  (maxSpeed = 3)
);
const traffic = [
  new Car(
    road.getLaneCenter(1),
    100,
    30,
    50,
    "blue",
    "traffic",
    (acceleration = 0.2),
    (maxSpeed = 2)
  ),
];
// Start the game loop
start();

function start() {
  // 1- Update and draw background
  canvas.height = window.innerHeight;
  ctx.translate(0, -car.y + canvas.height * 0.7);

  // 2- Update and draw road lanes
  road.draw(ctx);

  // 3- Update and draw driver car
  car.update(road.borders, traffic);
  car.draw(ctx);

  // 4- Update and draw coming traffic
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
    traffic[i].draw(ctx);
  }

  // Start infinite loop on the start function
  requestAnimationFrame(start);
}
