class OpeningScene extends Scene {
  constructor(game) {
    super(game)
    this.spaceship = new SpaceShip(
      game,
      {x: 100, y: 100, angle: Math.PI * 3/4},
      'following'
    )
    this.logo = new Logo(game, 'following');
    this.gameObjects = [this.logo, this.spaceship]
  }

  sound() {
    this.logo.sound()
    this.spaceship.sound()
  }

  update() {
    super.update()
    this.cameras['following'].centerOn = this.spaceship

    if (this.game.keydown[38]) this.spaceship.thrust()

    if (this.game.keydown[39]) this.spaceship.rotateRight()
    else if (this.game.keydown[37]) this.spaceship.rotateLeft()

    if (this.game.keydown[32]) this.spaceship.fire()
  }
}
