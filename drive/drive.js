let canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("canvas")
);
let canvasNetwork = /** @type {HTMLCanvasElement} */ (
  document.getElementById("canvas-network")
);
canvas.width = 200;
canvasNetwork.width = 300;
let ctx = canvas.getContext("2d");
let ctxNet = canvasNetwork.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9, (lanes = 3));

// Number of AI cars
const n = 100;
const cars = produceCars(n, "AI");
const traffic = produceTraffic();
let bestCar = cars[0];
// Get best car from local storage if it exists
if (localStorage.getItem("best")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].AI = JSON.parse(localStorage.getItem("best"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].AI, 0.2);
    }
  }
}

// Start the game loop
start();

function start(time) {
  // Fitness Function: get the best car based on forward travel
  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  // 1- Update and draw background
  canvas.height = window.innerHeight;
  canvasNetwork.height = window.innerHeight;
  ctx.translate(0, -bestCar.y + canvas.height * 0.7);

  // 2- Update and draw road lanes
  road.draw(ctx);

  // 3- Update and draw cars
  ctx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
    cars[i].draw(ctx);
  }
  ctx.globalAlpha = 1;
  bestCar.draw(ctx);

  // 4- Update and draw coming traffic
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
    traffic[i].draw(ctx);
  }

  // Visualize neural network
  ctxNet.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(ctxNet, bestCar.AI);

  // Start infinite loop on the start function
  requestAnimationFrame(start);
}

function produceCars(n, type) {
  const cars = [];
  for (let i = 0; i < n; i++) {
    cars.push(
      new Car(
        road.getLaneCenter(1),
        400,
        30,
        50,
        "black",
        type,
        (acceleration = 0.2),
        (maxSpeed = 3)
      )
    );
  }
  return cars;
}

function produceTraffic() {
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
    new Car(
      road.getLaneCenter(2),
      -50,
      30,
      50,
      "blue",
      "traffic",
      (acceleration = 0.2),
      (maxSpeed = 2)
    ),
    new Car(
      road.getLaneCenter(1),
      -200,
      30,
      50,
      "blue",
      "traffic",
      (acceleration = 0.2),
      (maxSpeed = 2)
    ),
    new Car(
      road.getLaneCenter(0),
      -400,
      30,
      50,
      "blue",
      "traffic",
      (acceleration = 0.2),
      (maxSpeed = 2)
    ),
    new Car(
      road.getLaneCenter(2),
      -400,
      30,
      50,
      "blue",
      "traffic",
      (acceleration = 0.2),
      (maxSpeed = 2)
    ),
    new Car(
      road.getLaneCenter(0),
      -600,
      30,
      50,
      "blue",
      "traffic",
      (acceleration = 0.2),
      (maxSpeed = 2)
    ),
    new Car(
      road.getLaneCenter(1),
      -800,
      30,
      50,
      "blue",
      "traffic",
      (acceleration = 0.2),
      (maxSpeed = 2)
    ),
    new Car(
      road.getLaneCenter(2),
      -1000,
      30,
      50,
      "blue",
      "traffic",
      (acceleration = 0.2),
      (maxSpeed = 2)
    ),
    new Car(
      road.getLaneCenter(1),
      -1000,
      30,
      50,
      "blue",
      "traffic",
      (acceleration = 0.2),
      (maxSpeed = 2)
    ),
  ];
  return traffic;
}

function save() {
  localStorage.setItem("best", JSON.stringify(bestCar.AI));
}

function discard() {
  localStorage.removeItem("best");
}
