import test from 'ava'
import { convertRgbToCss } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * FFF => 255, 255, 255
 * 000 => 0, 0, 0
 * FF0000 => 255, 0, 0
 * 00FF00 => 0, 255, 0
 * 0000FF => 0, 0, 255
 */

test('returns hex value of the color', (t) => {
  t.is(convertRgbToCss([ 218, 112, 214 ]), 'rgb(218, 112, 214)')
})

test('returns the hex value of white', (t) => {
  t.is(convertRgbToCss([ 255, 255, 255 ]), 'rgb(255, 255, 255)')
})

test('returns the hex value of black', (t) => {
  t.is(convertRgbToCss([ 0, 0, 0 ]), 'rgb(0, 0, 0)')
})

test('returns the hex value of red', (t) => {
  t.is(convertRgbToCss([ 255, 0, 0 ]), 'rgb(255, 0, 0)')
})

test('returns the hex value of green', (t) => {
  t.is(convertRgbToCss([ 0, 255, 0 ]), 'rgb(0, 255, 0)')
})

test('returns the hex value of blue', (t) => {
  t.is(convertRgbToCss([ 0, 0, 255 ]), 'rgb(0, 0, 255)')
})
