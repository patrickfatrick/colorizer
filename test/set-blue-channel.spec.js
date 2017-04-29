import test from 'ava'
import { setBlueChannel } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('sets the green channel of the color', (t) => {
  t.deepEqual(setBlueChannel(100)(t.context.color), [ 218, 112, 100 ])
})

test('normalizes low values', (t) => {
  t.deepEqual(setBlueChannel(-1)(t.context.color), [ 218, 112, 0 ])
})

test('normalizes high values', (t) => {
  t.deepEqual(setBlueChannel(360)(t.context.color), [ 218, 112, 255 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(setBlueChannel(100)(setBlueChannel(50))(t.context.color), [ 218, 112, 50 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(setBlueChannel(100)('#da70d6'), [ 218, 112, 100 ])
})

test('throws on invalid color', (t) => {
  t.throws(() => setBlueChannel(100)([ 0, 0, 260 ]), Error, 'Invalid color provided')
})

test('throws on invalid value', (t) => {
  t.throws(() => setBlueChannel('100')(t.context.color), Error, 'Invalid factor provided')
})
