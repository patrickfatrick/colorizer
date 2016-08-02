'use strict'

const ColorizerBase = {
  /**
   * Setup the Colorizer instance
   * @param  {Array, String} color Hex, RGB, or HSL color
   * @param  {Boolean} hsl   Flag to indicate the color is HSL
   * @return {Object}       Colorizer instance
   */
  init (color, hsl) {
    if (hsl) {
      if (!this.__checkHsl(color)) throw new Error('Invalid color provided')
      this.__rgb = this.__hslToRgb(color)
      return this
    }
    if (typeof color === 'string') color = this.__convertString(color)
    if (!this.__checkRgb(color)) throw new Error('Invalid color provided')
    this.__rgb = color
    return this
  },
  /**
   * Multiplies the RGB values for a Colorizer color
   * @param  {Number, Array, String} factor a number or another color
   * @return {Object}        Colorizer instance
   */
  multiply (factor) {
    const rgb = this.__rgb
    this.__rgb = this.__formatAll(this.__applyMethod('multiply', factor, [rgb[0], rgb[1], rgb[2]]))
    return this
  },
  /**
   * Divides the RGB values for a Colorizer color
   * @param  {Number, Array, String} factor a number or another color
   * @return {Object}        Colorizer instance
   */
  divide (factor) {
    const rgb = this.__rgb
    this.__rgb = this.__formatAll(this.__applyMethod('divide', factor, [rgb[0], rgb[1], rgb[2]]))
    return this
  },
  /**
   * Adds the RGB values for a Colorizer color
   * @param  {Number, Array, String} factor a number or another color
   * @return {Object}        Colorizer instance
   */
  add (factor) {
    const rgb = this.__rgb
    this.__rgb = this.__formatAll(this.__applyMethod('add', factor, [rgb[0], rgb[1], rgb[2]]))
    return this
  },
  /**
   * Subtract the RGB values for a Colorizer color
   * @param  {Number, Array, String} factor a number or another color
   * @return {Object}        Colorizer instance
   */
  subtract (factor) {
    const rgb = this.__rgb
    this.__rgb = this.__formatAll(this.__applyMethod('subtract', factor, [rgb[0], rgb[1], rgb[2]]))
    return this
  },
  /**
   * Performs the same calculation to the color for a number of steps
   * @param  {String} method the name of an existing method (add, subtract, etc.)
   * @param  {Number, Array, String} factor a number or another color
   * @param  {Number} steps  number of times to repeat the action
   * @return {Array}        the stepped calculations, starting with the original color
   */
  step (method, factor, steps) {
    const rgb = this.__rgb
    let array = [rgb]
    for (let i = 1; i < steps + 1; i++) {
      array.push(this.__applyMethod(method, factor, array[i - 1]))
    }
    const converted = array.map((rgb) => this.__combine(this.__formatAll(rgb)))
    return converted
  },
  /**
   * Performs a gradient operation, returning the specified number of steps in the mixin
   * @param  {Array, String} color another color
   * @param  {Number} steps number of steps in between the two colors to return
   * @return {Array}       the colors between the original color and color passed in
   */
  blend (color, steps) {
    const rgb = this.__rgb
    if (typeof color === 'string') color = this.__convertString(color)
    let step = [(color[0] - rgb[0]) / steps, (color[1] - rgb[1]) / steps, (color[2] - rgb[2]) / steps]
    let array = [rgb]
    for (let i = 1; i < steps; i++) {
      array.push([array[i - 1][0] + step[0], array[i - 1][1] + step[1], array[i - 1][2] + step[2]])
    }
    array.push(color)
    const converted = array.map((rgb) => this.__combine(this.__formatAll(rgb)))
    return converted
  },
  /**
   * Returns th luminance for the color
   * @return {Number} the un-rounded luminance value between 0 and 1
   */
  luminance () {
    const rgb = this.__rgb
    return 0.2126 * (rgb[0] / 255) + 0.7152 * (rgb[1] / 255) + 0.0722 * (rgb[2] / 255)
  },
  /**
   * Set the hue on the color
   * @param {Object} value Colorizer instance
   */
  setHue (value) {
    this.__rgb = this.__setHsl(0, this.__rgb, value)
    return this
  },
  /**
   * Adjust the hue relative to where it is currently
   * @param {Object} value Colorizer instance
   */
  adjustHue (factor) {
    this.__rgb = this.__adjustHsl(0, this.__rgb, factor)
    return this
  },
  /**
   * Set the saturation on the color
   * @param {Object} value Colorizer instance
   */
  setSaturation (value) {
    this.__rgb = this.__setHsl(1, this.__rgb, value)
    return this
  },
  /**
   * Adjust the saturation relative to where it is currently
   * @param {Object} value Colorizer instance
   */
  adjustSaturation (factor) {
    this.__rgb = this.__adjustHsl(1, this.__rgb, factor)
    return this
  },
  /**
   * Set the lightness on the color
   * @param {Object} value Colorizer instance
   */
  setLightness (value) {
    this.__rgb = this.__setHsl(2, this.__rgb, value)
    return this
  },
  /**
   * Adjust the lightness relative to where it is currently
   * @param {Object} value Colorizer instance
   */
  adjustLightness (factor) {
    this.__rgb = this.__adjustHsl(2, this.__rgb, factor)
    return this
  },
  /**
   * Return the color in one of several format
   * @param  {String} format the format to return
   * @return {Array}          RGB (255, 255, 255)
   * @return {String}         Hex
   * @return {Array}          HSL (360, 100, 100)
   * @return {Number}         Luminance (between 0 and 1)
   */
  to (format) {
    const rgb = this.__rgb
    switch (format) {
      case 'rgb':
        return rgb
      case 'hex':
        return this.__combine(rgb)
      case 'hsl':
        return this.__rgbToHsl(rgb)
      case 'luminance':
        return this.luminance()
      default:
        throw new Error('Invalid format provided.')
    }
  },
  __rgb: [0, 0, 0],
  __rgbToHsl (rgb) {
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
  },
  __hslToRgb (hsl) {
    const h = hsl[0] / 360
    const s = hsl[1] / 100
    const l = hsl[2] / 100
    let r, g, b
    if (s === 0) {
      r = g = b = l
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s
      var p = 2 * l - q
      r = this.__hueToRgb(p, q, h + 1 / 3)
      g = this.__hueToRgb(p, q, h)
      b = this.__hueToRgb(p, q, h - 1 / 3)
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  },
  __hueToRgb (p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  },
  __convertString (hex) {
    hex = hex.replace('#', '')
    if (!(/^([0-9a-fA-F]{3})(\1|[0-9a-fA-F]{3})?$/.test(hex))) throw new Error('Invalid hex color code provided')
    if (hex.length === 3) hex = hex.replace(/[a-zA-Z0-9]/g, (match, offset, string) => string.charAt(offset).repeat(2))
    hex = Number.parseInt(hex, 16)
    return [(hex >> 16) & 0xFF, (hex >> 8) & 0xFF, hex & 0xFF]
  },
  __normalize (n, upper, lower) {
    if (n > upper) return upper
    if (n < lower) return lower
    return n
  },
  __format (n) {
    return Math.round(this.__normalize(n, 255, 0))
  },
  __formatAll (rgb) {
    return rgb.map((channel) => this.__format(channel))
  },
  __checkRgb (rgb) {
    if (rgb.length !== 3) return false
    for (let i = 0; i < rgb.length; i++) {
      if (typeof rgb[i] !== 'number' || rgb[i] > 255 || rgb[i] < 0) return false
    }
    return true
  },
  __checkHsl (hsl) {
    if (hsl.length !== 3) return false
    for (let i = 0; i < hsl.length; i++) {
      if (typeof hsl[i] !== 'number' || hsl[i] > ((i === 0) ? 359 : 100) || hsl[i] < 0) return false
    }
    return true
  },
  __formatFactor (factor) {
    if (typeof factor === 'number') return factor
    if (typeof factor === 'string') return this.__convertString(factor)
    if (Array.isArray(factor)) return (this.__checkRgb(factor)) ? factor : false
    return false
  },
  __applyMethod (method, factor, rgb) {
    factor = this.__formatFactor(factor)
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
  },
  __combine (rgb) {
    return rgb.reduce((p, c) => p + this.__pad(c.toString(16)), '')
  },
  __pad (v, chars, char) {
    chars = chars || 2
    char = char || 0
    return (v.length < chars) ? char.toString().repeat(Number.parseInt(chars) - v.length) + v : v
  },
  __setHsl (which, rgb, value) {
    if (typeof value !== 'number') throw new Error('Invalid HSL value provided')
    const hsl = this.__rgbToHsl(rgb)
    hsl[which] = this.__normalize(value, ((which === 0) ? 359 : 100), 0)
    return this.__hslToRgb(hsl)
  },
  __adjustHsl (which, rgb, factor) {
    if (typeof factor !== 'number') throw new Error('Invalid factor provided')
    const hsl = this.__rgbToHsl(rgb)
    hsl[which] += factor
    hsl[which] = this.__normalize(hsl[which], ((which === 0) ? 359 : 100), 0)
    return this.__hslToRgb(hsl)
  }
}

function Colorizer (color, flag) {
  return Object.create(ColorizerBase).init(color, flag)
}

module.exports = Colorizer
