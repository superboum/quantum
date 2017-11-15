/*
 * StateMachine
 *
 * Example:
 * var fsm = new StateMachine({
 *   init: 'solid',
 *   transitions: [
 *     { name: 'melt',     from: 'solid',  to: 'liquid' },
 *     { name: 'freeze',   from: 'liquid', to: 'solid'  },
 *     { name: 'vaporize', from: 'liquid', to: 'gas'    },
 *     { name: 'condense', from: 'gas',    to: 'liquid' }
 *   ],
 *   methods: {
 *     melt:     function() { console.log('I melted')    },
 *     freeze:   function() { console.log('I froze')     },
 *     vaporize: function() { console.log('I vaporized') },
 *     condense: function() { console.log('I condensed') }
 *   }
 * });
 *
 * Interface inspired by: https://github.com/jakesgordon/javascript-state-machine
 */
export default class StateMachine {
  constructor(params) {
    this.state = params.init
    this.transitions = params.transitions
    this.methods = params.methods
  }

  transition(name, params) {
    const t = this.transitions.find(e => e.name == name)
    if (!t || t.from != this.state) return false
    if (!this.methods[name]) return false
    this.state = t.to
    this.methods[t.name](params)
    return true
  }

  is(name) {
    return name == this.state
  }

  can(name) {
    return this.transitions.find(e => e.name == name).from == this.state
  }

  cannot(name) {
    return !this.can(name)
  }

  availableTransitions() {
    return this.transitions.filter(e => e.from == this.state)
  }
}
