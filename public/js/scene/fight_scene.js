import Scene from './base_scene.js'
import SpaceShip from '../physic/spaceship.js'
import Missile from '../physic/missile.js'
import Typewriter from '../physic/typewriter.js'
import Asteroid from '../physic/asteroid.js'
import Random from '../foundation/random.js'

export default class FightScene extends Scene {
  constructor(game, net) {
    super(game)

    this.net = net
    this.my_missiles = []
    this.yours_missiles = []
    this.asteroids = []
    this.score = {mine: 0, yours: 0}

    if (!this.net.initiator) {
      console.log('acting as server')
      this._init_game()
    } else {
      console.log('acting as client')
    }

    this.scoreDisplay = new Typewriter(
      this,
      {
        x: game.canvas.width / 2,
        y: 20,
        angle: 0
      },
      {
        text: '0 - 0',
        speed: 0.1,
        font: '20px Hyperspace',
        baseline: 'top',
      },
      'hud'
    )

    this.net.onMessage((msg) => this._handle_data(msg))
  }

  _init_game() {
    [this.mine, this.yours] = this._generate_spaceships()
    this.asteroids = this._generate_asteroids()

    const msg = {
      cmd: 'init',
      mine: this.mine.serialize(),
      yours: this.yours.serialize(),
      asteroids: this.asteroids.map(a => a.serialize())
    }
    this.net.send(msg)

    this.mine.onGone(() => this._init_game())
    this.yours.onGone(() => this._init_game())
    this.mine.onGone(() => this.score.yours++)
    this.yours.onGone(() => this.score.mine++)
  }

  _handle_data(msg) {
    if (msg.cmd == 'init') {
      this.mine = SpaceShip.deserializeAndCreate(this, msg.yours, 'following')
      this.yours = SpaceShip.deserializeAndCreate(this, msg.mine, 'following')
      this.asteroids = msg.asteroids.map(
        a => Asteroid.deserializeAndCreate(this, a, 'following')
      )
      this.mine.onGone(() => this.score.yours++)
      this.yours.onGone(() => this.score.mine++)
    } else if (msg.cmd == 'updt') {
      this.yours.deserialize(msg.mine)
      this.yours_missiles = msg.my_missiles.map(
        m => Missile.deserializeAndCreate(this, m, 'following')
      )
    } else if (msg.cmd == 'hit') {
      this.mine.state.transition('hit')
    }
  }

  _generate_spaceships() {
    return [
      {x: 0, y: 0, angle: Math.PI / 2},
      {x: 600, y: 0, angle: -Math.PI / 2}
    ].map((p, i) => {
      let s = new SpaceShip(this, p, 'following')
      s.id = i
      return s
    })
  }

  _generate_asteroids() {
    return [...Array(25).keys()].map(i =>
      new Asteroid(
        this,
        {x: Random.uniform(-1000,1600), y: Random.uniform(-1000,1000), angle: 0},
        Random.uniform(15,40),
        'following'
      ))
  }

  update() {
    this.gameObjects = [
      this.mine,
      this.yours,
      this.scoreDisplay,
      ...this.asteroids,
      ...this.my_missiles,
      ...this.yours_missiles
    ]

    super.update()
    this.cameras['following'].centerOn = this.mine
    if (!(this.mine && this.yours && this.asteroids)) return

    if (this.game.keydown[38]) this.mine.thrust()
    if (this.game.keydown[39]) this.mine.rotateRight()
    else if (this.game.keydown[37]) this.mine.rotateLeft()
    if (this.game.keydown[32]) this.mine.fire()

    this.net.send({
      cmd: 'updt',
      mine: this.mine.serialize(),
      my_missiles: this.my_missiles.map(m => m.serialize())
    })

    this.scoreDisplay.config.text = this.score.mine + ' - ' + this.score.yours
  }

  addMissile(m) {
    this.my_missiles.push(m)
    this.addTrigger(() => this.removeMissile(m), this.game.fps * 3)
  }

  removeMissile(m) {
    const position = this.my_missiles.indexOf(m)
    position == -1 || this.my_missiles.splice(position, 1)
  }

  collided(o1, o2) {
    const objs = [o1, o2]
    objs.forEach((o, i) => {
      let other = objs[i == 0 ? 1 : 0]
      if (o instanceof SpaceShip && other.createdBy != o.id) {
        o.state.transition('hit')
        if (o === this.yours) this.net.send({cmd: 'hit'})
      }
      if (o instanceof Missile) this.removeMissile(o)
    })
  }
}
