class SpaceShip extends PhysicalObject {
  constructor(scene, pos, camera) {
    super(scene,pos,camera)
    this.thrusting = false
    this.firing = false
    this.firingNext = 0
    this.hitbox = {x: 30, y: 40}
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
    if (this.firingNext > this.game.frames) return
    this.firingNext = this.game.frames + this.game.fps * 0.4
    const m = new Missile(
      this.scene,
      {
        x: this.pos.x + this.hitbox.x / 2,
        y: this.pos.y
      },
      this.camera
    )

    m.speed = {
      x: Math.sin(this.pos.angle) * 200,
      y: -Math.cos(this.pos.angle) * 200
    }

    this.scene.addMissile(m)
    this.firing = true
  }

  update() {
    super.update()
    this.thrusting = false
    this.firing = false
    this.accel = {x:0, y: 0}

    this.speed.x /= 0.5 / this.game.fps + 1
    this.speed.y /= 0.5 / this.game.fps + 1
  }

  sound() {
    if (this.thrusting)
      this.game.sounds.playParallel("thrust.wav")
    if (this.firing)
      this.game.sounds.playParallel("fire.wav")
  }

  draw() {
    // 30px width || 43 px height
    // translation
    this.game.ctx.translate(this.pos.x, this.pos.y)

    // rotation
    this.game.ctx.translate(this.hitbox.x / 2, this.hitbox.y / 2)
    this.game.ctx.rotate(this.pos.angle)
    this.game.ctx.translate(- this.hitbox.x / 2, - this.hitbox.y / 2)

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
