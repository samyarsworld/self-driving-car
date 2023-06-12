class Car {
  constructor(x, y, width, height, carType, maxSpeed, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.corners = [];
    this.speed = 0;
    this.maxSpeed = maxSpeed;
    this.acceleration = 0.2;
    this.breakSpeed = 0.05;
    this.angle = 0;
    this.color = color;

    this.accident = false;

    this.direction = new Control(carType);

    if (carType == "driver") {
      this.sensor = new Sensor(this);
    }
  }

  update(roadBorders, traffic) {
    if (!this.accident) {
      this.corners = this.#createCarBoundaries();
      this.accident = this.#checkCollision(roadBorders, traffic);
      this.#move();
    }

    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
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
      this.speed -= this.breakSpeed;
    }
    if (this.speed < 0) {
      this.speed += this.breakSpeed;
    }
    // Make sure speed would not alternate between a small negative and small positive
    if (Math.abs(this.speed) < this.breakSpeed) {
      this.speed = 0;
    }
    // Account for direction flip of the directions when going backwards
    if (this.speed != 0) {
      const reverse = this.speed > 0 ? 1 : -1;
      if (this.direction.left) {
        this.angle += 0.02 * reverse;
      }
      if (this.direction.right) {
        this.angle -= 0.02 * reverse;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  #createCarBoundaries() {
    const corners = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    corners.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    corners.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    corners.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    corners.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return corners;
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
}
