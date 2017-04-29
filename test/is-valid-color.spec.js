import test from 'ava'
import { isValidColor } from '../src'

test('returns true for valid hsl values', (t) => {
  t.true(isValidColor([ 359, 100, 100 ]))
  t.true(isValidColor([ 0, 0, 0 ]))
})

test('returns true for valid rgb values', (t) => {
  t.true(isValidColor([ 255, 255, 255 ]))
  t.true(isValidColor([ 0, 0, 0 ]))
})

test('returns true for valid hex', (t) => {
  t.true(isValidColor('da70d6'))
  t.true(isValidColor('fff'))
})

test('returns false for invalid hsl values', (t) => {
  t.false(isValidColor([ 359, 100, 110 ]))
  t.false(isValidColor([ 359, 100, -1 ]))
})

test('returns false for invalid rgb values', (t) => {
  t.false(isValidColor([ 0, 0, 260 ]))
})

test('returns false for invalid hex', (t) => {
  t.false(isValidColor('ff'))
})
