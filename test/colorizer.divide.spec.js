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

test('divides color by a number', (t) => {
  t.deepEqual(color.divide(1.1).__rgb, [198, 102, 195])
})

test('divides color by another color', (t) => {
  t.deepEqual(color.divide('#00B0FF').__rgb, [255, 1, 1])
})

test('multiplies color by another color (rgb)', (t) => {
  t.deepEqual(color.divide([0, 176, 255]).__rgb, [255, 1, 1])
})

test('throws an error on invalid factor', (t) => {
  t.throws(() => color.divide([260, 0, 0]).__rgb, Error, 'Invalid factor provided')
})
