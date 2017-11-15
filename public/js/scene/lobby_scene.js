import Scene from './base_scene.js'
import Typewriter from '../physic/typewriter.js'
import Network from '../foundation/network.js'

export default class OpeningScene extends Scene {
  constructor(game) {
    super(game)
    this.myCode = null
    this.net = new Network()
    this.location = new Typewriter(
      this,
      {
        x: game.canvas.width / 2,
        y: game.canvas.height / 2 - 20,
        angle: 0
      },
      {
        text: 'Cap\'n, this is our current position: ',
        speed: 0.1,
        font: '30px Hyperspace',
      },
      'hud'
    )

    this.choice = new Typewriter(
      this,
      {
        x: game.canvas.width / 2,
        y: game.canvas.height / 2 + 20,
        angle: 0
      },
      {
        text: 'Give it to our enemy or jump somewhere: ______',
        speed: 0.1,
        font: '30px Hyperspace',
      },
      'hud'
    )

    this.location.onEnded(
      () => this.addTrigger(
        () => this.gameObjects.push(this.choice), this.game.fps*1
    ))

    this.gameObjects = []
    this.characters = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', '_'
    ]
    this.cursor = -6

    this.net.getLocation().then((data) => {
      this.location.config.text += data.code
      this.myCode = data.code
      this.gameObjects.push(this.location)
    })

    this.net.onReady(() => this.end(this.net))
  }

  _enter_destination(inc) {
    const c = this.choice.config
    const i = c.text.length + this.cursor
    let charPtr = (this.characters.indexOf(c.text[i]) + inc)
    if (charPtr >= this.characters.length) charPtr = 0
    else if (charPtr < 0) charPtr = this.characters.length -1
    const newChar = this.characters[charPtr]
    c.text = c.text.substr(0, i)
      + newChar
      + c.text.substr(i+1)
  }

  _connect() {
    const c = this.choice.config
    const i = c.text.length - 6
    const targetCode = c.text.substr(i)
    this.net.init(true, this.myCode, targetCode)
  }

  update() {
    super.update()
    if (this.game.justkeydown[37]) this.cursor = Math.min(0, Math.max(-6, this.cursor - 1))
    if (this.game.justkeydown[39]) this.cursor = Math.min(0, Math.max(-6, this.cursor + 1))
    if (this.game.justkeydown[38]) this._enter_destination(1)
    if (this.game.justkeydown[40]) this._enter_destination(-1)
    if (this.game.justkeydown[32]) this._connect()
    if (this.game.justkeydown[13]) this._connect()
  }

  draw() {
    super.draw()
  }
}
