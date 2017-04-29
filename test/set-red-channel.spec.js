import test from 'ava'
import { setRedChannel } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('sets the red channel of the color', (t) => {
  t.deepEqual(setRedChannel(100)(t.context.color), [ 100, 112, 214 ])
})

test('normalizes low values', (t) => {
  t.deepEqual(setRedChannel(-1)(t.context.color), [ 0, 112, 214 ])
})

test('normalizes high values', (t) => {
  t.deepEqual(setRedChannel(360)(t.context.color), [ 255, 112, 214 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(setRedChannel(100)(setRedChannel(50))(t.context.color), [ 50, 112, 214 ])
})

test('accepts hex input', (t) => {
  t.deepEqual(setRedChannel(100)('#da70d6'), [ 100, 112, 214 ])
})

test('throws on invalid color', (t) => {
  t.throws(() => setRedChannel(100)([ 0, 0, 260 ]), Error, 'Invalid color provided')
})

test('throws on invalid value', (t) => {
  t.throws(() => setRedChannel('100')(t.context.color), Error, 'Invalid factor provided')
})
