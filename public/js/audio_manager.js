class AudioManager {

  constructor() {
    const toLoad = ['key.mp3', 'fire.wav', 'thrust.wav']

    this.sounds = toLoad.reduce((acc, cur) => {
      acc[cur] = new Audio("/sound/"+cur)
      return acc
    }, {})
  }

  playParallel(name) {
    this.sounds[name].cloneNode(true).play()
  }
}
