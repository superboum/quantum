class OpeningScene extends Scene {
  constructor() {
    super()
    this.spaceship = new SpaceShip({x: 100, y: 100}, Math.PI * 3/4)
    this.logo = new Logo();
    this.gameObjects = [this.logo, this.spaceship]
  }

  sound(game) {
    this.logo.sound(game)
    this.spaceship.sound(game)
  }

  update(game) {
    super.update(game)
    game.camera.centerOn = this.spaceship
    if (game.keydown[38]) this.spaceship.thrust()
    if (game.keydown[39])
      this.spaceship.orientation = (this.spaceship.orientation + 0.1) % (Math.PI*2)
    else if (game.keydown[37])
      this.spaceship.orientation = (this.spaceship.orientation - 0.1) % (Math.PI*2)
  }
}
