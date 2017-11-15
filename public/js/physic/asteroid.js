import PhysicalObject from './physical_object.js'
import Polygon from '../foundation/polygon.js'

export default class Asteroid extends PhysicalObject {
  constructor(scene, pos, camera) {
    super(scene, pos, camera)
    this.shape = Polygon.random(
      {x: 20, y: 20},
      20, 0.9, 0.1, 9
    )
  }

  draw() {
    this.game.ctx.strokeStyle = '#ddd'
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
