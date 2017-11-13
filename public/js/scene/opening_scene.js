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
