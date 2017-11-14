import Collision from '../public/js/foundation/collision.js'
import Polygon from '../public/js/foundation/polygon.js'
import { assert } from 'chai'

describe('Collision', () => {
  describe('#collide', () => {
    it('should collide', () => {
      const p1 = new Polygon([
        {x: 0, y: 0},
        {x: 10, y: 10},
        {x: 0, y: 10}
      ])

      const p2 = new Polygon([
        {x: 20, y: 0},
        {x: 20, y: 10},
        {x: 9, y: 10}
      ])

      assert.isOk(Collision.collide(p1,p2))
    })


    it('should collide even if it\'s on the border', () => {
      const p1 = new Polygon([
        {x: 0, y: 0},
        {x: 10, y: 10},
        {x: 0, y: 10}
      ])

      const p2 = new Polygon([
        {x: 20, y: 0},
        {x: 20, y: 10},
        {x: 10, y: 10}
      ])

      assert.isOk(Collision.collide(p1,p2))
    })

    it('should not collide', () => {
      const p1 = new Polygon([
        {x: 0, y: 0},
        {x: 10, y: 10},
        {x: 0, y: 10}
      ])

      const p2 = new Polygon([
        {x: 20, y: 0},
        {x: 20, y: 10},
        {x: 11, y: 10}
      ])

      assert.isNotOk(Collision.collide(p1,p2))
    })
  })
})


