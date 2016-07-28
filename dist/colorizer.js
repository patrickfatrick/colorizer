(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.colorizer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var colorizer = {
  red: 0,
  green: 0,
  blue: 0,
  multiply: function multiply(factor, rgb) {
    rgb = rgb || this;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    var red = this.__format(rgb.red * factor);
    var green = this.__format(rgb.green * factor);
    var blue = this.__format(rgb.blue * factor);
    return this.__pad(red.toString(16)) + this.__pad(green.toString(16)) + this.__pad(blue.toString(16));
  },
  divide: function divide(factor, rgb) {
    rgb = rgb || this;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    var red = this.__format(rgb.red / factor);
    var green = this.__format(rgb.green / factor);
    var blue = this.__format(rgb.blue / factor);
    return this.__pad(red.toString(16)) + this.__pad(green.toString(16)) + this.__pad(blue.toString(16));
  },
  add: function add(factor, rgb) {
    rgb = rgb || this;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    var red = this.__format(rgb.red + factor);
    var green = this.__format(rgb.green + factor);
    var blue = this.__format(rgb.blue + factor);
    return this.__pad(red.toString(16)) + this.__pad(green.toString(16)) + this.__pad(blue.toString(16));
  },
  subtract: function subtract(factor, rgb) {
    rgb = rgb || this;
    if (!this.__check(rgb)) throw new Error('Invalid RGB values provided');
    var red = this.__format(rgb.red - factor);
    var green = this.__format(rgb.green - factor);
    var blue = this.__format(rgb.blue - factor);
    return this.__pad(red.toString(16)) + this.__pad(green.toString(16)) + this.__pad(blue.toString(16));
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
  rgb: function rgb(start) {
    if (typeof start === 'string') start = Number.parseInt(start.replace('#', ''), 16);
    this.red = start >> 16 & 0xFF;
    this.green = start >> 8 & 0xFF;
    this.blue = start & 0xFF;
    return this;
  },
  __limit: function __limit(n) {
    if (n > 255) return 255;
    if (n < 0) return 0;
    return n;
  },
  __format: function __format(n) {
    return Math.round(this.__limit(n));
  },
  __check: function __check(rgb) {
    if (typeof rgb.red !== 'number' || rgb.red > 255 || rgb.red < 0) return false;
    if (typeof rgb.green !== 'number' || rgb.green > 255 || rgb.green < 0) return false;
    if (typeof rgb.blue !== 'number' || rgb.blue > 255 || rgb.blue < 0) return false;
    return true;
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
