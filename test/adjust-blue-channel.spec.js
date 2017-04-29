import test from 'ava'
import { adjustBlueChannel } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('adjusts the red channel of the color', (t) => {
  t.deepEqual(adjustBlueChannel(-102)(t.context.color), [ 218, 112, 112 ])
})

test('normalizes low values', (t) => {
  t.deepEqual(adjustBlueChannel(-500)(t.context.color), [ 218, 112, 0 ])
})

test('normalizes high values', (t) => {
  t.deepEqual(adjustBlueChannel(500)(t.context.color), [ 218, 112, 255 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(adjustBlueChannel(-102)('#da70d6'), [ 218, 112, 112 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(adjustBlueChannel(-100)(adjustBlueChannel(2))(t.context.color), [ 218, 112, 116 ])
})

test('throws on invalid input', (t) => {
  t.throws(() => adjustBlueChannel(-202)([ 0, 260, 0 ]), Error, 'Invalid color provided')
})

test('throws on invalid factor', (t) => {
  t.throws(() => adjustBlueChannel('-202')(t.context.color), Error, 'Invalid factor provided')
})
