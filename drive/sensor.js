class Sensor {
  constructor(car, rayCount = 3) {
    this.car = car;
    this.rayCount = rayCount;
    this.rayLength = 100;
    this.raySpread = Math.PI / 4;
    this.rays = [];

    this.obstacleInfo = [];
  }

  update(roadBorders, traffic) {
    this.#drawRays();
    this.obstacleInfo = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.obstacleInfo.push(
        this.#getObstacleInfo(this.rays[i], roadBorders, traffic)
      );
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i][1];
      if (this.obstacleInfo[i]) {
        end = this.obstacleInfo[i];
      }
      // From the car to the obstacle
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      // After the obstacle
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }

  #drawRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        car.angle +
        linearCopy(
          this.raySpread / 2,
          -this.raySpread / 2,
          i / (this.rayCount - 1)
        );
      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };
      this.rays.push([start, end]);
    }
  }

  #getObstacleInfo(ray, roadBorders, traffic) {
    let collisions = [];
    for (let i = 0; i < roadBorders.length; i++) {
      const intersection = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );
      if (intersection) {
        collisions.push(intersection);
      }
    }

    for (let i = 0; i < traffic.length; i++) {
      const trafficCorners = traffic[i].corners;
      for (let j = 0; j < trafficCorners.length; j++) {
        const intersection = getIntersection(
          ray[0],
          ray[1],
          trafficCorners[j],
          trafficCorners[(j + 1) % trafficCorners.length]
        );
        if (intersection) {
          collisions.push(intersection);
        }
      }
    }

    if (collisions.length != 0) {
      const distanceToCollisions = collisions.map((col) => col.distance);
      const minDistanceToCollision = Math.min(...distanceToCollisions);
      return collisions.find((c) => c.distance == minDistanceToCollision);
    } else {
      return null;
    }
  }
}
