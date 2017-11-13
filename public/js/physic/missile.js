class Missile extends PhysicalObject {
  constructor(scene, pos, camera) {
    super(scene, pos, camera)
  }

  draw() {
    this.game.ctx.fillStyle = '#ddd'
    this.game.ctx.beginPath()

    this.game.ctx.arc(
      this.pos.x,
      this.pos.y,
      2,
      0,
      Math.PI * 2
    )

    this.game.ctx.fill()
  }
}
