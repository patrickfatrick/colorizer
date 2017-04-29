import { convertInputToRgb, convertRgbToHex } from '../lib/converters'
import { formatAll } from '../lib/formatters'
import { curry } from '../lib/utils'

/**
 * Performs a gradient operation, returning the specified number of steps in the mixin
 * @param  {Number}        steps  number of steps in between the two colors to return
 * @param  {Array, String} input1 a color
 * @param  {Array, String} input2 another color
 * @return {Array}                the colors between the original color and color passed in
 */
export const blendRgb = curry((steps, input1, input2) => {
  const rgb1 = convertInputToRgb(input1)
  const rgb2 = convertInputToRgb(input2)
  let step = [ (rgb2[0] - rgb1[0]) / steps, (rgb2[1] - rgb1[1]) / steps, (rgb2[2] - rgb1[2]) / steps ]
  let array = [ rgb1 ]
  for (let i = 1; i < steps; i++) {
    array.push([array[i - 1][0] + step[0], array[i - 1][1] + step[1], array[i - 1][2] + step[2]])
  }
  array.push(rgb2)
  return array.map((rgb) => formatAll(rgb))
})

export const blendHex = curry((steps, input1, input2) => {
  return blendRgb(steps, input1, input2).map((rgb) => convertRgbToHex(rgb))
})
