class Logo {
  constructor() {
    this.lastPrint = 0
  }

  draw(game) {
    const textToPrint = 'Quantum'
    const toPrint = Math.floor(Math.min(game.frames / game.fps / 0.2, textToPrint.length))
    if (this.lastPrint != toPrint) {
      console.log(toPrint)
      this.lastPrint = toPrint
      game.sounds.play("key.mp3")
    }

    game.ctx.textAlign = 'center'
    game.ctx.textBaseline = 'middle'
    game.ctx.font = '80px Hyperspace'
    game.ctx.strokeStyle = '#dddddd'
    game.ctx.fillStyle = '#dddddd'
    game.ctx.fillText(textToPrint.substring(0,toPrint), game.canvas.width / 2, game.canvas.height / 2)

  }
}

class SpaceShip {
  constructor(pos, orientation) {
    this.pos = pos
    this.orientation = orientation
  }

  draw(game) {
    game.ctx.save()

    game.ctx.translate(this.pos.x, this.pos.y)
    game.ctx.rotate(this.orientation)

    game.ctx.strokeStyle = '#ddd'
    game.ctx.beginPath()
    game.ctx.moveTo(15,0)
    game.ctx.lineTo(30,40)
    game.ctx.lineTo(20,35)
    game.ctx.lineTo(10,35)
    game.ctx.lineTo(0,40)
    game.ctx.closePath()
    game.ctx.stroke()

    game.ctx.restore()
  }
}
