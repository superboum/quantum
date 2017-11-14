export default class Combination {
  static twoByTwoOnArray(a) {

    let rec = (active, rest) => {
      if (active.length == 2) return [active]
      if (rest.length == 0) return []

      return rec(
        active.concat(rest.slice(0,1)),
        rest.slice(1)
      ).concat(
        rec(active, rest.slice(1))
      )
    }

    return rec([], a)
  }
}
