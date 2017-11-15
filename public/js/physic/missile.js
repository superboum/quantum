import PhysicalObject from './physical_object.js'
import Polygon from '../foundation/polygon.js'

export default class Missile extends PhysicalObject {
  constructor(scene, pos, camera, createdBy) {
    super(scene, pos, camera)
    this.radius = 2
    this.createdBy = createdBy
    this.local = false
    this.center = {x: this.radius, y: this.radius}
    this.hitbox = new Polygon([
      {x: 0, y: 0}, {x: this.radius*2, y: 0},
      {x: this.radius*2, y: this.radius*2},
      {x: 0, y: this.radius*2}
    ])
  }

  serialize() {
    return {
      pos: this.pos,
      createdBy: this.createdBy
    }
  }

  static deserializeAndCreate(scene, elem, camera) {
    const s = new Missile(scene, {x:0, y:0, angle: 0}, camera)
    s.deserialize(elem)
    return s
  }

  deserialize(elem) {
    Object.assign(this, elem)
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
