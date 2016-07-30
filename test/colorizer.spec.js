import test from 'ava'
import Colorizer from '../index'
let color

test.before((t) => {
  color = Colorizer('#DA70D6')
})

test('has some functions', (t) => {
  t.true(typeof color.init === 'function')
  t.true(typeof color === 'object')
  t.true(typeof color.multiply === 'function')
  t.true(typeof color.divide === 'function')
  t.true(typeof color.add === 'function')
  t.true(typeof color.subtract === 'function')
  t.true(typeof color.step === 'function')
  t.true(typeof color.blend === 'function')
  t.true(typeof color.to === 'function')
})
