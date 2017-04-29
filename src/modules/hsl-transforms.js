import { convertInputToRgb } from '../lib/converters'
import { setHsl, adjustHsl, curry, wrap } from '../lib/utils'

/**
 * Set the hue on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const setHue = curry((value, input) => {
  if (input instanceof Function) return wrap(setHue(value), input)

  const rgb = convertInputToRgb(input)
  return setHsl(0, rgb, value)
})

/**
 * Adjust the hue by a specified factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const adjustHue = curry((factor, input) => {
  if (input instanceof Function) return wrap(adjustHue(factor), input)

  const rgb = convertInputToRgb(input)
  return adjustHsl(0, rgb, factor)
})

/**
 * Set the saturation on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const setSaturation = curry((value, input) => {
  if (input instanceof Function) return wrap(setSaturation(value), input)

  const rgb = convertInputToRgb(input)
  return setHsl(1, rgb, value)
})

/**
 * Adjust the saturation by a specified factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const adjustSaturation = curry((factor, input) => {
  if (input instanceof Function) return wrap(adjustSaturation(factor), input)

  const rgb = convertInputToRgb(input)
  return adjustHsl(1, rgb, factor)
})

/**
 * Set the lightness on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const setLightness = curry((value, input) => {
  if (input instanceof Function) return wrap(setLightness(value), input)

  const rgb = convertInputToRgb(input)
  return setHsl(2, rgb, value)
})

/**
 * Adjust the lightness by a certain factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const adjustLightness = curry((factor, input) => {
  if (input instanceof Function) return wrap(adjustLightness(factor), input)

  const rgb = convertInputToRgb(input)
  return adjustHsl(2, rgb, factor)
})
