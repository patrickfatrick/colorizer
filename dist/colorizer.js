(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.colorizer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ColorizerBase = {
  init: function init(color, hsl) {
    if (hsl) {
      if (!this.__checkHsl(color)) throw new Error('Invalid color provided');
      this.__rgb = this.__hslToRgb(color);
      return this;
    }
    if (typeof color === 'string') color = this.__convertString(color);
    if (!this.__checkRgb(color)) throw new Error('Invalid color provided');
    this.__rgb = color;
    return this;
  },
  multiply: function multiply(factor) {
    var rgb = this.__rgb;
    this.__rgb = this.__formatAll(this.__applyMethod('multiply', factor, [rgb[0], rgb[1], rgb[2]]));
    return this;
  },
  divide: function divide(factor) {
    var rgb = this.__rgb;
    this.__rgb = this.__formatAll(this.__applyMethod('divide', factor, [rgb[0], rgb[1], rgb[2]]));
    return this;
  },
  add: function add(factor) {
    var rgb = this.__rgb;
    this.__rgb = this.__formatAll(this.__applyMethod('add', factor, [rgb[0], rgb[1], rgb[2]]));
    return this;
  },
  subtract: function subtract(factor) {
    var rgb = this.__rgb;
    this.__rgb = this.__formatAll(this.__applyMethod('subtract', factor, [rgb[0], rgb[1], rgb[2]]));
    return this;
  },
  step: function step(method, factor, steps) {
    var _this = this;

    var rgb = this.__rgb;
    var array = [rgb];
    for (var i = 1; i < steps + 1; i++) {
      array.push(this.__applyMethod(method, factor, array[i - 1]));
    }
    var converted = array.map(function (rgb) {
      return _this.__combine(_this.__formatAll(rgb));
    });
    return converted;
  },
  blend: function blend(color, steps) {
    var _this2 = this;

    var rgb = this.__rgb;
    if (typeof color === 'string') color = this.__convertString(color);
    var step = [(color[0] - rgb[0]) / steps, (color[1] - rgb[1]) / steps, (color[2] - rgb[2]) / steps];
    var array = [rgb];
    for (var i = 1; i < steps; i++) {
      array.push([array[i - 1][0] + step[0], array[i - 1][1] + step[1], array[i - 1][2] + step[2]]);
    }
    array.push(color);
    var converted = array.map(function (rgb) {
      return _this2.__combine(_this2.__formatAll(rgb));
    });
    return converted;
  },
  luminance: function luminance() {
    var rgb = this.__rgb;
    return 0.2126 * (rgb[0] / 255) + 0.7152 * (rgb[1] / 255) + 0.0722 * (rgb[2] / 255);
  },
  setHue: function setHue(value) {
    this.__rgb = this.__setHsl(0, this.__rgb, value);
    return this;
  },
  adjustHue: function adjustHue(factor) {
    this.__rgb = this.__adjustHsl(0, this.__rgb, factor);
    return this;
  },
  setSaturation: function setSaturation(value) {
    this.__rgb = this.__setHsl(1, this.__rgb, value);
    return this;
  },
  adjustSaturation: function adjustSaturation(factor) {
    this.__rgb = this.__adjustHsl(1, this.__rgb, factor);
    return this;
  },
  setLightness: function setLightness(value) {
    this.__rgb = this.__setHsl(2, this.__rgb, value);
    return this;
  },
  adjustLightness: function adjustLightness(factor) {
    this.__rgb = this.__adjustHsl(2, this.__rgb, factor);
    return this;
  },
  to: function to(format) {
    var rgb = this.__rgb;
    switch (format) {
      case 'rgb':
        return rgb;
      case 'hex':
        return this.__combine(rgb);
      case 'hsl':
        return this.__rgbToHsl(rgb);
      case 'luminance':
        return this.luminance();
      default:
        throw new Error('Invalid format provided.');
    }
  },

  __rgb: [0, 0, 0],
  __rgbToHsl: function __rgbToHsl(rgb) {
    var hue = void 0,
        saturation = void 0,
        lightness = void 0;
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var diff = max - min;
    lightness = (max + min) / 2;
    if (diff === 0) hue = saturation = 0;else {
      saturation = lightness < 0.5 ? diff / (max + min) : diff / (2 - max - min);
      switch (max) {
        case r:
          hue = (g - b) / diff + (g < b ? 6 : 0);
          break;
        case g:
          hue = (b - r) / diff + 2;
          break;
        case b:
          hue = (r - g) / diff + 4;
          break;
      }
    }
    return [Math.round(hue * 60), Math.round(saturation * 100), Math.round(lightness * 100)];
  },
  __hslToRgb: function __hslToRgb(hsl) {
    var h = hsl[0] / 360;
    var s = hsl[1] / 100;
    var l = hsl[2] / 100;
    var r = void 0,
        g = void 0,
        b = void 0;
    if (s === 0) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = this.__hueToRgb(p, q, h + 1 / 3);
      g = this.__hueToRgb(p, q, h);
      b = this.__hueToRgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  },
  __hueToRgb: function __hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  },
  __convertString: function __convertString(hex) {
    hex = hex.replace('#', '');
    if (!/^([0-9a-fA-F]{3})(\1|[0-9a-fA-F]{3})?$/.test(hex)) throw new Error('Invalid hex color code provided');
    if (hex.length === 3) hex = hex.replace(/[a-zA-Z0-9]/g, function (match, offset, string) {
      return string.charAt(offset).repeat(2);
    });
    hex = Number.parseInt(hex, 16);
    return [hex >> 16 & 0xFF, hex >> 8 & 0xFF, hex & 0xFF];
  },
  __normalize: function __normalize(n, upper, lower) {
    if (n > upper) return upper;
    if (n < lower) return lower;
    return n;
  },
  __format: function __format(n) {
    return Math.round(this.__normalize(n, 255, 0));
  },
  __formatAll: function __formatAll(rgb) {
    var _this3 = this;

    return rgb.map(function (channel) {
      return _this3.__format(channel);
    });
  },
  __checkRgb: function __checkRgb(rgb) {
    if (rgb.length !== 3) return false;
    for (var i = 0; i < rgb.length; i++) {
      if (typeof rgb[i] !== 'number' || rgb[i] > 255 || rgb[i] < 0) return false;
    }
    return true;
  },
  __checkHsl: function __checkHsl(hsl) {
    if (hsl.length !== 3) return false;
    for (var i = 0; i < hsl.length; i++) {
      if (typeof hsl[i] !== 'number' || hsl[i] > (i === 0 ? 359 : 100) || hsl[i] < 0) return false;
    }
    return true;
  },
  __formatFactor: function __formatFactor(factor) {
    if (typeof factor === 'number') return factor;
    if (typeof factor === 'string') return this.__convertString(factor);
    if (Array.isArray(factor)) return this.__checkRgb(factor) ? factor : false;
    return false;
  },
  __applyMethod: function __applyMethod(method, factor, rgb) {
    factor = this.__formatFactor(factor);
    if (factor === false) throw new Error('Invalid factor provided');
    var numProvided = typeof factor === 'number';
    switch (method) {
      case 'multiply':
        return rgb.map(function (channel, i) {
          return channel * (numProvided ? factor : factor[i]);
        });
      case 'divide':
        return rgb.map(function (channel, i) {
          return channel / (numProvided ? factor : factor[i]);
        });
      case 'add':
        return rgb.map(function (channel, i) {
          return channel + (numProvided ? factor : factor[i]);
        });
      case 'subtract':
        return rgb.map(function (channel, i) {
          return channel - (numProvided ? factor : factor[i]);
        });
      default:
        throw new Error('Invalid method provided');
    }
  },
  __combine: function __combine(rgb) {
    var _this4 = this;

    return rgb.reduce(function (p, c) {
      return p + _this4.__pad(c.toString(16));
    }, '');
  },
  __pad: function __pad(v, chars, char) {
    chars = chars || 2;
    char = char || 0;
    return v.length < chars ? char.toString().repeat(Number.parseInt(chars) - v.length) + v : v;
  },
  __setHsl: function __setHsl(which, rgb, value) {
    if (typeof value !== 'number') throw new Error('Invalid HSL value provided');
    var hsl = this.__rgbToHsl(rgb);
    hsl[which] = this.__normalize(value, which === 0 ? 359 : 100, 0);
    return this.__hslToRgb(hsl);
  },
  __adjustHsl: function __adjustHsl(which, rgb, factor) {
    if (typeof factor !== 'number') throw new Error('Invalid factor provided');
    var hsl = this.__rgbToHsl(rgb);
    hsl[which] += factor;
    hsl[which] = this.__normalize(hsl[which], which === 0 ? 359 : 100, 0);
    return this.__hslToRgb(hsl);
  }
};

function Colorizer(color, flag) {
  return Object.create(ColorizerBase).init(color, flag);
}

module.exports = Colorizer;

},{}]},{},[1])(1)
});


//# sourceMappingURL=colorizer.js.map
