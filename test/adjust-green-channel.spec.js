import test from 'ava'
import { adjustGreenChannel } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('adjusts the red channel of the color', (t) => {
  t.deepEqual(adjustGreenChannel(-102)(t.context.color), [ 218, 10, 214 ])
})

test('normalizes low values', (t) => {
  t.deepEqual(adjustGreenChannel(-500)(t.context.color), [ 218, 0, 214 ])
})

test('normalizes high values', (t) => {
  t.deepEqual(adjustGreenChannel(500)(t.context.color), [ 218, 255, 214 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(adjustGreenChannel(-102)('#da70d6'), [ 218, 10, 214 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(adjustGreenChannel(-100)(adjustGreenChannel(2))(t.context.color), [ 218, 14, 214 ])
})

test('throws on invalid input', (t) => {
  t.throws(() => adjustGreenChannel(-202)([ 0, 260, 0 ]), Error, 'Invalid color provided')
})

test('throws on invalid factor', (t) => {
  t.throws(() => adjustGreenChannel('-202')(t.context.color), Error, 'Invalid factor provided')
})
