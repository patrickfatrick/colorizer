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

test('adjusts the lightness of the color', (t) => {
  t.deepEqual(color.adjustLightness(-15).__rgb, [203, 52, 198])
})

test('normalizes low lightnesses', (t) => {
  t.deepEqual(color.adjustLightness(-100).__rgb, [0, 0, 0])
})

test('normalizes high lightnesses', (t) => {
  t.deepEqual(color.adjustLightness(100).__rgb, [255, 255, 255])
})

test('is chainable', (t) => {
  t.deepEqual(color.adjustLightness(-15).add(50).__rgb, [253, 102, 248])
})