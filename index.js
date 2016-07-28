'use strict'

const colorizer = {
  red: 0,
  green: 0,
  blue: 0,
  multiply (factor, rgb) {
    rgb = rgb || this
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    const red = this.__format(rgb.red * factor)
    const green = this.__format(rgb.green * factor)
    const blue = this.__format(rgb.blue * factor)
    return this.__pad(red.toString(16)) + this.__pad(green.toString(16)) + this.__pad(blue.toString(16))
  },
  divide (factor, rgb) {
    rgb = rgb || this
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    const red = this.__format(rgb.red / factor)
    const green = this.__format(rgb.green / factor)
    const blue = this.__format(rgb.blue / factor)
    return this.__pad(red.toString(16)) + this.__pad(green.toString(16)) + this.__pad(blue.toString(16))
  },
  add (factor, rgb) {
    rgb = rgb || this
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    const red = this.__format(rgb.red + factor)
    const green = this.__format(rgb.green + factor)
    const blue = this.__format(rgb.blue + factor)
    return this.__pad(red.toString(16)) + this.__pad(green.toString(16)) + this.__pad(blue.toString(16))
  },
  subtract (factor, rgb) {
    rgb = rgb || this
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    const red = this.__format(rgb.red - factor)
    const green = this.__format(rgb.green - factor)
    const blue = this.__format(rgb.blue - factor)
    return this.__pad(red.toString(16)) + this.__pad(green.toString(16)) + this.__pad(blue.toString(16))
  },
  step (method, factor, steps, rgb) {
    rgb = rgb || this
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    if (typeof this[method] !== 'function') throw new Error('Invalid method provided')
    let array = [this[method](factor, rgb)]
    for (let i = 1; i < steps; i++) {
      array.push(this.rgb(array[i - 1])[method](factor))
    }
    return array
  },
  rgb (start) {
    if (typeof start === 'string') start = Number.parseInt(start.replace('#', ''), 16)
    this.red = (start >> 16) & 0xFF
    this.green = (start >> 8) & 0xFF
    this.blue = start & 0xFF
    return this
  },
  __limit (n) {
    if (n > 255) return 255
    if (n < 0) return 0
    return n
  },
  __format (n) {
    return Math.round(this.__limit(n))
  },
  __check (rgb) {
    if (typeof rgb.red !== 'number' || rgb.red > 255 || rgb.red < 0) return false
    if (typeof rgb.green !== 'number' || rgb.green > 255 || rgb.green < 0) return false
    if (typeof rgb.blue !== 'number' || rgb.blue > 255 || rgb.blue < 0) return false
    return true
  },
  __pad (v, chars, char) {
    chars = chars || 2
    char = char || 0
    return (v.length < chars) ? char.toString().repeat(Number.parseInt(chars) - v.length) + v : v
  }
}

module.exports = colorizer
