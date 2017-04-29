import test from 'ava'
import { multiplyRgbChannels } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * 00B0FF => 0, 176, 255
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('multiplies color by a number', (t) => {
  t.deepEqual(multiplyRgbChannels(1.1)(t.context.color), [ 240, 123, 235 ])
})

test('multiplies color by another color', (t) => {
  t.deepEqual(multiplyRgbChannels('#00B0FF')(t.context.color), [ 0, 255, 255 ])
})

test('multiplies color by another color (rgb)', (t) => {
  t.deepEqual(multiplyRgbChannels([0, 176, 255])(t.context.color), [ 0, 255, 255 ])
})

test('does not mutate the input', (t) => {
  multiplyRgbChannels(1.1)(t.context.color)
  t.deepEqual(t.context.color, [ 218, 112, 214 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(multiplyRgbChannels(1.1)('#da70d6'), [ 240, 123, 235 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(multiplyRgbChannels(1.1)(multiplyRgbChannels(1.1))(t.context.color), [ 255, 135, 255 ])
})

test('throws an error on invalid factor', (t) => {
  t.throws(() => multiplyRgbChannels([ 0, 0, 260 ])(t.context.color), Error, 'Invalid factor provided')
})

test('throws an error on invalid input', (t) => {
  t.throws(() => multiplyRgbChannels('#00B0FF')([ 0, 0, 260 ]), Error, 'Invalid color provided')
})
