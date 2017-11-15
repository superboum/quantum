import PhysicalObject from './physical_object.js'
import Polygon from '../foundation/polygon.js'

export default class Asteroid extends PhysicalObject {
  constructor(scene, pos, radius, camera) {
    super(scene, pos, camera)
    this.radius = radius
    this.center = {x: this.radius, y: this.radius }
    this.shape = Polygon.random(
      this.center, this.radius, 0.9, 0.1, 9
    )
    this.hitbox = this.shape
  }

  draw() {
    super.draw()
    this.game.ctx.beginPath()

    const spoint = this.shape.points[0]
    this.game.ctx.moveTo(spoint.x, spoint.y)

    this.shape.points.slice(1).forEach(
      p => this.game.ctx.lineTo(p.x, p.y)
    )

    this.game.ctx.closePath()
    this.game.ctx.stroke()
  }
}
