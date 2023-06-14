class Car {
  constructor(x, y, width, height, color, carType, acceleration, maxSpeed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.carType = carType;
    this.corners = [];
    this.speed = 0;
    this.acceleration = acceleration;
    this.maxSpeed = maxSpeed;
    this.steerAngle = 0;
    this.break = 0.05;
    this.accident = false;

    this.direction = {
      left: false,
      right: false,
      forward: false,
      backward: false,
    };

    this.isAI = carType == "AI";

    if (carType == "traffic") {
      this.direction.forward = true;
    } else {
      this.#addControl();
      this.sensor = new Sensor(this);
      this.AI = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
    }
  }

  update(roadBorders, traffic) {
    if (!this.accident) {
      this.#createShape();
      this.accident = this.#checkCollision(roadBorders, traffic);
      this.#move();
    }

    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
      const distances = this.sensor.obstacleInfo.map((o) =>
        o == null ? 0 : 1 - o.distance
      );

      if (this.isAI) {
        const outputs = NeuralNetwork.feedForward(distances, this.AI);
        this.direction.left = outputs[0];
        this.direction.right = outputs[1];
        this.direction.forward = outputs[2];
        this.direction.backward = outputs[3];

        console.log(outputs);
      }
    }
  }

  draw(ctx) {
    if (this.accident) {
      ctx.fillStyle = "gray";
    } else {
      ctx.fillStyle = this.color;
    }
    // Draw the driver vehicle
    ctx.beginPath();

    ctx.moveTo(this.corners[0].x, this.corners[0].y);
    for (let i = 1; i < this.corners.length; i++) {
      ctx.lineTo(this.corners[i].x, this.corners[i].y);
    }
    ctx.fill();

    if (this.sensor) {
      this.sensor.draw(ctx);
    }
  }

  #move() {
    if (this.direction.forward) {
      this.speed += this.acceleration;
    }
    if (this.direction.backward) {
      this.speed -= this.acceleration;
    }
    if (this.speed >= this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    // Account for lower speed of vehicles in reverse mode
    if (this.speed <= -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    // Apply smooth stop when you stop accelerating
    if (this.speed > 0) {
      this.speed -= this.break;
    }
    if (this.speed < 0) {
      this.speed += this.break;
    }

    // Make sure speed would not alternate between a small negative and small positive
    if (Math.abs(this.speed) < this.break) {
      this.speed = 0;
    }

    // Account for direction flip of the directions when going backwards
    if (this.speed != 0) {
      const reverse = this.speed > 0 ? 1 : -1;
      if (this.direction.left) {
        this.steerAngle += 0.02 * reverse;
      }
      if (this.direction.right) {
        this.steerAngle -= 0.02 * reverse;
      }
    }

    this.x -= Math.sin(this.steerAngle) * this.speed;
    this.y -= Math.cos(this.steerAngle) * this.speed;
  }

  #checkCollision(roadBorders, traffic) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (isCollision(this.corners, roadBorders[i])) {
        return true;
      }
    }
    for (let i = 0; i < traffic.length; i++) {
      if (isCollision(this.corners, traffic[i].corners)) {
        return true;
      }
    }
    return false;
  }

  #createShape() {
    this.corners = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    this.corners.push({
      x: this.x - Math.sin(this.steerAngle - alpha) * rad,
      y: this.y - Math.cos(this.steerAngle - alpha) * rad,
    });
    this.corners.push({
      x: this.x - Math.sin(this.steerAngle + alpha) * rad,
      y: this.y - Math.cos(this.steerAngle + alpha) * rad,
    });
    this.corners.push({
      x: this.x - Math.sin(Math.PI + this.steerAngle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.steerAngle - alpha) * rad,
    });
    this.corners.push({
      x: this.x - Math.sin(Math.PI + this.steerAngle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.steerAngle + alpha) * rad,
    });
  }

  #addControl() {
    document.onkeydown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.direction.forward = true;
          break;
        case "ArrowDown":
          this.direction.backward = true;
          break;
        case "ArrowLeft":
          this.direction.left = true;
          break;
        case "ArrowRight":
          this.direction.right = true;
          break;
      }
    };

    document.onkeyup = (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.direction.forward = false;
          break;
        case "ArrowDown":
          this.direction.backward = false;
          break;
        case "ArrowLeft":
          this.direction.left = false;
          break;
        case "ArrowRight":
          this.direction.right = false;
          break;
      }
    };
  }
}
