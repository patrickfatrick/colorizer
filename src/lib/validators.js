/**
 * Check that the array provided can be a valid rgb color
 * @param  {Array}   rgb rgb values to test
 * @return {Boolean}     whether or not the array matches rgb constraints
 */
export function isValidRgb (rgb) {
  if (rgb.length !== 3) return false
  for (let i = 0; i < rgb.length; i++) {
    if (typeof rgb[i] !== 'number' || rgb[i] > 255 || rgb[i] < 0) return false
  }
  return true
}

/**
 * Check that the array provided can be a valid set of hsl values
 * @param  {Array}   hsl hsl values to test
 * @return {Boolean}     whether or not the array matches hsl constraints
 */
export function isValidHsl (hsl) {
  if (hsl.length !== 3) return false
  for (let i = 0; i < hsl.length; i++) {
    if (typeof hsl[i] !== 'number' || hsl[i] > ((i === 0) ? 359 : 100) || hsl[i] < 0) return false
  }
  return true
}

/**
 * Check that the string provided can be a valid color
 * @param  {String}  hex string to test
 * @return {Boolean}     whether or not the string matches hex color constraints
 */
export function isValidHex (hex) {
  return /^([0-9a-fA-F]{3})(\1|[0-9a-fA-F]{3})?$/.test(hex)
}
