class Transform {
  static translate(pos, delta) {
    return {
      x: pos.x + delta.x,
      y: pos.y + delta.y
    }
  }

  static rotateAround(origin, point, angle) {
    return {
      x: Math.cos(angle) * (point.x - origin.x) - Math.sin(angle) * (point.y - origin.y) + origin.x,
      y: Math.sin(angle) * (point.x - origin.x) + Math.cos(angle) * (point.y - origin.y) + origin.y
    }
  }

  static projection(angle, value) {
    return {
      x: Math.cos(angle) * value,
      y: Math.sin(angle) * value
    }
  }
}
