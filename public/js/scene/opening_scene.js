import Scene from './base_scene.js'
import Typewriter from '../physic/typewriter.js'

export default class OpeningScene extends Scene {
  constructor(game) {
    super(game)
    this.logo = new Typewriter(
      this,
      {
        x: game.canvas.width / 2,
        y: game.canvas.height / 2,
        angle: 0
      },
      {
        text: 'Quantum',
        speed: 0.2,
        font: '80px Hyperspace',
      },
      'hud'
    )

    this.gameObjects = [this.logo]
    this.addTrigger(
      () => this.end(),
      this.game.fps * 2
    )
  }
}
