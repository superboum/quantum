import Scene from './base_scene.js'
import SpaceShip from '../physic/spaceship.js'
import Missile from '../physic/missile.js'

export default class FightScene extends Scene {
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

    this.spaceship.onGone(() => this.end())

    this.gameObjects = [this.spaceship, this.ennemy]
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

  addMissile(m) {
    this.gameObjects.push(m)
    this.addTrigger(() => {
      const position = this.gameObjects.indexOf(m)
      this.gameObjects.splice(position, 1)
    }, this.game.fps * 3)
  }

  collided(o1, o2) {
    if (o1 instanceof SpaceShip) {
      o1.state.transition('hit')
    }

    if (o2 instanceof SpaceShip) {
      o2.state.transition('hit')
    }
  }
}
