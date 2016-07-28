'use strict'

const colorizer = {
  red: 0,
  green: 0,
  blue: 0,
  multiply (factor, rgb) {
    rgb = rgb || this
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    return this.__combine(this.__formatAll(this.__applyMethod('multiply', factor, [rgb.red, rgb.green, rgb.blue])))
  },
  divide (factor, rgb) {
    rgb = rgb || this
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    return this.__combine(this.__formatAll(this.__applyMethod('divide', factor, [rgb.red, rgb.green, rgb.blue])))
  },
  add (factor, rgb) {
    rgb = rgb || this
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    return this.__combine(this.__formatAll(this.__applyMethod('add', factor, [rgb.red, rgb.green, rgb.blue])))
  },
  subtract (factor, rgb) {
    rgb = rgb || this
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided')
    return this.__combine(this.__formatAll(this.__applyMethod('subtract', factor, [rgb.red, rgb.green, rgb.blue])))
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
    const clone = Object.create(this)
    clone.red = (start >> 16) & 0xFF
    clone.green = (start >> 8) & 0xFF
    clone.blue = start & 0xFF
    return clone
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
    if (typeof rgb.red !== 'number' || rgb.red > 255 || rgb.red < 0) return false
    if (typeof rgb.green !== 'number' || rgb.green > 255 || rgb.green < 0) return false
    if (typeof rgb.blue !== 'number' || rgb.blue > 255 || rgb.blue < 0) return false
    return true
  },
  __applyMethod (method, factor, rgb) {
    switch (method) {
      case 'multiply':
        return rgb.map((channel) => channel * factor)
      case 'divide':
        return rgb.map((channel) => channel / factor)
      case 'add':
        return rgb.map((channel) => channel + factor)
      case 'subtract':
        return rgb.map((channel) => channel - factor)
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

module.exports = colorizer
