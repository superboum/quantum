class SpaceShip {
  constructor(pos, orientation) {
    this.pos = pos
    this.speed = 8
    this.thrusting = false
    this.orientation = orientation
  }

  thrust() {
    this.pos.x += Math.sin(this.orientation) * this.speed
    this.pos.y -= Math.cos(this.orientation) * this.speed
    this.thrusting = true
  }

  update(game) {
    this.thrusting = false
  }

  draw(game) {
    // 30px width || 40 px height
    game.ctx.save()

    // translation
    game.ctx.translate(this.pos.x, this.pos.y)

    // rotation
    game.ctx.translate(15, 30)
    game.ctx.rotate(this.orientation)
    game.ctx.translate(-15, -30)

    // color
    game.ctx.strokeStyle = '#ddd'


    // spaceship main
    game.ctx.beginPath()
    game.ctx.moveTo(15,0)
    game.ctx.lineTo(30,40)
    game.ctx.lineTo(20,35)
    game.ctx.lineTo(10,35)
    game.ctx.lineTo(0,40)
    game.ctx.closePath()
    game.ctx.stroke()

    //thrust
    if (this.thrusting) {
      game.sounds.play("thrust.wav")

      game.ctx.beginPath()
      game.ctx.moveTo(20,35)
      game.ctx.lineTo(20,38)
      game.ctx.lineTo(15,43)
      game.ctx.lineTo(10,38)
      game.ctx.lineTo(10,35)
      game.ctx.closePath()
      game.ctx.stroke()
    }

    game.ctx.restore()
  }
}
