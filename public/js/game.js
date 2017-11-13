class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    if (!this.canvas.getContext) throw "Unable to get context"
    this.ctx = this.canvas.getContext('2d')

    this.fps = 30
    this.frames = 0
    this.scenes = [ new Logo(), new SpaceShip({x: 100, y: 100}, 1) ]
    this.sounds = new AudioManager()

    this.resize()
    window.addEventListener('resize', () => this.resize(), false)
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  update() {
    this.frames++;
  }

  draw() {
    this.ctx.fillStyle = '#222'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.scenes[0].draw(this)
    this.scenes[1].draw(this)
  }

  run() {
    setInterval(() => {
      this.update()
      this.draw()
    }, 1000/this.fps)
  }
}


