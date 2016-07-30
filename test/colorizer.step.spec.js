import test from 'ava'
import Colorizer from '../index'
let color

test.before((t) => {
  color = Colorizer('#DA70D6')
})

test('can step any method', (t) => {
  t.deepEqual(color.step('multiply', 1.1, 10), ['da70d6', 'f07beb', 'ff88ff', 'ff95ff', 'ffa4ff', 'ffb4ff', 'ffc6ff', 'ffdaff', 'fff0ff', 'ffffff', 'ffffff'])
})
