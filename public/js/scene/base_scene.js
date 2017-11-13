class Scene {
  update(game) {
    this.gameObjects.forEach(e => e.update(game))
  }

  draw(game) {
    this.gameObjects.forEach(e => e.draw(game))
  }

  sound(game) {
    this.gameObjects.forEach(e => e.sound(game))
  }

  keydown(game, e) {
  }
}
