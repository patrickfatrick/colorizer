import { convertInputToRgb } from '../lib/converters'
import { setRgbChannel, adjustRgbChannel, curry, wrap } from '../lib/utils'

/**
 * Set the red channel on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const setRedChannel = curry((value, input) => {
  if (input instanceof Function) return wrap(setRedChannel(value), input)

  const rgb = convertInputToRgb(input)
  return setRgbChannel(0, rgb, value)
})

/**
 * Adjust the red channel by a specified factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const adjustRedChannel = curry((factor, input) => {
  if (input instanceof Function) return wrap(adjustRedChannel(factor), input)

  const rgb = convertInputToRgb(input)
  return adjustRgbChannel(0, rgb, factor)
})

/**
 * Set the green channel on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const setGreenChannel = curry((value, input) => {
  if (input instanceof Function) return wrap(setGreenChannel(value), input)

  const rgb = convertInputToRgb(input)
  return setRgbChannel(1, rgb, value)
})

/**
 * Adjust the green channel by a specified factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const adjustGreenChannel = curry((factor, input) => {
  if (input instanceof Function) return wrap(adjustGreenChannel(factor), input)

  const rgb = convertInputToRgb(input)
  return adjustRgbChannel(1, rgb, factor)
})

/**
 * Set the blue channel on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const setBlueChannel = curry((value, input) => {
  if (input instanceof Function) return wrap(setBlueChannel(value), input)

  const rgb = convertInputToRgb(input)
  return setRgbChannel(2, rgb, value)
})

/**
 * Adjust the blue channel by a certain factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
export const adjustBlueChannel = curry((factor, input) => {
  if (input instanceof Function) return wrap(adjustBlueChannel(factor), input)

  const rgb = convertInputToRgb(input)
  return adjustRgbChannel(2, rgb, factor)
})
