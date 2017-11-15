import PhysicalObject from './physical_object.js'
import Missile from './missile.js'
import Transform from '../foundation/transform.js'
import Polygon from '../foundation/polygon.js'
import StateMachine from '../foundation/state_machine.js'

export default class SpaceShip extends PhysicalObject {
  constructor(scene, pos, camera) {
    super(scene,pos,camera)
    this.thrusting = false
    this.firing = false
    this.firingNext = 0
    this.callOnGone = []
    this.drawbox = {x: 30, y: 40}
    this.center = {x: this.drawbox.x / 2, y: this.drawbox.y / 2}
    this.shiftAngle = -Math.PI / 2

    this.hitbox = new Polygon([
      {x: 15, y:  0},
      {x: 30, y: 40},
      {x:  0, y: 40}
    ])

    this.state = new StateMachine({
      init: 'alive',
      transitions: [
        { name: 'hit', from: 'alive', to: 'exploding' },
        { name: 'gone', from: 'exploding', to: 'dead' },
        { name: 'one_up', from: 'dead', to: 'alive' }
      ],
      methods: {
        hit: () => this.hit(),
        gone: () => this.gone(),
        one_up: () => this.one_up()
      }
    })
  }

  onGone(fn) { this.callOnGone.push(fn) }

  hit() {
    this.hitbox = null
    this.dyingStart = this.game.frames
    this.game.sounds.playParallel("bangLarge.wav")
    this.scene.addTrigger(() => this.state.transition('gone'), this.game.fps * 2)
  }

  gone() {
    this.accel = {x: 0, y: 0}
    this.speed = {x: 0, y: 0}
    this.callOnGone.forEach(f => f())
  }

  one_up() {
  }

  thrust() {
    if (!this.state.is('alive')) return
    this.accel = Transform.projection(this.pos.angle + this.shiftAngle, 200)
    this.thrusting = true
  }

  rotateRight() {
    if (!this.state.is('alive')) return
    this.pos.angle = (this.pos.angle + 0.1) % (Math.PI * 2)
  }

  rotateLeft() {
    if (!this.state.is('alive')) return
    this.pos.angle = (this.pos.angle - 0.1) % (Math.PI * 2)
  }

  computeMissileStartPosition() {
    const translation = {x: this.drawbox.x / 2, y: 0}
    const pos = Transform.rotateAround(
      this.centerOnMap,
      Transform.translate(this.pos, translation),
      this.pos.angle
    )
    pos.angle = this.pos.angle
    return pos
  }

  fire() {
    if (!this.state.is('alive')) return
    if (this.firingNext > this.game.frames) return
    this.firingNext = this.game.frames + this.game.fps * 0.4
    const m = new Missile(
      this.scene,
      this.computeMissileStartPosition(),
      this.camera,
      this
    )

    const faster = Transform.projection(this.pos.angle + this.shiftAngle, 300)
    m.speed.x = this.speed.x + faster.x
    m.speed.y = this.speed.y + faster.y

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
    //if (this.thrusting)
      //this.game.sounds.playParallel("thrust.wav")
    if (this.firing)
      this.game.sounds.playParallel("fire.wav")
  }

  draw() {
    super.draw()
    if(this['draw_ship_'+this.state.state])
      this['draw_ship_'+this.state.state]()
  }

  serialize() {
    return {
      pos: this.pos,
      firing: this.firing,
      thrusting: this.thrusting,
    }
  }

  static deserializeAndCreate(scene, elem, camera) {
    const s = new SpaceShip(scene, {x:0, y:0, angle: 0}, camera)
    s.deserialize(elem)
    return s
  }

  deserialize(elem) {
    Object.assign(this, elem)
  }

  draw_ship_exploding() {
    const delta = this.game.frames - this.dyingStart
    this.game.ctx.beginPath()
    this.game.ctx.moveTo(15-delta,0-delta)
    this.game.ctx.lineTo(30-delta,40-delta)
    this.game.ctx.stroke()

    this.game.ctx.beginPath()
    this.game.ctx.moveTo(30,40)
    this.game.ctx.lineTo(0,40)
    this.game.ctx.stroke()

    this.game.ctx.beginPath()
    this.game.ctx.moveTo(15+delta,0-delta)
    this.game.ctx.lineTo(0+delta,40-delta)
    this.game.ctx.stroke()

  }

  draw_ship_alive() {
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
