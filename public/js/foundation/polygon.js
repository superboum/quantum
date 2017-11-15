import Vector from './vector.js'
import Transform from './transform.js'
import Random from './random.js'

export default class Polygon {
  constructor(points) {
    this.points = points
  }

  /* random
   *
   * Start with the centre of the polygon at center ({x: ?, y: ?})
   * then creates the polygon by sampling points on a circle around the centre.
   * Randon noise is added by varying the angular spacing between sequential points,
   * and by varying the radial distance of each point from the centre.
   *
   * Params:
   * center - coordinates of the "centre" of the polygon (center.x, center.y)
   * aveRadius - in px, the average radius of this polygon, this roughly controls how large the polygon is, really only useful for order of magnitude.
   * irregularity - [0,1] indicating how much variance there is in the angular spacing of vertices. [0,1] will map to [0, 2pi/numberOfVerts]
   * spikeyness - [0,1] indicating how much variance there is in each vertex from the circle of radius aveRadius. [0,1] will map to [0, aveRadius]
   * numVerts - self-explanatory
   *
   * Returns a list of vertices, in CCW order.
   *
   * source: https://stackoverflow.com/a/25276331
   */
  static random(center, aveRadius, irregularity, spikeyness, numVerts) {
    let clip = (v, min, max) => Math.min(max, Math.max(min, v))
    let range = v => [...Array(v).keys()]

    // recompute values
    irregularity = clip(irregularity, 0, 1) * 2 * Math.PI / numVerts
    spikeyness = clip(spikeyness, 0, 1) * aveRadius

    // generate n angle steps
    let angleSteps = []
    let lower = (2 * Math.PI / numVerts) - irregularity
    let upper = (2 * Math.PI / numVerts) + irregularity
    let sum = range(numVerts).reduce((acc, e) => {
      let tmp = Random.uniform(lower, upper)
      angleSteps.push(tmp)
      return acc + tmp
    }, 0)

    // normalize the steps so that point 0 and point n+1 are the same
    let k = sum / (2 * Math.PI)
    angleSteps = angleSteps.map(as => as / k)

    // now generate the points
    let angle = Random.uniform(0, 2 * Math.PI)
    let points = angleSteps.map(as => {
      let r_i = clip(Random.gauss(aveRadius, spikeyness), 0, 2 * aveRadius)
      let vx = center.x + r_i * Math.cos(angle)
      let vy = center.y + r_i * Math.sin(angle)
      angle += as
      return {x: Math.floor(vx), y: Math.floor(vy)}
    })

    return new Polygon(points)
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

  translate(v) {
    const newPoints = this.points.map(p => Transform.translate(p, v))
    return new Polygon(newPoints)
  }

  rotateAround(center, angle) {
    const newPoints = this.points.map(p => Transform.rotateAround(center, p, angle))
    return new Polygon(newPoints)
  }
}
