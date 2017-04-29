import test from 'ava'
import { convertRgbToHsl } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * FFF => 255, 255, 255
 * 000 => 0, 0, 0
 * FF0000 => 255, 0, 0
 * 00FF00 => 0, 255, 0
 * 0000FF => 0, 0, 255
 */

test('returns hsl values of the color', (t) => {
  t.deepEqual(convertRgbToHsl([ 218, 112, 214 ]), [ 302, 59, 65 ])
})

test('returns the hsl values for white', (t) => {
  t.deepEqual(convertRgbToHsl([ 255, 255, 255 ]), [ 0, 0, 100 ])
})

test('returns the hsl values for black', (t) => {
  t.deepEqual(convertRgbToHsl([ 0, 0, 0 ]), [ 0, 0, 0 ])
})

test('returns the hsl values for red', (t) => {
  t.deepEqual(convertRgbToHsl([ 255, 0, 0 ]), [ 0, 100, 50 ])
})

test('returns the hsl values for green', (t) => {
  t.deepEqual(convertRgbToHsl([ 0, 255, 0 ]), [ 120, 100, 50 ])
})

test('returns the hsl values for blue', (t) => {
  t.deepEqual(convertRgbToHsl([ 0, 0, 255 ]), [ 240, 100, 50 ])
})
