class Missile extends PhysicalObject {
  constructor(scene, pos, camera, createdBy) {
    super(scene, pos, camera)
    this.radius = 2
    this.createdBy = createdBy
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
