import test from 'ava'
import { convertHexToLuminance } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * FFF => 255, 255, 255
 * 000 => 0, 0, 0
 * FF0000 => 255, 0, 0
 * 00FF00 => 0, 255, 0
 * 0000FF => 0, 0, 255
 */

test('returns luminance of the color', (t) => {
  t.deepEqual(Math.floor(convertHexToLuminance('#DA70D6') * 1000) / 1000, 0.556)
})

test('luminance of white should be 1', (t) => {
  t.deepEqual(Math.floor(convertHexToLuminance('#FFF') * 1000) / 1000, 1)
})

test('luminance of black should be 0', (t) => {
  t.deepEqual(Math.floor(convertHexToLuminance('#000') * 1000) / 1000, 0)
})

test('luminance of red should be 0.212', (t) => {
  t.deepEqual(Math.floor(convertHexToLuminance('#ff0000') * 1000) / 1000, 0.212)
})

test('luminance of green should be 0.715', (t) => {
  t.deepEqual(Math.floor(convertHexToLuminance('#00ff00') * 1000) / 1000, 0.715)
})

test('luminance of blue should be 0.072', (t) => {
  t.deepEqual(Math.floor(convertHexToLuminance('#0000ff') * 1000) / 1000, 0.072)
})
