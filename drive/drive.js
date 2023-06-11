let canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("canvas")
);
canvas.width = 200;

let ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);

// Start the game loop
start();

function start() {
  // 1- Update and draw background
  canvas.height = window.innerHeight;
  // 2- Update and draw driver car
  car.update();
  car.draw(ctx);

  // Start infinite loop on the start function
  requestAnimationFrame(start);
}
