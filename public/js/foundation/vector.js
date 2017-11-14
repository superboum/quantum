class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  normalize() {
    const l = this.length()
    this.x /= l
    this.y /= la
    return this
  }

  perpendicular() {
    return new Vector(-this.y, this.x)
  }

  dotProduct(o) {
    return this.x * o.x + this.y * o.y
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}
