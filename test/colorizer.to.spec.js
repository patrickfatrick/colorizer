import test from 'ava'
import Colorizer from '../index'
let color

/**
 * DA70D6 => 218, 112, 214
 * FFF => 255, 255, 255
 * 000 => 0, 0, 0
 * FF0000 => 255, 0, 0
 * 00FF00 => 0, 255, 0
 * 0000FF => 0, 0, 255
 */

test.beforeEach((t) => {
  color = Colorizer('#DA70D6')
})

test.afterEach((t) => {
  color = undefined
})

test('returns the rgb format of the color', (t) => {
  t.deepEqual(color.to('rgb'), [218, 112, 214])
})

test('returns the hex format of the color', (t) => {
  t.deepEqual(color.to('hex'), 'da70d6')
})

test('returns the hsl format of the color', (t) => {
  t.deepEqual(color.to('hsl'), [302, 59, 65])
})

test('hsl for white should be 0, 0, 100', (t) => {
  color = Colorizer('#FFF')
  t.deepEqual(color.to('hsl'), [0, 0, 100])
})

test('hsl for black should be 0, 0, 0', (t) => {
  color = Colorizer('#000')
  t.deepEqual(color.to('hsl'), [0, 0, 0])
})

test('hsl for red should be 0, 100, 50', (t) => {
  color = Colorizer('#FF0000')
  t.deepEqual(color.to('hsl'), [0, 100, 50])
})

test('hsl for green should be 120, 100, 50', (t) => {
  color = Colorizer('#00FF00')
  t.deepEqual(color.to('hsl'), [120, 100, 50])
})

test('hsl for blue should be 240, 100, 50', (t) => {
  color = Colorizer('#0000FF')
  t.deepEqual(color.to('hsl'), [240, 100, 50])
})

test('returns the luminance of the color', (t) => {
  t.deepEqual(Math.floor(color.to('luminance') * 1000) / 1000, 0.556)
})

test('throws an error when invalid format is provided', (t) => {
  t.throws(() => color.to('poop'), Error, 'Invalid format provided')
})
