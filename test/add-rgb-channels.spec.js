import test from 'ava'
import { addRgbChannels } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * 00B0FF => 0, 176, 255
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('adds color by a number', (t) => {
  t.deepEqual(addRgbChannels(50)(t.context.color), [ 255, 162, 255 ])
})

test('adds color by another color', (t) => {
  t.deepEqual(addRgbChannels('#00B0FF')(t.context.color), [ 218, 255, 255 ])
})

test('adds color by another color (rgb)', (t) => {
  t.deepEqual(addRgbChannels([ 0, 176, 255 ])(t.context.color), [ 218, 255, 255 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(addRgbChannels(50)('#da70d6'), [ 255, 162, 255 ])
})

test('does not mutate the input', (t) => {
  addRgbChannels(50)(t.context.color)
  t.deepEqual(t.context.color, [ 218, 112, 214 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(addRgbChannels(50)(addRgbChannels(10))(t.context.color), [ 255, 172, 255 ])
})

test('throws an error on invalid factor', (t) => {
  t.throws(() => addRgbChannels([ 0, 260, 0 ])(t.context.color), Error, 'Invalid factor provided')
})

test('throws an error on invalid input', (t) => {
  t.throws(() => addRgbChannels('#00B0FF')([ 0, 260, 0 ]), Error, 'Invalid color provided')
})
