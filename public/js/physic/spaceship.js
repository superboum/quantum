class SpaceShip {
  constructor(pos, orientation) {
    this.pos = pos
    this.speed = 8
    this.orientation = orientation
  }

  thrust() {
    this.pos.x += Math.sin(this.orientation) * this.speed
    this.pos.y -= Math.cos(this.orientation) * this.speed
  }

  update(game) {}

  draw(game) {
    // 30px width || 40 px height
    game.ctx.save()

    game.ctx.translate(this.pos.x, this.pos.y)

    game.ctx.translate(15, 30)
    game.ctx.rotate(this.orientation)
    game.ctx.translate(-15, -30)

    game.ctx.strokeStyle = '#ddd'
    game.ctx.beginPath()
    game.ctx.moveTo(15,0)
    game.ctx.lineTo(30,40)
    game.ctx.lineTo(20,35)
    game.ctx.lineTo(10,35)
    game.ctx.lineTo(0,40)
    game.ctx.closePath()
    game.ctx.stroke()

    game.ctx.restore()
  }
}
