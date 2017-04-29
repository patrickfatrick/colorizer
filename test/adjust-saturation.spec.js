import test from 'ava'
import { adjustSaturation } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('adjusts the saturation of the color', (t) => {
  t.deepEqual(adjustSaturation(-9)(t.context.color), [ 210, 121, 207 ])
})

test('normalizes low saturations', (t) => {
  t.deepEqual(adjustSaturation(-100)(t.context.color), [ 166, 166, 166 ])
})

test('normalizes high saturations', (t) => {
  t.deepEqual(adjustSaturation(100)(t.context.color), [ 255, 77, 249 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(adjustSaturation(-9)(adjustSaturation(3))(t.context.color), [ 213, 118, 210 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(adjustSaturation(-9)('#da70d6'), [ 210, 121, 207 ])
})

test('throws on invalid color', (t) => {
  t.throws(() => adjustSaturation(-9)([ 0, 0, 260 ]), Error, 'Invalid color provided')
})

test('throws on invalid factor', (t) => {
  t.throws(() => adjustSaturation('-9')(t.context.color), Error, 'Invalid factor provided')
})
