import { convertInputToRgb, convertRgbToHex } from '../lib/converters'
import { applyMethod, curry } from '../lib/utils'
import { formatAll } from '../lib/formatters'

/**
 * Performs the same calculation to the color for a number of steps
 * @param  {String}                method the name of an existing method (add, subtract, etc.)
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Number}                steps  number of times to repeat the action
 * @param  {Array,String}          input  RGB or hex color to use
 * @return {Array}                        the stepped calculations in RGB, starting with the original color
 */
export const stepRgb = curry((method, factor, steps, input) => {
  const rgb = convertInputToRgb(input)
  let array = [ rgb ]
  for (let i = 1; i < steps + 1; i++) {
    array.push(applyMethod(method, factor, array[i - 1]))
  }
  return array.map((rgb) => formatAll(rgb))
})

/**
 * Performs the same calculation to the color for a number of steps
 * @param  {String}                method the name of an existing method (add, subtract, etc.)
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Number}                steps  number of times to repeat the action
 * @param  {Array,String}          input  RGB or hex color to use
 * @return {Array}                        the stepped calculations in hex, starting with the original color
 */
export const stepHex = curry((method, factor, steps, input) => {
  return stepRgb(method, factor, steps, input).map((rgb) => convertRgbToHex(rgb))
})
