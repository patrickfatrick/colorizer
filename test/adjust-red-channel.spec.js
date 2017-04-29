import test from 'ava'
import { adjustRedChannel } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('adjusts the red channel of the color', (t) => {
  t.deepEqual(adjustRedChannel(-202)(t.context.color), [ 16, 112, 214 ])
})

test('normalizes low values', (t) => {
  t.deepEqual(adjustRedChannel(-500)(t.context.color), [ 0, 112, 214 ])
})

test('normalizes high values', (t) => {
  t.deepEqual(adjustRedChannel(500)(t.context.color), [ 255, 112, 214 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(adjustRedChannel(-202)('#da70d6'), [ 16, 112, 214 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(adjustRedChannel(-100)(adjustRedChannel(50))(t.context.color), [ 168, 112, 214 ])
})

test('throws on invalid input', (t) => {
  t.throws(() => adjustRedChannel(-202)([ 0, 260, 0 ]), Error, 'Invalid color provided')
})

test('throws on invalid factor', (t) => {
  t.throws(() => adjustRedChannel('-202')(t.context.color), Error, 'Invalid factor provided')
})
