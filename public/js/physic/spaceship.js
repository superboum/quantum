class SpaceShip extends PhysicalObject {
  constructor(scene, pos, camera) {
    super(scene,pos,camera)
    this.thrusting = false
    this.firing = false
    this.firingNext = 0
    this.hitbox = {x: 30, y: 40}
    this.center = {x: this.hitbox.x / 2, y: this.hitbox.y / 2}
    this.shiftAngle = -Math.PI / 2
  }

  thrust() {
    this.accel = Transform.projection(this.pos.angle + this.shiftAngle, 200)
    this.thrusting = true
  }

  rotateRight() {
    this.pos.angle = (this.pos.angle + 0.1) % (Math.PI * 2)
  }

  rotateLeft() {
    this.pos.angle = (this.pos.angle - 0.1) % (Math.PI * 2)
  }

  computeMissileStartPosition() {
    const translation = {x: this.hitbox.x / 2, y: 0}
    return Transform.rotateAround(
      {x: this.pos.x + this.center.x, y: this.pos.y + this.center.y },
      Transform.translate(this.pos, translation),
      this.pos.angle
    )
  }

  fire() {
    if (this.firingNext > this.game.frames) return
    this.firingNext = this.game.frames + this.game.fps * 0.4
    const m = new Missile(
      this.scene,
      this.computeMissileStartPosition(),
      this.camera
    )

    m.speed = Transform.projection(this.pos.angle + this.shiftAngle, 200)

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
    this.game.ctx.translate(this.center.x, this.center.y)
    this.game.ctx.rotate(this.pos.angle)
    this.game.ctx.translate(-this.center.x, -this.center.y)

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
