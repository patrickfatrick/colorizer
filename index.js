'use strict'
const ColorizerBase = {
  init (hex) {
    var rgb
    if (typeof hex === 'string') rgb = this.__convertString(hex)
    this.__rgb = rgb
    return this
  },
  multiply (factor, rgb) {
    rgb = rgb || this.__rgb
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    this.__rgb = this.__formatAll(this.__applyMethod('multiply', factor, [rgb[0], rgb[1], rgb[2]]))
    return this
  },
  divide (factor, rgb) {
    rgb = rgb || this.__rgb
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    this.__rgb = this.__formatAll(this.__applyMethod('divide', factor, [rgb[0], rgb[1], rgb[2]]))
    return this
  },
  add (factor, rgb) {
    rgb = rgb || this.__rgb
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    this.__rgb = this.__formatAll(this.__applyMethod('add', factor, [rgb[0], rgb[1], rgb[2]]))
    return this
  },
  subtract (factor, rgb) {
    rgb = rgb || this.__rgb
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    this.__rgb = this.__formatAll(this.__applyMethod('subtract', factor, [rgb[0], rgb[1], rgb[2]]))
    return this
  },
  step (method, factor, steps, rgb) {
    rgb = rgb || this.__rgb
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    if (typeof this[method] !== 'function') throw new Error('Invalid method provided')
    let array = [rgb]
    for (let i = 1; i < steps + 1; i++) {
      array.push(this.__applyMethod(method, factor, array[i - 1]))
    }
    const converted = array.map((rgb) => this.__combine(this.__formatAll(rgb)))
    return converted
  },
  blend (color, steps, rgb) {
    rgb = rgb || this.__rgb
    if (typeof color === 'string') color = this.__convertString(color)
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    let step = [(color[0] - rgb[0]) / steps, (color[1] - rgb[1]) / steps, (color[2] - rgb[2]) / steps]
    let array = [rgb]
    for (let i = 1; i < steps; i++) {
      array.push([array[i - 1][0] + step[0], array[i - 1][1] + step[1], array[i - 1][2] + step[2]])
    }
    array.push(color)
    const converted = array.map((rgb) => this.__combine(this.__formatAll(rgb)))
    return converted
  },
  luminance (rgb) {
    rgb = rgb || this.__rgb
    return 0.2126 * (rgb[0] / 255) + 0.7152 * (rgb[1] / 255) + 0.0722 * (rgb[2] / 255)
  },
  to (format, rgb) {
    rgb = rgb || this.__rgb
    switch (format) {
      case 'rgb':
        return rgb
      case 'hex':
        return this.__combine(rgb)
      case 'hsl':
        return this.__rgbToHsl(rgb)
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
      hue *= 60
      saturation *= 100
      lightness *= 100
    }
    return [Math.round(hue), Math.round(saturation), Math.round(lightness)]
  },
  __convertString (hex) {
    hex = hex.replace('#', '')
    if (hex.length !== 3 && hex.length !== 6) throw new Error('Invalid hex color code provided')
    if (hex.length === 3) hex = hex.replace(/[a-zA-Z0-9]/g, (match, offset, string) => string.charAt(offset).repeat(2))
    hex = Number.parseInt(hex, 16)
    return [(hex >> 16) & 0xFF, (hex >> 8) & 0xFF, hex & 0xFF]
  },
  __limit (n) {
    if (n > 255) return 255
    if (n < 0) return 0
    return n
  },
  __format (n) {
    return Math.round(this.__limit(n))
  },
  __formatAll (rgb) {
    return rgb.map((channel) => this.__format(channel))
  },
  __check (rgb) {
    if (typeof rgb[0] !== 'number' || rgb[0] > 255 || rgb[0] < 0) return false
    if (typeof rgb[1] !== 'number' || rgb[1] > 255 || rgb[1] < 0) return false
    if (typeof rgb[2] !== 'number' || rgb[2] > 255 || rgb[2] < 0) return false
    return true
  },
  __formatFactor (factor) {
    if (typeof factor === 'number') return factor
    if (typeof factor === 'string') return this.__convertString(factor)
    if (Array.isArray(factor)) return (this.__check(factor)) ? factor : false
    return false
  },
  __applyMethod (method, factor, rgb) {
    factor = this.__formatFactor(factor)
    if (factor === false) throw new Error('Invalid factor provided')
    var numProvided = typeof factor === 'number'
    switch (method) {
      case 'multiply':
        return rgb.map((channel, i) => channel * ((numProvided) ? factor : factor[i]))
      case 'divide':
        return rgb.map((channel, i) => channel / ((numProvided) ? factor : factor[i]))
      case 'add':
        return rgb.map((channel, i) => channel + ((numProvided) ? factor : factor[i]))
      case 'subtract':
        return rgb.map((channel, i) => channel - ((numProvided) ? factor : factor[i]))
    }
  },
  __combine (rgb) {
    return rgb.reduce((p, c) => p + this.__pad(c.toString(16)), '')
  },
  __pad (v, chars, char) {
    chars = chars || 2
    char = char || 0
    return (v.length < chars) ? char.toString().repeat(Number.parseInt(chars) - v.length) + v : v
  }
}

function Colorizer (color) {
  return Object.create(ColorizerBase).init(color)
}

module.exports = Colorizer
