class BaseCamera {
  constructor(game) {
    this.game = game
  }

  use() {
    this.game.ctx.save()
  }

  done() {
    this.game.ctx.restore()
  }
}
