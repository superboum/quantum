import Scene from './base_scene.js'
import SpaceShip from '../physic/spaceship.js'
import Missile from '../physic/missile.js'
import Logo from '../physic/logo.js'
import Combination from '../foundation/combination.js'
import Collision from '../foundation/collision.js'

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
    this.gameObjects.push(m)
  }

  sound() {
    this.logo.sound()
    this.spaceship.sound()
  }

  draw() {
    super.draw()

    this.cameras.following.use()
    let h = this.ennemy.hitboxOnMap
    this.game.ctx.fillStyle = '#00ff00'
    this.game.ctx.beginPath()
    this.game.ctx.moveTo(h.points[0].x, h.points[0].y)
    this.game.ctx.lineTo(h.points[1].x, h.points[1].y)
    this.game.ctx.lineTo(h.points[2].x, h.points[2].y)
    this.game.ctx.closePath()
    this.game.ctx.fill()

    h = this.spaceship.hitboxOnMap
    this.game.ctx.fillStyle = '#ff0000'
    this.game.ctx.beginPath()
    this.game.ctx.moveTo(h.points[0].x, h.points[0].y)
    this.game.ctx.lineTo(h.points[1].x, h.points[1].y)
    this.game.ctx.lineTo(h.points[2].x, h.points[2].y)
    this.game.ctx.closePath()
    this.game.ctx.fill()
    this.cameras.following.done()
  }

  update() {
    super.update()

    Combination.twoByTwoOnArray(
      this.gameObjects.filter(g => g.hitbox)
    ).forEach(g => {
      if (Collision.collide(g[0].hitboxOnMap, g[1].hitboxOnMap)) {
        console.log("boum")
      }
    })

    this.cameras['following'].centerOn = this.spaceship

    if (this.game.keydown[38]) this.spaceship.thrust()

    if (this.game.keydown[39]) this.spaceship.rotateRight()
    else if (this.game.keydown[37]) this.spaceship.rotateLeft()

    if (this.game.keydown[32]) this.spaceship.fire()

    this.ennemy.thrust()
    this.ennemy.rotateLeft()
  }
}
