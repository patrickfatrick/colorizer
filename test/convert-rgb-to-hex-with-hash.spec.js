import test from 'ava'
import { convertRgbToHexWithHash } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * FFF => 255, 255, 255
 * 000 => 0, 0, 0
 * FF0000 => 255, 0, 0
 * 00FF00 => 0, 255, 0
 * 0000FF => 0, 0, 255
 */

test('returns hex value of the color', (t) => {
  t.deepEqual(convertRgbToHexWithHash([ 218, 112, 214 ]), '#da70d6')
})

test('returns the hex value of white', (t) => {
  t.deepEqual(convertRgbToHexWithHash([ 255, 255, 255 ]), '#ffffff')
})

test('returns the hex value of black', (t) => {
  t.deepEqual(convertRgbToHexWithHash([ 0, 0, 0 ]), '#000000')
})

test('returns the hex value of red', (t) => {
  t.deepEqual(convertRgbToHexWithHash([ 255, 0, 0 ]), '#ff0000')
})

test('returns the hex value of green', (t) => {
  t.deepEqual(convertRgbToHexWithHash([ 0, 255, 0 ]), '#00ff00')
})

test('returns the hex value of blue', (t) => {
  t.deepEqual(convertRgbToHexWithHash([ 0, 0, 255 ]), '#0000ff')
})
