import test from 'ava'
import { convertHslToRgb } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * FFF => 255, 255, 255
 * 000 => 0, 0, 0
 * FF0000 => 255, 0, 0
 * 00FF00 => 0, 255, 0
 * 0000FF => 0, 0, 255
 */

test('returns rgb of the color', (t) => {
  t.deepEqual(convertHslToRgb([ 302, 59, 65 ]), [ 218, 113, 215 ])
})

test('returns rgb of white', (t) => {
  t.deepEqual(convertHslToRgb([ 0, 0, 100 ]), [ 255, 255, 255 ])
})

test('returns rgb of black', (t) => {
  t.deepEqual(convertHslToRgb([ 0, 0, 0 ]), [ 0, 0, 0 ])
})

test('returns rgb of red', (t) => {
  t.deepEqual(convertHslToRgb([ 0, 100, 50 ]), [ 255, 0, 0 ])
})

test('returns rgb of green', (t) => {
  t.deepEqual(convertHslToRgb([ 120, 100, 50 ]), [ 0, 255, 0 ])
})

test('returns rgb of blue', (t) => {
  t.deepEqual(convertHslToRgb([ 240, 100, 50 ]), [ 0, 0, 255 ])
})
