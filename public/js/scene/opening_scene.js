import Scene from './base_scene.js'
import SpaceShip from '../physic/spaceship.js'
import Missile from '../physic/missile.js'
import Logo from '../physic/logo.js'

export default class OpeningScene extends Scene {
  constructor(game) {
    super(game)
    this.spaceship = new SpaceShip(
      this,
      {x: 100, y: 100, angle: Math.PI * 3/4},
      'following'
    )

    this.ennemy = new SpaceShip(
      this,
      {x: 300, y: 100, angle: Math.PI * 1/4},
      'following'
    )

    this.logo = new Logo(this, 'following');
    this.missiles = []
    this.gameObjects = [this.logo, this.spaceship, this.ennemy]
  }

  addMissile(m) {
    this.missiles.push(m)
    const position = this.gameObjects.length
    this.gameObjects.push(m)
    this.addTrigger(() => {
      this.gameObjects.splice(position)
    }, this.game.fps * 3)
  }

  sound() {
    this.logo.sound()
    this.spaceship.sound()
  }

  draw() {
    super.draw()
  }

  collided(o1, o2) {
    if (o1 instanceof SpaceShip) {
      o1.state = 'dead'
    }

    if (o2 instanceof SpaceShip) {
      o2.state = 'dead'
    }
  }

  update() {
    super.update()
    this.cameras['following'].centerOn = this.spaceship

    if (this.game.keydown[38]) this.spaceship.thrust()

    if (this.game.keydown[39]) this.spaceship.rotateRight()
    else if (this.game.keydown[37]) this.spaceship.rotateLeft()

    if (this.game.keydown[32]) this.spaceship.fire()

    this.ennemy.thrust()
    this.ennemy.rotateLeft()
  }
}
