import test from 'ava'
import colorizer from '../index'

test('has some functions', (t) => {
  t.true(typeof colorizer === 'object')
  t.true(typeof colorizer.multiply === 'function')
  t.true(typeof colorizer.divide === 'function')
  t.true(typeof colorizer.add === 'function')
  t.true(typeof colorizer.subtract === 'function')
  t.true(typeof colorizer.rgb === 'function')
  t.true(typeof colorizer.step === 'function')
})
