class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.maxSpeed = 3;
    this.acceleration = 0.2;
    this.breakSpeed = 0.05;
    this.angle = 0;

    this.direction = new Control();
  }

  update() {
    this.#move();
  }

  draw(ctx) {
    // Rotate the vehicle
    // ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    // Draw the driver vehicle
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();

    // Stop infinite angle update
    // ctx.restore();
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
}
