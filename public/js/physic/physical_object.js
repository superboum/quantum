export default class PhysicalObject {
  constructor(scene, pos, camera) {
    this.game = scene.game
    this.scene = scene
    this.pos = pos
    this.speed = {x: 0, y: 0}
    this.accel = {x: 0, y: 0}
    this.camera = camera
  }

  update() {
    this.speed.x += this.accel.x / this.game.fps
    this.speed.y += this.accel.y / this.game.fps

    this.pos.x += this.speed.x / this.game.fps
    this.pos.y += this.speed.y / this.game.fps
  }

  sound() {}

  draw() {}
}
