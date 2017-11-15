import PhysicalObject from './physical_object.js'

export default class Typewriter extends PhysicalObject {
  constructor(scene, pos, config, camera) {
    super(
      scene, pos, camera
    )
    this.toPrint = 0
    this.lastPrint = 0
    this.keySound = false
    this.config = config
    this.callOnEnded = []
    this.startFrame = null
  }

  onEnded(fn) {
    this.callOnEnded.push(fn)
  }

  end() {
    this.callOnEnded.forEach(f => f())
  }

  update() {
    if (this.startFrame === null) this.startFrame = this.game.frames
    this.keySound = false
    this.toPrint = Math.floor(
      Math.min(
        (this.game.frames - this.startFrame) / this.game.fps / this.config.speed,
        this.config.text.length
    ))

    if (this.lastPrint != this.toPrint) {
      this.lastPrint = this.toPrint
      this.keySound = true
      this.lastPrint === this.config.text.length && this.end()
    }
  }

  sound() {
    if (this.keySound)
      this.game.sounds.playParallel("key.mp3")
  }

  draw() {
    this.game.ctx.textAlign = this.config.align || 'center'
    this.game.ctx.textBaseline = this.config.baseline || 'middle'
    this.game.ctx.font = this.config.font
    this.game.ctx.fillStyle = this.config.color || '#dddddd'
    this.game.ctx.fillText(
      this.config.text.substring(0,this.toPrint),
      this.pos.x,
      this.pos.y)
  }
}


