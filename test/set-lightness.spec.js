import test from 'ava'
import { setLightness } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('sets the lightness of the color', (t) => {
  t.deepEqual(setLightness(50)(t.context.color), [ 203, 52, 198 ])
})

test('normalizes low lightnesses', (t) => {
  t.deepEqual(setLightness(-1)(t.context.color), [ 0, 0, 0 ])
})

test('normalizes high lightnesses', (t) => {
  t.deepEqual(setLightness(101)(t.context.color), [ 255, 255, 255 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(setLightness(50)(setLightness(25))(t.context.color), [ 101, 26, 99 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(setLightness(50)('#da70d6'), [ 203, 52, 198 ])
})

test('throws on invalid color', (t) => {
  t.throws(() => setLightness(50)([ 0, 0, 260 ]), Error, 'Invalid color provided')
})

test('throws on invalid value', (t) => {
  t.throws(() => setLightness('50')(t.context.date), Error, 'Invalid factor provided')
})
