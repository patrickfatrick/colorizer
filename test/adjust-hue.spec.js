import test from 'ava'
import { adjustHue } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('adjusts the hue of the color', (t) => {
  t.deepEqual(adjustHue(-202)(t.context.color), [ 148, 218, 113 ])
})

test('normalizes low hues', (t) => {
  t.deepEqual(adjustHue(-500)(t.context.color), [ 218, 113, 113 ])
})

test('normalizes high hues', (t) => {
  t.deepEqual(adjustHue(500)(t.context.color), [ 218, 113, 115 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(adjustHue(-202)('#da70d6'), [ 148, 218, 113 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(adjustHue(-202)(adjustHue(50))(t.context.color), [ 113, 218, 166 ])
})

test('throws on invalid input', (t) => {
  t.throws(() => adjustHue(-202)([ 0, 260, 0 ]), Error, 'Invalid color provided')
})

test('throws on invalid factor', (t) => {
  t.throws(() => adjustHue('-202')(t.context.color), Error, 'Invalid factor provided')
})
