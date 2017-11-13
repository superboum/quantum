class Logo {
  constructor() {
    this.toPrint = 0
    this.lastPrint = 0
    this.keySound = false
    this.textToPrint = 'Quantum'
  }

  update(game) {
    this.keySound = false
    this.toPrint = Math.floor(Math.min(game.frames / game.fps / 0.2, this.textToPrint.length))

    if (this.lastPrint != this.toPrint) {
      this.lastPrint = this.toPrint
      this.keySound = true
    }
  }

  sound(game) {
    if (this.keySound)
      game.sounds.playParallel("key.mp3")
  }

  draw(game) {
    game.ctx.fillStyle = '#222'
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height)

    game.camera.use()
    game.ctx.textAlign = 'center'
    game.ctx.textBaseline = 'middle'
    game.ctx.font = '80px Hyperspace'
    game.ctx.strokeStyle = '#dddddd'
    game.ctx.fillStyle = '#dddddd'
    game.ctx.fillText(this.textToPrint.substring(0,this.toPrint), game.canvas.width / 2, game.canvas.height / 2)
    game.camera.done()
  }
}


