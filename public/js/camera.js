class Camera {
  constructor(game) {
    this.centerOn = null
    this.game = game
  }

  use() {
    if (this.centerOn && this.centerOn.pos) {
      this.game.ctx.save()
      this.game.ctx.translate(
        this.game.canvas.width / 2 - this.centerOn.pos.x,
        this.game.canvas.height / 2 - this.centerOn.pos.y
      )
    }
  }

  done() {
    if (this.centerOn && this.centerOn.pos)
      this.game.ctx.restore()
  }
}
