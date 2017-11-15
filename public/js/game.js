import StateMachine from './foundation/state_machine.js'
import AudioManager from './audio_manager.js'
import OpeningScene from './scene/opening_scene.js'
import FightScene from './scene/fight_scene.js'

export default class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    if (!this.canvas.getContext) throw "Unable to get context"
    this.ctx = this.canvas.getContext('2d')

    this.fps = 30
    this.frames = 0
    this.sounds = new AudioManager()
    this.keydown = {}
    this.scene = null

    this.resize()
    window.addEventListener('resize', () => this.resize(), false)
    window.addEventListener('keydown', e => this.keydown[e.keyCode] = true, false)
    window.addEventListener('keyup', e => this.keydown[e.keyCode] = false, false)

    this.state = new StateMachine({
      init: 'nothing',
      transitions: [
        { name: 'start', from: 'nothing', to: 'opening'},
        { name: 'play', from: 'opening', to: 'game'},
        { name: 'restart', from: 'game', to: 'opening'}
      ],
      methods: {
        start: () => {
          this.scene = new OpeningScene(this)
          this.scene.onEnded(() => this.state.transition('play'))
        },
        play: () => {
          this.scene = new FightScene(this)
          this.scene.onEnded(() => this.state.transition('restart'))
        },
        restart: () => {
          this.scene = new OpeningScene(this)
          this.scene.onEnded(() => this.state.transition('play'))
        }
      }
    })

    this.state.transition('start')
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  run() {
    setInterval(() => {
      this.frames++
      this.scene.update()
      this.scene.sound()
      this.scene.draw()
    }, 1000/this.fps)
  }
}


