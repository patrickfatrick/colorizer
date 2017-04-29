import { convertInputToRgb } from '../lib/converters'
import { formatAll } from '../lib/formatters'
import { applyMethod, curry, wrap } from '../lib/utils'

/**
 * Multiplies RGB values
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Array, String}         input  RGB array or hex string to use
 * @return {Array}                        RGB Array
 */
export const multiplyRgbChannels = curry((factor, input) => {
  if (input instanceof Function) return wrap(multiplyRgbChannels(factor), input)

  const rgb = convertInputToRgb(input)
  return formatAll(applyMethod('multiply', factor, rgb))
})

/**
 * Divides RGB values
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Array, String}         input  RGB array or hex string to use
 * @return {Array}                        RGB Array
 */
export const divideRgbChannels = curry((factor, input) => {
  if (input instanceof Function) return wrap(divideRgbChannels(factor), input)

  const rgb = convertInputToRgb(input)
  return formatAll(applyMethod('divide', factor, rgb))
})

/**
 * Adds RGB values
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Array, String}         input  RGB array or hex string to use
 * @return {Array}                        RGB Array
 */
export const addRgbChannels = curry((factor, input) => {
  if (input instanceof Function) return wrap(addRgbChannels(factor), input)

  const rgb = convertInputToRgb(input)
  return formatAll(applyMethod('add', factor, rgb))
})

/**
 * Subtract RGB values
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Array, String}         input  RGB array or hex string to use
 * @return {Array}                        RGB Array
 */
export const subtractRgbChannels = curry((factor, input) => {
  if (input instanceof Function) return wrap(subtractRgbChannels(factor), input)

  const rgb = convertInputToRgb(input)
  return formatAll(applyMethod('subtract', factor, rgb))
})
