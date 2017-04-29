import { isValidRgb } from './validators'
import { convertHexToRgb } from './converters'

/**
 * Generic method for ensuring a number is never higher or lower than specified bounds
 * @param  {Number} n     a number
 * @param  {Number} upper the highest value n can be
 * @param  {Number} lower the lowest value n can be
 * @return {Number}       the normalized number
 */
export function normalize (n, upper, lower) {
  if (n > upper) return upper
  if (n < lower) return lower
  return n
}

/**
 * Shorthand to normalize rgb values
 * @param  {Number} n an rgb value
 * @return {Number}   the normalized value (within 0 to 255)
 */
export function format (n) {
  return Math.round(normalize(n, 255, 0))
}

/**
 * Shorthand for normalizing all rgb values
 * @param  {Array} rgb rgb values
 * @return {Array}     normalized rgb values
 */
export function formatAll (rgb) {
  return rgb.map((channel) => format(channel))
}

/**
 * Facilitates passing a number, rgb array, or hex string as input for transforms
 * @param  {Number,Array,String} factor convert a string to rgb or return number or rgb
 * @return {Number,Array}               either the array of rgb values or the number
 */
export function formatFactor (factor) {
  if (typeof factor === 'number') return factor
  if (typeof factor === 'string') return convertHexToRgb(factor)
  if (Array.isArray(factor)) return (isValidRgb(factor)) ? factor : false
  return false
}
