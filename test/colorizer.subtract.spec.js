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

test('subtracts color by a number', (t) => {
  t.deepEqual(color.subtract(50).__rgb, [168, 62, 164])
})

test('subtracts color by another color', (t) => {
  t.deepEqual(color.subtract('#00B0FF').__rgb, [218, 0, 0])
})

test('subtracts color by another color (rgb)', (t) => {
  t.deepEqual(color.subtract([0, 176, 255]).__rgb, [218, 0, 0])
})

test('is chainable', (t) => {
  t.deepEqual(color.subtract(50).subtract(10).__rgb, [158, 52, 154])
})

test('throws an error on invalid factor', (t) => {
  t.throws(() => color.subtract([-1, -1, -1]).__rgb, Error, 'Invalid factor provided')
})
