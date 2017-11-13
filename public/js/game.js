class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    if (!this.canvas.getContext) throw "Unable to get context"
    this.ctx = this.canvas.getContext('2d')

    this.fps = 30
    this.frames = 0
    this.scenes = [ new OpeningScene() ]
    this.sounds = new AudioManager()
    this.keydown = {}

    this.resize()
    window.addEventListener('resize', () => this.resize(), false)
    window.addEventListener('keydown', e => this.keydown[e.keyCode] = true, false);
    window.addEventListener('keyup', e => this.keydown[e.keyCode] = false, false);
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  run() {
    setInterval(() => {
      this.frames++
      this.scenes[0].update(this)
      this.scenes[0].draw(this)
    }, 1000/this.fps)
  }
}


