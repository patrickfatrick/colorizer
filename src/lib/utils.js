import { format, normalize, formatFactor } from './formatters'
import { convertRgbToHsl, convertHslToRgb } from './converters'

/**
 * Apply any arithmetic transform to all rgb values
 * @param  {String}              method transform to apply
 * @param  {Number,Array,String} factor value(s) to transform the rgb array with
 * @param  {Array}               rgb    array of rgb values
 * @return {Array}                      new rgb values
 */
export function applyMethod (method, factor, rgb) {
  factor = formatFactor(factor)
  if (factor === false) throw new Error('Invalid factor provided')
  const numProvided = typeof factor === 'number'
  switch (method) {
    case 'multiply':
      return rgb.map((channel, i) => channel * ((numProvided) ? factor : factor[i]))
    case 'divide':
      return rgb.map((channel, i) => channel / ((numProvided) ? factor : factor[i]))
    case 'add':
      return rgb.map((channel, i) => channel + ((numProvided) ? factor : factor[i]))
    case 'subtract':
      return rgb.map((channel, i) => channel - ((numProvided) ? factor : factor[i]))
    default:
      throw new Error('Invalid method provided')
  }
}

/**
 * Add padding to the left side of string
 * @param  {String} v     string to add padding to
 * @param  {Number} chars total number of characters needed
 * @param  {String} char  character with which to pad
 * @return {String}       new string
 */
export function pad (v, chars = 2, char = 0) {
  return (v.length < chars) ? char.toString().repeat(Number.parseInt(chars) - v.length) + v : v
}

/**
 * Sets an individual HSL value to a specific value
 * @param {Number} which Number between 0 and 2, indicating which RGB channel to manipulate
 * @param {Array}  rgb   RGB array
 * @param {Number} value Value to set
 * @return               A new RGB array
 */
export function setHsl (which, rgb, value) {
  if (typeof value !== 'number') throw new Error('Invalid HSL value provided')
  const hsl = convertRgbToHsl(rgb)
  hsl[which] = normalize(value, ((which === 0) ? 359 : 100), 0)
  return convertHslToRgb(hsl)
}

/**
 * Adjusts an individual HSL value by a specific amount
 * @param {Number} which  Number between 0 and 2, indicating which RGB channel to manipulate
 * @param {Array}  rgb    RGB array
 * @param {Number} factor Value to adjust by
 * @return                A new RGB array
 */
export function adjustHsl (which, rgb, factor) {
  if (typeof factor !== 'number') throw new Error('Invalid factor provided')
  const hsl = convertRgbToHsl(rgb)
  hsl[which] += factor
  hsl[which] = normalize(hsl[which], ((which === 0) ? 359 : 100), 0)
  return convertHslToRgb(hsl)
}

/**
 * Sets an individual RGB channel to a specific value
 * @param {Number} which Number between 0 and 2, indicating which RGB channel to manipulate
 * @param {Array}  rgb   RGB array
 * @param {Number} value Value to set the channel to
 * @return               A new RGB array
 */
export function setRgbChannel (which, rgb, value) {
  if (typeof value !== 'number') throw new Error('Invalid HSL value provided')

  return rgb.map((channel, i) => {
    if (i === which) return format(value)
    else return channel
  })
}

/**
 * Adjusts an individual RGB channel by a specific amount
 * @param {Number} which  Number between 0 and 2, indicating which RGB channel to manipulate
 * @param {Array}  rgb    RGB array
 * @param {Number} factor Value to adjust the channel by
 * @return               A new RGB array
 */
export function adjustRgbChannel (which, rgb, factor) {
  if (typeof factor !== 'number') throw new Error('Invalid factor provided')

  return rgb.map((channel, i) => {
    if (i === which) return format(channel + factor)
    else return channel
  })
}

/**
 * Takes a function with args and returns a curried version of it
 * @param   {Function}  fn  A function to curry
 * @returns {Function}      A curried version of the original function
 */
export function curry (fn) {
  return (function resolver (...resolverArgs) {
    return (...args) => {
      const nextArgs = resolverArgs.concat(args.length ? args : null)
      const next = (nextArgs.length >= fn.length)
      ? fn
      : resolver
      return next(...nextArgs)
    }
  })()
}

/**
 * Returns the result of calling the second function with the result of the first function
 * @param {Function}  fn1  a function
 * @param {Function}  fn2  a function
 */
export function wrap (fn1, fn2) {
  return function (arg) {
    return fn2(fn1(arg))
  }
}
