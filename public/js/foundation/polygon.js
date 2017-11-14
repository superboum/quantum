import Vector from './vector.js'

export default class Polygon {
  constructor(points) {
    this.points = points
  }

  get edges() {
    const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]])

    const shiftedPoints = this.points.slice(0)
    shiftedPoints.push(shiftedPoints.shift())

    return zip(this.points, shiftedPoints).map(e => new Vector(
      e[1].x - e[0].x,
      e[1].y - e[0].y
    ))
  }
}
