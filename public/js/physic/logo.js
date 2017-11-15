import PhysicalObject from './physical_object.js'

export default class Logo extends PhysicalObject {
  constructor(scene, camera) {
    super(
      scene, {
        x: scene.game.canvas.width / 2,
        y: scene.game.canvas.height / 2,
        angle: 0
      }, camera
    )
    this.toPrint = 0
    this.lastPrint = 0
    this.keySound = false
    this.textToPrint = 'Quantum'
    this.startFrame = this.game.frames
  }

  update() {
    this.keySound = false
    this.toPrint = Math.floor(
      Math.min(
        (this.game.frames - this.startFrame) / this.game.fps / 0.2,
        this.textToPrint.length
    ))

    if (this.lastPrint != this.toPrint) {
      this.lastPrint = this.toPrint
      this.keySound = true
    }
  }

  sound() {
    if (this.keySound)
      this.game.sounds.playParallel("key.mp3")
  }

  draw() {
    this.game.ctx.textAlign = 'center'
    this.game.ctx.textBaseline = 'middle'
    this.game.ctx.font = '80px Hyperspace'
    this.game.ctx.strokeStyle = '#dddddd'
    this.game.ctx.fillStyle = '#dddddd'
    this.game.ctx.fillText(
      this.textToPrint.substring(0,this.toPrint),
      this.pos.x,
      this.pos.y)
  }
}


