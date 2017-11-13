class AudioManager {

  constructor() {
    const toLoad = ['key.mp3']

    this.sounds = toLoad.reduce((acc, cur) => {
      acc[cur] = new Audio("/sound/"+cur)
      return acc
    }, {})
  }

  play(name) {
    this.sounds[name].cloneNode(true).play()
  }
}
