import test from 'ava'
import { convertHexToRgb } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * FFF => 255, 255, 255
 * 000 => 0, 0, 0
 * FF0000 => 255, 0, 0
 * 00FF00 => 0, 255, 0
 * 0000FF => 0, 0, 255
 */

test('returns rgb of the color', (t) => {
  t.deepEqual(convertHexToRgb('#DA70D6'), [ 218, 112, 214 ])
})

test('returns rgb of white', (t) => {
  t.deepEqual(convertHexToRgb('#FFF'), [ 255, 255, 255 ])
})

test('returns rgb of black', (t) => {
  t.deepEqual(convertHexToRgb('#000'), [ 0, 0, 0 ])
})

test('returns rgb of red', (t) => {
  t.deepEqual(convertHexToRgb('#ff0000'), [ 255, 0, 0 ])
})

test('returns rgb of green', (t) => {
  t.deepEqual(convertHexToRgb('#00ff00'), [ 0, 255, 0 ])
})

test('returns rgb of blue', (t) => {
  t.deepEqual(convertHexToRgb('#0000ff'), [ 0, 0, 255 ])
})
