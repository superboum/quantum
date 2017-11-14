import Combination from '../public/js/foundation/combination.js'
import { assert } from 'chai'

describe('Combination', () => {
  describe('#twoByTwoOnArray', () => {
    it('should return an array of combinated elements', () => {
      assert.deepEqual(
        Combination.twoByTwoOnArray(['a', 'b', 'c', 'd']),
        [['a', 'b'], ['a', 'c'], ['a', 'd'],
          ['b', 'c'], ['b', 'd'], ['c', 'd']]
      )
    })
  })
})
