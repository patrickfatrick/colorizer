import test from 'ava'
import { setGreenChannel } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('sets the green channel of the color', (t) => {
  t.deepEqual(setGreenChannel(100)(t.context.color), [ 218, 100, 214 ])
})

test('normalizes low values', (t) => {
  t.deepEqual(setGreenChannel(-1)(t.context.color), [ 218, 0, 214 ])
})

test('normalizes high values', (t) => {
  t.deepEqual(setGreenChannel(360)(t.context.color), [ 218, 255, 214 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(setGreenChannel(100)(setGreenChannel(50))(t.context.color), [ 218, 50, 214 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(setGreenChannel(100)('#da70d6'), [ 218, 100, 214 ])
})

test('throws on invalid color', (t) => {
  t.throws(() => setGreenChannel(100)([ 0, 0, 260 ]), Error, 'Invalid color provided')
})

test('throws on invalid value', (t) => {
  t.throws(() => setGreenChannel('100')(t.context.color), Error, 'Invalid factor provided')
})
