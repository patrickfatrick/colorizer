import test from 'ava'
import { isValidHex } from '../src'

test('returns true for valid hex color without hash', (t) => {
  t.true(isValidHex('da70d6'))
})

test('returns true for valid three-character hex color ', (t) => {
  t.true(isValidHex('fff'))
})

test('returns false for valid hex color with hash', (t) => {
  t.false(isValidHex('#da70d6'))
})

test('returns false if any characters outside hex bounds', (t) => {
  t.false(isValidHex('da70g6'))
})

test('returns false for any string not 3 or 6 characters in length', (t) => {
  t.false(isValidHex('da'))
  t.false(isValidHex('da70d6a'))
  t.false(isValidHex('da70'))
})
