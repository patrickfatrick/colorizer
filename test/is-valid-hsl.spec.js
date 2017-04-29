import test from 'ava'
import { isValidHsl } from '../src'

test('returns true for valid hsl values', (t) => {
  t.true(isValidHsl([ 359, 100, 0 ]))
})

test('returns false for invalid hue', (t) => {
  t.false(isValidHsl([ 370, 100, 0 ]))
  t.false(isValidHsl([ -1, 100, 0 ]))
})

test('returns false for invalid saturation', (t) => {
  t.false(isValidHsl([ 359, 101, 0 ]))
  t.false(isValidHsl([ 359, -1, 0 ]))
})

test('returns false for invalid lightness', (t) => {
  t.false(isValidHsl([ 359, 100, 110 ]))
  t.false(isValidHsl([ 359, 100, -1 ]))
})

test('returns false for array not of length 3', (t) => {
  t.false(isValidHsl([ 359, 100 ]))
  t.false(isValidHsl([ 359, 100, 0, 100 ]))
})
