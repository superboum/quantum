class SpaceShip extends PhysicalObject {
  constructor(game, pos, camera) {
    super(game,pos,camera)
    this.speed = 8
    this.thrusting = false
  }

  thrust() {
    this.pos.x += Math.sin(this.pos.angle) * this.speed
    this.pos.y -= Math.cos(this.pos.angle) * this.speed
    this.thrusting = true
  }

  update() {
    this.thrusting = false
  }

  sound() {
    if (this.thrusting)
      this.game.sounds.playParallel("thrust.wav")
  }

  draw() {
    // 30px width || 43 px height
    // translation
    this.game.ctx.translate(this.pos.x, this.pos.y)

    // rotation
    this.game.ctx.translate(15, 30)
    this.game.ctx.rotate(this.pos.angle)
    this.game.ctx.translate(-15, -30)

    // color
    this.game.ctx.strokeStyle = '#ddd'

    // spaceship main
    this.game.ctx.beginPath()
    this.game.ctx.moveTo(15,0)
    this.game.ctx.lineTo(30,40)
    this.game.ctx.lineTo(20,35)
    this.game.ctx.lineTo(10,35)
    this.game.ctx.lineTo(0,40)
    this.game.ctx.closePath()
    this.game.ctx.stroke()

    //thrust
    if (this.thrusting) {
      this.game.ctx.beginPath()
      this.game.ctx.moveTo(20,35)
      this.game.ctx.lineTo(20,38)
      this.game.ctx.lineTo(15,43)
      this.game.ctx.lineTo(10,38)
      this.game.ctx.lineTo(10,35)
      this.game.ctx.closePath()
      this.game.ctx.stroke()
    }
  }
}
