import test from 'ava'
import Colorizer from '../index'
let color

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  color = Colorizer('#DA70D6')
})

test.afterEach((t) => {
  color = undefined
})

test('sets the saturation of the color', (t) => {
  t.deepEqual(color.setSaturation(50).__rgb, [210, 121, 207])
})

test('normalizes low saturations', (t) => {
  t.deepEqual(color.setSaturation(-1).__rgb, [166, 166, 166])
})

test('normalizes high saturations', (t) => {
  t.deepEqual(color.setSaturation(101).__rgb, [255, 77, 249])
})

test('is chainable', (t) => {
  t.deepEqual(color.setSaturation(50).add(50).__rgb, [255, 171, 255])
})