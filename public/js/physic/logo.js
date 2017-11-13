class Logo {
  constructor() {
    this.lastPrint = 0
  }

  update(game) {}

  draw(game) {
    const textToPrint = 'Quantum'
    const toPrint = Math.floor(Math.min(game.frames / game.fps / 0.2, textToPrint.length))
    if (this.lastPrint != toPrint) {
      this.lastPrint = toPrint
      game.sounds.play("key.mp3")
    }

    game.ctx.fillStyle = '#222'
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height)

    game.ctx.textAlign = 'center'
    game.ctx.textBaseline = 'middle'
    game.ctx.font = '80px Hyperspace'
    game.ctx.strokeStyle = '#dddddd'
    game.ctx.fillStyle = '#dddddd'
    game.ctx.fillText(textToPrint.substring(0,toPrint), game.canvas.width / 2, game.canvas.height / 2)

  }
}


