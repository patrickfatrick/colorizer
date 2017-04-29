import test from 'ava'
import { isValidRgb } from '../src'

test('returns true for valid rgb values', (t) => {
  t.true(isValidRgb([ 0, 255, 116 ]))
})

test('returns false for values below 0', (t) => {
  t.false(isValidRgb([ -3, 255, 116 ]))
})

test('returns false for values above 255', (t) => {
  t.false(isValidRgb([ 0, 260, 116 ]))
})

test('returns false for an array that does not have length of 3', (t) => {
  t.false(isValidRgb([ 0, 260 ]))
  t.false(isValidRgb([ 0, 260, 116, 255 ]))
})
