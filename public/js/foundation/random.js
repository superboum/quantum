export default class Random {
  /* gauss
   *
   * Use Box-Muller transform
   * https://stackoverflow.com/a/25276331
   * https://stackoverflow.com/a/23425268
   */
  static gauss(mu, sigma) {
    let u = 0, v = 0
    u = Math.random()
    u = u === 0 ? 0.5 : u
    v = Math.random()
    v = v === 0 ? 0.5 : v
    return (
     mu + sigma
       * Math.sqrt(-2.0 * Math.log(u))
       * Math.cos(2.0 * Math.PI * v)
    )
  }

  static uniform(lower, upper) {
    return Math.random() * (upper - lower) + lower
  }
}
