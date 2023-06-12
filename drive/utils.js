function linearCopy(first, last, increment) {
  return (last - first) * increment + first;
}

function getIntersection(line1Start, line1End, line2Start, line2End) {
  const tTop =
    (line2End.x - line2Start.x) * (line1Start.y - line2Start.y) -
    (line2End.y - line2Start.y) * (line1Start.x - line2Start.x);
  const uTop =
    (line2Start.y - line1Start.y) * (line1Start.x - line1End.x) -
    (line2Start.x - line1Start.x) * (line1Start.y - line1End.y);
  const bottom =
    (line2End.y - line2Start.y) * (line1End.x - line1Start.x) -
    (line2End.x - line2Start.x) * (line1End.y - line1Start.y);

  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: linearCopy(line1Start.x, line1End.x, t),
        y: linearCopy(line1Start.y, line1End.y, t),
        distance: t,
      };
    }
  }

  return null;
}

function isCollision(corners1, corners2) {
  for (let i = 0; i < corners1.length; i++) {
    for (let j = 0; j < corners2.length; j++) {
      const intersection = getIntersection(
        corners1[i],
        corners1[(i + 1) % corners1.length],
        corners2[j],
        corners2[(j + 1) % corners2.length]
      );
      if (intersection) {
        return true;
      }
    }
  }
  return false;
}
