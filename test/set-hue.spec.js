import test from 'ava'
import { setHue } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('sets the hue of the color', (t) => {
  t.deepEqual(setHue(100)(t.context.color), [ 148, 218, 113 ])
})

test('normalizes low hues', (t) => {
  t.deepEqual(setHue(-1)(t.context.color), [ 218, 113, 113 ])
})

test('normalizes high hues', (t) => {
  t.deepEqual(setHue(360)(t.context.color), [ 218, 113, 115 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(setHue(100)(setHue(50))(t.context.color), [ 218, 201, 113 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(setHue(100)('#da70d6'), [ 148, 218, 113 ])
})

test('throws on invalid color', (t) => {
  t.throws(() => setHue(100)([ 0, 0, 260 ]), Error, 'Invalid color provided')
})

test('throws on invalid value', (t) => {
  t.throws(() => setHue('100')(t.context.color), Error, 'Invalid factor provided')
})
