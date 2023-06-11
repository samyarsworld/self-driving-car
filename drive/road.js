class Road {
  constructor(roadCenter, roadWidth, lanes = 3) {
    this.roadCenter = roadCenter;
    this.roadWidth = roadWidth;
    this.lanes = lanes;

    this.leftCurb = roadCenter - roadWidth / 2;
    this.rightCurb = roadCenter + roadWidth / 2;
    this.laneTop = -10000000;
    this.laneBottom = 1000000;

    const leftTop = { x: this.leftCurb, y: this.laneTop };
    const leftBottom = { x: this.leftCurb, y: this.laneBottom };
    const rightTop = { x: this.rightCurb, y: this.laneTop };
    const rightBottom = { x: this.rightCurb, y: this.laneBottom };

    this.borders = [
      [leftTop, leftBottom],
      [rightTop, rightBottom],
    ];
  }

  getLaneCenter(lane) {
    const laneWidth = this.roadWidth / this.lanes;
    return this.leftCurb + lane * laneWidth + laneWidth / 2;
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    // Draw border lanes
    for (const border of this.borders) {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    }

    // Draw middle lanes
    for (let i = 1; i < this.lanes; i++) {
      const x = linearCopy(this.leftCurb, this.rightCurb, i / this.lanes);
      ctx.beginPath();
      ctx.setLineDash([20, 20]);
      ctx.moveTo(x, this.laneTop);
      ctx.lineTo(x, this.laneBottom);
      ctx.stroke();
    }
  }
}
