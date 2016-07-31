import test from 'ava'
import Colorizer from '../index'
let color

/**
 * DA70D6 => 218, 112, 214
 * 00B0FF => 0, 176, 255
 */

test.beforeEach((t) => {
  color = Colorizer('#DA70D6')
})

test.afterEach((t) => {
  color = undefined
})

test('multiplies color by a number', (t) => {
  t.deepEqual(color.multiply(1.1).__rgb, [240, 123, 235])
})

test('multiplies color by another color', (t) => {
  t.deepEqual(color.multiply('#00B0FF').__rgb, [0, 255, 255])
})

test('multiplies color by another color (rgb)', (t) => {
  t.deepEqual(color.multiply([0, 176, 255]).__rgb, [0, 255, 255])
})

test('is chainable', (t) => {
  t.deepEqual(color.multiply(1.1).multiply(1.1).__rgb, [255, 135, 255])
})

test('throws an error on invalid factor', (t) => {
  t.throws(() => color.multiply([0, 0, 260]).__rgb, Error, 'Invalid factor provided')
})
