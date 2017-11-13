class Scene {
  update(game) {
    this.gameObjects.forEach(e => e.update(game))
  }

  draw(game) {
    this.gameObjects.forEach(e => e.draw(game))
  }

  keydown(game, e) {
  }
}

class OpeningScene extends Scene {
  constructor() {
    super()
    this.spaceship = new SpaceShip({x: 100, y: 100}, Math.PI * 3/4)
    this.logo = new Logo();
    this.gameObjects = [this.logo, this.spaceship]
  }

  update(game) {
    super.update(game)
    if (game.keydown[38]) this.spaceship.thrust()
    if (game.keydown[39])
      this.spaceship.orientation = (this.spaceship.orientation + 0.1) % (Math.PI*2)
    else if (game.keydown[37])
      this.spaceship.orientation = (this.spaceship.orientation - 0.1) % (Math.PI*2)
  }
}

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

class SpaceShip {
  constructor(pos, orientation) {
    this.pos = pos
    this.speed = 8
    this.orientation = orientation
  }

  thrust() {
    this.pos.x += Math.sin(this.orientation) * this.speed
    this.pos.y -= Math.cos(this.orientation) * this.speed
  }

  update(game) {}

  draw(game) {
    // 30px width || 40 px height
    game.ctx.save()

    game.ctx.translate(this.pos.x, this.pos.y)

    game.ctx.translate(15, 30)
    game.ctx.rotate(this.orientation)
    game.ctx.translate(-15, -30)

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
