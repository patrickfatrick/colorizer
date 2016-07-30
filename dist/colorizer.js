(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.colorizer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var colorizer = {
  multiply: function multiply(factor, rgb) {
    rgb = rgb || this.__rgb;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    var clone = Object.create(this);
    clone.__rgb = this.__formatAll(this.__applyMethod('multiply', factor, [rgb[0], rgb[1], rgb[2]]));
    return clone;
  },
  divide: function divide(factor, rgb) {
    rgb = rgb || this.__rgb;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    var clone = Object.create(this);
    clone.__rgb = this.__formatAll(this.__applyMethod('divide', factor, [rgb[0], rgb[1], rgb[2]]));
    return clone;
  },
  add: function add(factor, rgb) {
    rgb = rgb || this.__rgb;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    var clone = Object.create(this);
    clone.__rgb = this.__formatAll(this.__applyMethod('add', factor, [rgb[0], rgb[1], rgb[2]]));
    return clone;
  },
  subtract: function subtract(factor, rgb) {
    rgb = rgb || this.__rgb;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    var clone = Object.create(this);
    clone.__rgb = this.__formatAll(this.__applyMethod('subtract', factor, [rgb[0], rgb[1], rgb[2]]));
    return clone;
  },
  step: function step(method, factor, steps, rgb) {
    rgb = rgb || this.__rgb;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    if (typeof this[method] !== 'function') throw new Error('Invalid method provided');
    var array = [this.__combine(this.__formatAll(rgb))];
    for (var i = 1; i < steps + 1; i++) {
      array.push(this.rgb(array[i - 1])[method](factor).to('hex'));
    }
    return array;
  },
  blend: function blend(color, steps, rgb) {
    var _this = this;

    rgb = rgb || this.__rgb;
    if (typeof color === 'string') color = this.__convertString(color);
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    var step = [(color[0] - rgb[0]) / steps, (color[1] - rgb[1]) / steps, (color[2] - rgb[2]) / steps];
    var array = [rgb];
    for (var i = 1; i < steps; i++) {
      array.push([array[i - 1][0] + step[0], array[i - 1][1] + step[1], array[i - 1][2] + step[2]]);
    }
    array.push(color);
    var converted = array.map(function (rgb) {
      return _this.__combine(_this.__formatAll(rgb));
    });
    return converted;
  },
  rgb: function rgb(hex) {
    var rgb;
    if (typeof hex === 'string') rgb = this.__convertString(hex);
    var clone = Object.create(this);
    clone.__rgb = rgb;
    return clone;
  },
  luminance: function luminance(rgb) {
    rgb = rgb || this.__rgb;
    return 0.2126 * (rgb[0] / 255) + 0.7152 * (rgb[1] / 255) + 0.0722 * (rgb[2] / 255);
  },
  to: function to(format, rgb) {
    rgb = rgb || this.__rgb;
    switch (format) {
      case 'rgb':
        return rgb;
      case 'hex':
        return this.__combine(rgb);
      case 'hsl':
        return this.__rgbToHsl(rgb);
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
      hue *= 60;
      saturation *= 100;
      lightness *= 100;
    }
    return [Math.round(hue), Math.round(saturation), Math.round(lightness)];
  },
  __convertString: function __convertString(hex) {
    hex = hex.replace('#', '');
    if (hex.length !== 3 && hex.length !== 6) throw new Error('Invalid hex color code provided');
    if (hex.length === 3) hex = hex.replace(/[a-zA-Z0-9]/g, function (match, offset, string) {
      return string.charAt(offset).repeat(2);
    });
    hex = Number.parseInt(hex, 16);
    return [hex >> 16 & 0xFF, hex >> 8 & 0xFF, hex & 0xFF];
  },
  __limit: function __limit(n) {
    if (n > 255) return 255;
    if (n < 0) return 0;
    return n;
  },
  __format: function __format(n) {
    return Math.round(this.__limit(n));
  },
  __formatAll: function __formatAll(rgb) {
    var _this2 = this;

    return rgb.map(function (channel) {
      return _this2.__format(channel);
    });
  },
  __check: function __check(rgb) {
    if (typeof rgb[0] !== 'number' || rgb[0] > 255 || rgb[0] < 0) return false;
    if (typeof rgb[1] !== 'number' || rgb[1] > 255 || rgb[1] < 0) return false;
    if (typeof rgb[2] !== 'number' || rgb[2] > 255 || rgb[2] < 0) return false;
    return true;
  },
  __formatFactor: function __formatFactor(factor) {
    if (typeof factor === 'number') return factor;
    if (typeof factor === 'string') return this.__convertString(factor);
    if (Array.isArray(factor)) return this.__check(factor) ? factor : false;
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
    }
  },
  __combine: function __combine(rgb) {
    var _this3 = this;

    return rgb.reduce(function (p, c) {
      return p + _this3.__pad(c.toString(16));
    }, '');
  },
  __pad: function __pad(v, chars, char) {
    chars = chars || 2;
    char = char || 0;
    return v.length < chars ? char.toString().repeat(Number.parseInt(chars) - v.length) + v : v;
  }
};

function Colorizer(hex) {
  return colorizer.rgb(hex);
}

module.exports = Colorizer;

},{}]},{},[1])(1)
});


//# sourceMappingURL=colorizer.js.map
