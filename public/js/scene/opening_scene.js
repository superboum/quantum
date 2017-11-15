import Scene from './base_scene.js'
import Logo from '../physic/logo.js'

export default class OpeningScene extends Scene {
  constructor(game) {
    super(game)
    this.logo = new Logo(this, 'hud')
    this.gameObjects = [this.logo]
    this.addTrigger(
      () => this.end(),
      this.game.fps * 2
    )
  }
}
