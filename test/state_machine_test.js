import StateMachine from '../public/js/foundation/state_machine.js'
import { assert } from 'chai'

describe('StateMachine', () => {
  describe('#transition', () => {
    it('should work', () => {
      let called = false
      let notCalled = false
      const s = new StateMachine({
        init: 'solid',
        transitions: [
          { name: 'melt', from: 'solid', to: 'liquid' },
          { name: 'freeze', from: 'liquid', to: 'solid'},
        ],
        methods: {
          melt: () => called = true,
          freeze: () => notCalled = true
        }
      })
      assert.isNotOk(s.transition('freeze'))
      assert.isNotOk(s.transition('boum'))
      assert.isNotOk(s.transition())
      assert.isOk(s.transition('melt'))
      assert.equal(s.state, 'liquid')
      assert.isOk(called)
      assert.isNotOk(notCalled)
    })
  })

  describe('#can', () => {
    it('should work', () => {
      const s = new StateMachine({
        init: 'solid',
        transitions: [
          { name: 'melt', from: 'solid', to: 'liquid' },
          { name: 'freeze', from: 'liquid', to: 'solid'},
        ],
        methods: {
          melt: () => called = true,
          freeze: () => notCalled = true
        }
      })

      assert.isOk(s.can('melt'))
      assert.isNotOk(s.can('freeze'))
      assert.equal(s.availableTransitions()[0].name, 'melt')
    })
  })
})
