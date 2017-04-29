import { isValidRgb, isValidHex, isValidHsl } from '../lib/validators'

export {
  isValidRgb,
  isValidHex,
  isValidHsl
}

/**
 * Checks that the thing passed in is any kind of valid color
 * @param {Object}   input anything
 * @return {Boolean}       whether the input passes any of the validators
 */
export function isValidColor (input) {
  return [
    isValidRgb,
    isValidHex,
    isValidHsl
  ].some((fn) => fn(input))
}
