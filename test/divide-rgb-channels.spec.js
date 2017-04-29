import test from 'ava'
import { divideRgbChannels } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * 00B0FF => 0, 176, 255
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('divides color by a number', (t) => {
  t.deepEqual(divideRgbChannels(1.1)(t.context.color), [ 198, 102, 195 ])
})

test('divides color by another color', (t) => {
  t.deepEqual(divideRgbChannels('#00B0FF')(t.context.color), [ 255, 1, 1 ])
})

test('multiplies color by another color (rgb)', (t) => {
  t.deepEqual(divideRgbChannels([0, 176, 255])(t.context.color), [ 255, 1, 1 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(divideRgbChannels(1.1)('#da70d6'), [ 198, 102, 195 ])
})

test('does not mutate the input', (t) => {
  divideRgbChannels(1.1)(t.context.color)
  t.deepEqual(t.context.color, [ 218, 112, 214 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(divideRgbChannels(1.1)(divideRgbChannels(1.1))(t.context.color), [ 180, 93, 177 ])
})

test('throws an error on invalid factor', (t) => {
  t.throws(() => divideRgbChannels([ 260, 0, 0 ])(t.context.color), Error, 'Invalid factor provided')
})

test('throws an error on invalid input', (t) => {
  t.throws(() => divideRgbChannels(1.1)([ 260, 0, 0 ]), Error, 'Invalid color provided')
})
