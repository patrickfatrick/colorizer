import test from 'ava'
import { setSaturation } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('sets the saturation of the color', (t) => {
  t.deepEqual(setSaturation(50)(t.context.color), [ 210, 121, 207 ])
})

test('normalizes low saturations', (t) => {
  t.deepEqual(setSaturation(-1)(t.context.color), [ 166, 166, 166 ])
})

test('normalizes high saturations', (t) => {
  t.deepEqual(setSaturation(101)(t.context.color), [ 255, 77, 249 ])
})

test('is quasi-chainable', (t) => {
  t.deepEqual(setSaturation(50)(setSaturation(25))(t.context.color), [ 188, 143, 187 ])
})

test('sets the saturation of the color', (t) => {
  t.deepEqual(setSaturation(50)('#da70d6'), [ 210, 121, 207 ])
})

test('throws on invalid color', (t) => {
  t.throws(() => setSaturation(50)([ 0, 0, 260 ]), Error, 'Invalid color provided')
})

test('throws on invalid value', (t) => {
  t.throws(() => setSaturation('50')(t.context.color), Error, 'Invalid factor provided')
})
