import BaseCamera from '../camera/following_camera.js'
import FollowingCamera from '../camera/following_camera.js'
import Combination from '../foundation/combination.js'
import Collision from '../foundation/collision.js'

export default class Scene {
  constructor(game) {
    this.game = game
    this.gameObjects = []
    this.triggers = {}
    this.cameras = {
      'hud': new BaseCamera(this.game),
      'following': new FollowingCamera(this.game)
    }
  }

  _handleCollisions() {
    Combination.twoByTwoOnArray(
      this.gameObjects.filter(g => g.hitbox)
    ).forEach(g => {
      if (Collision.collide(g[0].hitboxOnMap, g[1].hitboxOnMap)) {
        this.collided(g[0], g[1])
      }
    })
  }

  addTrigger(fn, count) {
    const t = this.game.frames + count
    if (!this.triggers[t])
      this.triggers[t] = []
    this.triggers[t].push(fn)
  }

  update(game) {
    this.gameObjects.forEach(e => e.update(game))
    this._handleCollisions()
    if (this.triggers[this.game.frames]) {
      this.triggers[this.game.frames].forEach(f => f())
      delete this.triggers[this.game.frames]
    }
  }

  draw(game) {
    this.game.ctx.fillStyle = '#222'
    this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)

    this.gameObjects.forEach(e => {
      this.cameras[e.camera].use()
      e.draw(game)
      this.cameras[e.camera].done()
    })
  }

  sound(game) {
    this.gameObjects.forEach(e => e.sound(game))
  }

  keydown(game, e) {
  }
}
