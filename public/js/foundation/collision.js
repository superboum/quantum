/*
 * Collision
 *
 * Based on the Separating Axis Theorem applied to convex polygons
 * Some resources:
 *  - https://www.codeproject.com/Articles/15573/2D-Polygon-Collision-Detection
 *  - https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
 */
export default class Collision {
  static projectPolygon(axis, p) {
    const initDotProduct = axis.dotProduct(p.points[0])

    return p.points.reduce(
      (acc, p) => {
        const dotProduct = axis.dotProduct(p)
        if (dotProduct < acc.min) acc.min = dotProduct
        else if (dotProduct > acc.max) acc.max = dotProduct
        return acc
      },
      {
        min: initDotProduct,
        max: initDotProduct
      })
  }

  static isIntersecting(edge, p1, p2) {
    const axis = edge.perpendicular().normalize()
    const res1 = Collision.projectPolygon(axis, p1)
    const res2 = Collision.projectPolygon(axis, p2)
    const interval = res1.min < res2.min ? res2.min - res1.max : res1.min - res2.max
    return interval <= 0
  }

  static collide(p1, p2) {
    return p1.edges.every(e => Collision.isIntersecting(e, p1, p2))
      && p2.edges.every(e => Collision.isIntersecting(e, p1, p2))
  }
}
