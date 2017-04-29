import { convertRgbToHex, convertHexToRgb, convertHslToRgb, convertRgbToHsl, convertRgbToLuminance } from '../lib/converters'

export {
  convertRgbToHex,
  convertHexToRgb,
  convertHslToRgb,
  convertRgbToHsl,
  convertRgbToLuminance
}

/**
 * Returns th luminance for the hex color provided via RGB conversion
 * @param  {String} input  a color in hex format
 * @return {Number}        the un-rounded luminance value between 0 and 1
 */
export function convertHexToLuminance (input) {
  return convertRgbToLuminance(convertHexToRgb(input))
}

/**
 * Shorthand method to convert a color from HSL to hex via RGB conversion
 * @param  {Array} input a color in HSL format
 * @return {String}      a color in hex format
 */
export function convertHslToHex (input) {
  return convertRgbToHex(convertHslToRgb(input))
}

/**
 * Shorthand method to convert a color from hex to HSL via RGB conversion
 * @param  {Array} input a color in hex format
 * @return {String}      a color in HSL format
 */
export function convertHexToHsl (input) {
  return convertRgbToHsl(convertHexToRgb(input))
}
