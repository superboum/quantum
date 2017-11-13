class FollowingCamera extends BaseCamera {
  constructor(game) {
    super(game)
    this.centerOn = null
  }

  use() {
    this.game.ctx.save()
    if (this.centerOn && this.centerOn.pos) {
      this.game.ctx.translate(
        this.game.canvas.width / 2 - this.centerOn.pos.x,
        this.game.canvas.height / 2 - this.centerOn.pos.y
      )
    }
  }

  done() {
    this.game.ctx.restore()
  }
}
