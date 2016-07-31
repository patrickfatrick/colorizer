import test from 'ava'
import Colorizer from '../index'
let color

/**
 * DA70D6 => 218, 112, 214
 */

test.afterEach(() => {
  color = undefined
})

test('returns a ColorizerBase instance when hex provided', (t) => {
  color = Colorizer('#DA70D6')
  t.true(color.hasOwnProperty('__rgb'))
  t.deepEqual(color.__rgb, [218, 112, 214])
})

test('returns a ColorizerBase instance when rgb provided', (t) => {
  color = Colorizer([218, 112, 214])
  t.true(color.hasOwnProperty('__rgb'))
  t.deepEqual(color.__rgb, [218, 112, 214])
})

test('throws an error if invalid color provided', (t) => {
  t.throws(() => Colorizer('#DA70D'), Error, 'Invalid color provided')
  t.throws(() => Colorizer([260, 255, 255]), Error, 'Invalid color provided')
})
