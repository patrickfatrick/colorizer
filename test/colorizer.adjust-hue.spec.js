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

test('adjusts the hue of the color', (t) => {
  t.deepEqual(color.adjustHue(-202).__rgb, [148, 218, 113])
})

test('normalizes low hues', (t) => {
  t.deepEqual(color.adjustHue(-500).__rgb, [218, 113, 113])
})

test('normalizes high hues', (t) => {
  t.deepEqual(color.adjustHue(500).__rgb, [218, 113, 115])
})

test('is chainable', (t) => {
  t.deepEqual(color.adjustHue(-202).add(50).__rgb, [198, 255, 163])
})
