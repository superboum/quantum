import BaseCamera from '../camera/following_camera.js'
import FollowingCamera from '../camera/following_camera.js'

export default class Scene {
  constructor(game) {
    this.game = game
    this.gameObjects = []
    this.cameras = {
      'hud': new BaseCamera(this.game),
      'following': new FollowingCamera(this.game)
    }
  }

  update(game) {
    this.gameObjects.forEach(e => e.update(game))
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
