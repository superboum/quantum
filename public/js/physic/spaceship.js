class SpaceShip extends PhysicalObject {
  constructor(game, pos, camera) {
    super(game,pos,camera)
    this.thrusting = false
  }

  thrust() {
    this.accel.x = Math.sin(this.pos.angle) * 200
    this.accel.y = -Math.cos(this.pos.angle) * 200
    this.thrusting = true
  }

  rotateRight() {
    this.pos.angle = (this.pos.angle + 0.1) % (Math.PI * 2)
  }

  rotateLeft() {
    this.pos.angle = (this.pos.angle - 0.1) % (Math.PI * 2)
  }

  fire() {
    console.log("poum poum")
  }

  update() {
    super.update()
    this.thrusting = false
    this.accel = {x:0, y: 0}
    this.speed.y /= 0.5 / this.game.fps + 1
    this.speed.x /= 0.5 / this.game.fps + 1
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
