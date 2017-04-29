import { isValidRgb, isValidHsl, isValidHex } from './validators'
import { pad } from './utils'

/**
 * Converts a hex string to rgb, or else validates an rgb array and returns it
 * @param  {Array,String} input Either a hex string or RGB array
 * @return {Array}              rgb array
 */
export function convertInputToRgb (input) {
  const rgb = (typeof input === 'string') ? convertHexToRgb(input) : input
  if (!isValidRgb(rgb)) throw new Error('Invalid color provided')
  return rgb
}

/**
 * Convert an array of rgb values to a hex string (no hash)
 * @param  {Array}  rgb rgb values
 * @return {String}     hex string
 */
export function convertRgbToHex (rgb) {
  return rgb.reduce((p, c) => p + pad(c.toString(16)), '')
}

/**
 * Convert a (six- or three-character) hex string with or without hash to rgb
 * @param  {String} string hex string
 * @return {Array}         rgb values
 */
export function convertHexToRgb (string) {
  let hex = string.replace(/^#/, '')
  if (!isValidHex(hex)) throw new Error('Invalid hex color code provided')

  if (hex.length === 3) hex = hex.replace(/[a-zA-Z0-9]/g, (match, offset, string) => string.charAt(offset).repeat(2))
  hex = Number.parseInt(hex, 16)
  return [(hex >> 16) & 0xFF, (hex >> 8) & 0xFF, hex & 0xFF]
}

// Only used in convertHslToRgb, no export
function convertHueToRgb (p, q, t) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

/**
 * Convert an array of hsl values to rgb values
 * @param  {Array} hsl hsl values
 * @return {Array}     rgb values
 */
export function convertHslToRgb (hsl) {
  if (!isValidHsl(hsl)) throw new Error('Invalid HSL color provided')

  const h = hsl[0] / 360
  const s = hsl[1] / 100
  const l = hsl[2] / 100
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s
    var p = 2 * l - q
    r = convertHueToRgb(p, q, h + 1 / 3)
    g = convertHueToRgb(p, q, h)
    b = convertHueToRgb(p, q, h - 1 / 3)
  }

  return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ]
}

/**
 * Convert array of rgb values to an array of hsl values
 * @param  {Array} rgb rgb values
 * @return {Array}     hsl values
 */
export function convertRgbToHsl (rgb) {
  let hue, saturation, lightness
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const diff = max - min
  lightness = (max + min) / 2
  if (diff === 0) hue = saturation = 0
  else {
    saturation = (lightness < 0.5) ? diff / (max + min) : diff / (2 - max - min)
    switch (max) {
      case r:
        hue = (g - b) / diff + (g < b ? 6 : 0)
        break
      case g:
        hue = (b - r) / diff + 2
        break
      case b:
        hue = (r - g) / diff + 4
        break
    }
  }
  return [Math.round(hue * 60), Math.round(saturation * 100), Math.round(lightness * 100)]
}

/**
 * Returns th luminance for the rgb color provided
 * @param  {Array}  input  a color in RGB format
 * @return {Number}        the un-rounded luminance value between 0 and 1
 */
export function convertRgbToLuminance (rgb) {
  if (!isValidRgb(rgb)) throw new Error('Invalid color provided')
  return 0.2126 * (rgb[0] / 255) + 0.7152 * (rgb[1] / 255) + 0.0722 * (rgb[2] / 255)
}
