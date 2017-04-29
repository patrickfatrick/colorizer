import test from 'ava'
import { subtractRgbChannels } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * 00B0FF => 0, 176, 255
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('subtracts color by a number', (t) => {
  t.deepEqual(subtractRgbChannels(50)(t.context.color), [ 168, 62, 164 ])
})

test('subtracts color by another color', (t) => {
  t.deepEqual(subtractRgbChannels('#00B0FF')(t.context.color), [ 218, 0, 0 ])
})

test('subtracts color by another color (rgb)', (t) => {
  t.deepEqual(subtractRgbChannels([0, 176, 255])(t.context.color), [ 218, 0, 0 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(subtractRgbChannels(50)('#da70d6'), [ 168, 62, 164 ])
})

test('does not mutate the input', (t) => {
  subtractRgbChannels(50)(t.context.color)
  t.deepEqual(t.context.color, [ 218, 112, 214 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(subtractRgbChannels(50)(subtractRgbChannels(10))(t.context.color), [ 158, 52, 154 ])
})

test('throws an error on invalid factor', (t) => {
  t.throws(() => subtractRgbChannels([ -1, -1, -1 ])(t.context.color), Error, 'Invalid factor provided')
})

test('throws an error on invalid input', (t) => {
  t.throws(() => subtractRgbChannels('#00B0FF')([ 0, 260, 0 ]), Error, 'Invalid color provided')
})
