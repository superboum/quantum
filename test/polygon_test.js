import Polygon from '../public/js/foundation/polygon.js'
import { assert } from 'chai'

describe('Polygon', () => {
  describe('#edges', () => {
    it('should compute edges', () => {
      let p = new Polygon([
        {x: 0, y: 0},
        {x: 5, y: 1},
        {x: 1, y: 5}
      ])

      let e = p.edges

      assert.deepEqual(
        p.edges,
        [
          {x: 5, y: 1},
          {x: -4, y: 4},
          {x: -1, y: -5}
        ])
    })
  })
})

