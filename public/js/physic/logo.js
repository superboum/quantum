class Logo extends PhysicalObject {
  constructor(scene, camera) {
    super(scene, {x: 200, y: 200, angle: 0}, camera)
    this.toPrint = 0
    this.lastPrint = 0
    this.keySound = false
    this.textToPrint = 'Quantum'
  }

  update() {
    this.keySound = false
    this.toPrint = Math.floor(
      Math.min(
        this.game.frames / this.game.fps / 0.2,
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


