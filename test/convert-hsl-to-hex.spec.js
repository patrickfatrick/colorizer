import test from 'ava'
import { convertHslToHex } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * FFF => 255, 255, 255
 * 000 => 0, 0, 0
 * FF0000 => 255, 0, 0
 * 00FF00 => 0, 255, 0
 * 0000FF => 0, 0, 255
 */

test('returns rgb of the color', (t) => {
  t.is(convertHslToHex([ 302, 59, 65 ]), 'da71d7')
})

test('returns rgb of white', (t) => {
  t.is(convertHslToHex([ 0, 0, 100 ]), 'ffffff')
})

test('returns rgb of black', (t) => {
  t.is(convertHslToHex([ 0, 0, 0 ]), '000000')
})

test('returns rgb of red', (t) => {
  t.is(convertHslToHex([ 0, 100, 50 ]), 'ff0000')
})

test('returns rgb of green', (t) => {
  t.is(convertHslToHex([ 120, 100, 50 ]), '00ff00')
})

test('returns rgb of blue', (t) => {
  t.is(convertHslToHex([ 240, 100, 50 ]), '0000ff')
})
