import test from 'ava'
import { adjustLightness } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('adjusts the lightness of the color', (t) => {
  t.deepEqual(adjustLightness(-15)(t.context.color), [ 203, 52, 198 ])
})

test('normalizes low lightnesses', (t) => {
  t.deepEqual(adjustLightness(-100)(t.context.color), [ 0, 0, 0 ])
})

test('normalizes high lightnesses', (t) => {
  t.deepEqual(adjustLightness(100)(t.context.color), [ 255, 255, 255 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(adjustLightness(-15)(adjustLightness(5))(t.context.color), [ 208, 73, 203 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(adjustLightness(-15)('#da70d6'), [ 203, 52, 198 ])
})

test('throws on invalid color', (t) => {
  t.throws(() => adjustLightness(-15)([ 0, 0, 260 ]), Error, 'Invalid color provided')
})

test('throws on invalid factor', (t) => {
  t.throws(() => adjustLightness('-15')(t.context.color), Error, 'Invalid factor provided')
})
