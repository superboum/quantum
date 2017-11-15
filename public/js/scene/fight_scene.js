import Scene from './base_scene.js'
import SpaceShip from '../physic/spaceship.js'
import Missile from '../physic/missile.js'
import Asteroid from '../physic/asteroid.js'
import Random from '../foundation/random.js'

export default class FightScene extends Scene {
  constructor(game, net) {
    super(game)
    this.net = net
    if (!this.net.initiator) {
      this._init_game()
    }

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

    this.gameObjects = [this.mine, this.yours]
    this.gameObjects = this.gameObjects.concat(this.asteroids)
  }

  _handle_data(msg) {
    if (msg.cmd == 'init') {
      this.mine = SpaceShip.deserializeAndCreate(this, msg.yours, 'following')
      this.yours = SpaceShip.deserializeAndCreate(this, msg.mine, 'following')
      this.asteroids = msg.asteroids.map(
        a => Asteroid.deserializeAndCreate(this, a, 'following')
      )
      this.gameObjects = [this.mine, this.yours]
      this.gameObjects = this.gameObjects.concat(this.asteroids)
      console.log(this.asteroids)
    } else if (msg.cmd == 'updt') {
      this.yours.deserialize(msg.mine)
    }
  }

  _generate_spaceships() {
    return [
      {x: 0, y: 0, angle: Math.PI / 2},
      {x: 300, y: 0, angle: -Math.PI / 2}
    ].map(p => new SpaceShip(this, p, 'following'))
  }

  _generate_asteroids() {
    return [...Array(20).keys()].map(i =>
      new Asteroid(
        this,
        {x: Random.uniform(0,2000), y: Random.uniform(-1000,1000), angle: 0},
        Random.uniform(15,40),
        'following'
      ))
  }

  update() {
    super.update()
    this.cameras['following'].centerOn = this.mine
    if (!(this.mine && this.yours && this.asteroids)) return

    if (this.game.keydown[38]) this.mine.thrust()

    if (this.game.keydown[39]) this.mine.rotateRight()
    else if (this.game.keydown[37]) this.mine.rotateLeft()

    if (this.game.keydown[32]) this.mine.fire()

    //this.ennemy.thrust()
    //this.ennemy.rotateLeft()
    this.net.send({cmd: 'updt', mine: this.mine.serialize() })
  }

  addMissile(m) {
    this.gameObjects.push(m)
    this.addTrigger(() => this.removeMissile(m), this.game.fps * 3)
  }

  removeMissile(m) {
    const position = this.gameObjects.indexOf(m)
    position == -1 || this.gameObjects.splice(position, 1)
  }

  collided(o1, o2) {
    const objs = [o1, o2]
    objs.forEach((o, i) => {
      let other = objs[i+1%2]
      if (o instanceof SpaceShip) o.state.transition('hit')
      if (o instanceof Missile) this.removeMissile(o)
    })
  }
}
