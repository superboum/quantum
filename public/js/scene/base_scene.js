class Scene {
  update(game) {
    this.gameObjects.forEach(e => e.update(game))
  }

  draw(game) {
    this.gameObjects.forEach(e => e.draw(game))
  }

  keydown(game, e) {
  }
}
