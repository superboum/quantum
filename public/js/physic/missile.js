import PhysicalObject from './physical_object.js'
import Polygon from '../foundation/polygon.js'

export default class Missile extends PhysicalObject {
  constructor(scene, pos, camera, createdBy) {
    super(scene, pos, camera)
    this.radius = 2
    this.createdBy = createdBy
    this.center = {x: this.radius, y: this.radius}
    this.hitbox = new Polygon([
      {x: 0, y: 0}, {x: this.radius*2, y: 0},
      {x: this.radius*2, y: this.radius*2},
      {x: 0, y: this.radius*2}
    ])
  }

  draw() {
    this.game.ctx.fillStyle = '#ddd'
    this.game.ctx.beginPath()

    this.game.ctx.arc(
      this.pos.x,
      this.pos.y,
      this.radius,
      0,
      Math.PI * 2
    )

    this.game.ctx.fill()
  }
}
