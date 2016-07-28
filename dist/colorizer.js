(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.colorizer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var colorizer = {
  red: 0,
  green: 0,
  blue: 0,
  multiply: function multiply(factor, rgb) {
    rgb = rgb || this;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    return this.__combine(this.__formatAll(this.__applyMethod('multiply', factor, [rgb.red, rgb.green, rgb.blue])));
  },
  divide: function divide(factor, rgb) {
    rgb = rgb || this;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    return this.__combine(this.__formatAll(this.__applyMethod('divide', factor, [rgb.red, rgb.green, rgb.blue])));
  },
  add: function add(factor, rgb) {
    rgb = rgb || this;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    return this.__combine(this.__formatAll(this.__applyMethod('add', factor, [rgb.red, rgb.green, rgb.blue])));
  },
  subtract: function subtract(factor, rgb) {
    rgb = rgb || this;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    return this.__combine(this.__formatAll(this.__applyMethod('subtract', factor, [rgb.red, rgb.green, rgb.blue])));
  },
  step: function step(method, factor, steps, rgb) {
    rgb = rgb || this;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    if (typeof this[method] !== 'function') throw new Error('Invalid method provided');
    var array = [this[method](factor, rgb)];
    for (var i = 1; i < steps; i++) {
      array.push(this.rgb(array[i - 1])[method](factor));
    }
    return array;
  },
  rgb: function rgb(hex) {
    if (typeof hex === 'string') {
      hex = hex.replace('#', '');
      if (hex.length !== 3 && hex.length !== 6) throw new Error('Invalid hex color code provided');
      if (hex.length === 3) hex = hex.replace(/[a-zA-Z0-9]/g, function (match, offset, string) {
        return string.charAt(offset).repeat(2);
      });
      hex = Number.parseInt(hex, 16);
    }
    var clone = Object.create(this);
    clone.red = hex >> 16 & 0xFF;
    clone.green = hex >> 8 & 0xFF;
    clone.blue = hex & 0xFF;
    return clone;
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
    var _this = this;

    return rgb.map(function (channel) {
      return _this.__format(channel);
    });
  },
  __check: function __check(rgb) {
    if (typeof rgb.red !== 'number' || rgb.red > 255 || rgb.red < 0) return false;
    if (typeof rgb.green !== 'number' || rgb.green > 255 || rgb.green < 0) return false;
    if (typeof rgb.blue !== 'number' || rgb.blue > 255 || rgb.blue < 0) return false;
    return true;
  },
  __applyMethod: function __applyMethod(method, factor, rgb) {
    switch (method) {
      case 'multiply':
        return rgb.map(function (channel) {
          return channel * factor;
        });
      case 'divide':
        return rgb.map(function (channel) {
          return channel / factor;
        });
      case 'add':
        return rgb.map(function (channel) {
          return channel + factor;
        });
      case 'subtract':
        return rgb.map(function (channel) {
          return channel - factor;
        });
    }
  },
  __combine: function __combine(rgb) {
    var _this2 = this;

    return rgb.reduce(function (p, c) {
      return p + _this2.__pad(c.toString(16));
    }, '');
  },
  __pad: function __pad(v, chars, char) {
    chars = chars || 2;
    char = char || 0;
    return v.length < chars ? char.toString().repeat(Number.parseInt(chars) - v.length) + v : v;
  }
};

module.exports = colorizer;

},{}]},{},[1])(1)
});


//# sourceMappingURL=colorizer.js.map
