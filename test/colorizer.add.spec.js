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

test('adds color by a number', (t) => {
  t.deepEqual(color.add(50).__rgb, [255, 162, 255])
})

test('adds color by another color', (t) => {
  t.deepEqual(color.add('#00B0FF').__rgb, [218, 255, 255])
})

test('adds color by another color (rgb)', (t) => {
  t.deepEqual(color.add([0, 176, 255]).__rgb, [218, 255, 255])
})

test('throws an error on invalid factor', (t) => {
  t.throws(() => color.add([0, 260, 0]).__rgb, Error, 'Invalid factor provided')
})
