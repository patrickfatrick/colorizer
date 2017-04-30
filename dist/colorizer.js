/**
 * Check that the array provided can be a valid rgb color
 * @param  {Array}   rgb rgb values to test
 * @return {Boolean}     whether or not the array matches rgb constraints
 */
function isValidRgb(rgb) {
  if (rgb.length !== 3) return false;
  for (var i = 0; i < rgb.length; i++) {
    if (typeof rgb[i] !== 'number' || rgb[i] > 255 || rgb[i] < 0) return false;
  }
  return true;
}

/**
 * Check that the array provided can be a valid set of hsl values
 * @param  {Array}   hsl hsl values to test
 * @return {Boolean}     whether or not the array matches hsl constraints
 */
function isValidHsl(hsl) {
  if (hsl.length !== 3) return false;
  for (var i = 0; i < hsl.length; i++) {
    if (typeof hsl[i] !== 'number' || hsl[i] > (i === 0 ? 359 : 100) || hsl[i] < 0) return false;
  }
  return true;
}

/**
 * Check that the string provided can be a valid color
 * @param  {String}  hex string to test
 * @return {Boolean}     whether or not the string matches hex color constraints
 */
function isValidHex(hex) {
  return (/^#?([0-9a-fA-F]{3})(\1|[0-9a-fA-F]{3})?$/.test(hex)
  );
}

/**
 * Generic method for ensuring a number is never higher or lower than specified bounds
 * @param  {Number} n     a number
 * @param  {Number} upper the highest value n can be
 * @param  {Number} lower the lowest value n can be
 * @return {Number}       the normalized number
 */
function normalize(n, upper, lower) {
  if (n > upper) return upper;
  if (n < lower) return lower;
  return n;
}

/**
 * Shorthand to normalize rgb values
 * @param  {Number} n an rgb value
 * @return {Number}   the normalized value (within 0 to 255)
 */
function format(n) {
  return Math.round(normalize(n, 255, 0));
}

/**
 * Shorthand for normalizing all rgb values
 * @param  {Array} rgb rgb values
 * @return {Array}     normalized rgb values
 */
function formatAll(rgb) {
  return rgb.map(function (channel) {
    return format(channel);
  });
}

/**
 * Facilitates passing a number, rgb array, or hex string as input for transforms
 * @param  {Number,Array,String} factor convert a string to rgb or return number or rgb
 * @return {Number,Array}               either the array of rgb values or the number
 */
function formatFactor(factor) {
  if (typeof factor === 'number') return factor;
  if (typeof factor === 'string') return convertHexToRgb(factor);
  if (Array.isArray(factor)) return isValidRgb(factor) ? factor : false;
  return false;
}

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Apply any arithmetic transform to all rgb values
 * @param  {String}              method transform to apply
 * @param  {Number,Array,String} factor value(s) to transform the rgb array with
 * @param  {Array}               rgb    array of rgb values
 * @return {Array}                      new rgb values
 */
function applyMethod(method, factor, rgb) {
  factor = formatFactor(factor);
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
}

/**
 * Add padding to the left side of string
 * @param  {String} v     string to add padding to
 * @param  {Number} chars total number of characters needed
 * @param  {String} char  character with which to pad
 * @return {String}       new string
 */
function pad(v) {
  var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return v.length < chars ? char.toString().repeat(Number.parseInt(chars) - v.length) + v : v;
}

/**
 * Sets an individual HSL value to a specific value
 * @param {Number} which Number between 0 and 2, indicating which RGB channel to manipulate
 * @param {Array}  rgb   RGB array
 * @param {Number} value Value to set
 * @return               A new RGB array
 */
function setHsl(which, rgb, value) {
  if (typeof value !== 'number') throw new Error('Invalid HSL value provided');
  var hsl = convertRgbToHsl(rgb);
  hsl[which] = normalize(value, which === 0 ? 359 : 100, 0);
  return convertHslToRgb(hsl);
}

/**
 * Adjusts an individual HSL value by a specific amount
 * @param {Number} which  Number between 0 and 2, indicating which RGB channel to manipulate
 * @param {Array}  rgb    RGB array
 * @param {Number} factor Value to adjust by
 * @return                A new RGB array
 */
function adjustHsl(which, rgb, factor) {
  if (typeof factor !== 'number') throw new Error('Invalid factor provided');
  var hsl = convertRgbToHsl(rgb);
  hsl[which] += factor;
  hsl[which] = normalize(hsl[which], which === 0 ? 359 : 100, 0);
  return convertHslToRgb(hsl);
}

/**
 * Sets an individual RGB channel to a specific value
 * @param {Number} which Number between 0 and 2, indicating which RGB channel to manipulate
 * @param {Array}  rgb   RGB array
 * @param {Number} value Value to set the channel to
 * @return               A new RGB array
 */
function setRgbChannel(which, rgb, value) {
  if (typeof value !== 'number') throw new Error('Invalid HSL value provided');

  return rgb.map(function (channel, i) {
    if (i === which) return format(value);else return channel;
  });
}

/**
 * Adjusts an individual RGB channel by a specific amount
 * @param {Number} which  Number between 0 and 2, indicating which RGB channel to manipulate
 * @param {Array}  rgb    RGB array
 * @param {Number} factor Value to adjust the channel by
 * @return               A new RGB array
 */
function adjustRgbChannel(which, rgb, factor) {
  if (typeof factor !== 'number') throw new Error('Invalid factor provided');

  return rgb.map(function (channel, i) {
    if (i === which) return format(channel + factor);else return channel;
  });
}

/**
 * Takes a function with args and returns a curried version of it
 * @param   {Function}  fn  A function to curry
 * @returns {Function}      A curried version of the original function
 */
function curry(fn) {
  return function resolver() {
    for (var _len = arguments.length, resolverArgs = Array(_len), _key = 0; _key < _len; _key++) {
      resolverArgs[_key] = arguments[_key];
    }

    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var nextArgs = resolverArgs.concat(args.length ? args : null);
      var next = nextArgs.length >= fn.length ? fn : resolver;
      return next.apply(undefined, toConsumableArray(nextArgs));
    };
  }();
}

/**
 * Returns the result of calling the second function with the result of the first function
 * @param {Function}  fn1  a function
 * @param {Function}  fn2  a function
 */
function wrap(fn1, fn2) {
  return function (arg) {
    return fn2(fn1(arg));
  };
}

/**
 * Converts a hex string to rgb, or else validates an rgb array and returns it
 * @param  {Array,String} input Either a hex string or RGB array
 * @return {Array}              rgb array
 */
function convertInputToRgb(input) {
  var rgb = typeof input === 'string' ? convertHexToRgb(input) : input;
  if (!isValidRgb(rgb)) throw new Error('Invalid color provided');
  return rgb;
}

/**
 * Convert an array of rgb values to a hex string (no hash)
 * @param  {Array}  rgb rgb values
 * @return {String}     hex string
 */
function convertRgbToHex(rgb) {
  return rgb.reduce(function (p, c) {
    return p + pad(c.toString(16));
  }, '');
}

/**
 * Convert a (six- or three-character) hex string with or without hash to rgb
 * @param  {String} string hex string
 * @return {Array}         rgb values
 */
function convertHexToRgb(string) {
  var hex = string.replace(/^#/, '');
  if (!isValidHex(hex)) throw new Error('Invalid hex color code provided');

  if (hex.length === 3) hex = hex.replace(/[a-zA-Z0-9]/g, function (match, offset, string) {
    return string.charAt(offset).repeat(2);
  });
  hex = Number.parseInt(hex, 16);
  return [hex >> 16 & 0xFF, hex >> 8 & 0xFF, hex & 0xFF];
}

// Only used in convertHslToRgb, no export
function convertHueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/**
 * Convert an array of hsl values to rgb values
 * @param  {Array} hsl hsl values
 * @return {Array}     rgb values
 */
function convertHslToRgb(hsl) {
  if (!isValidHsl(hsl)) throw new Error('Invalid HSL color provided');

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
    r = convertHueToRgb(p, q, h + 1 / 3);
    g = convertHueToRgb(p, q, h);
    b = convertHueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Convert array of rgb values to an array of hsl values
 * @param  {Array} rgb rgb values
 * @return {Array}     hsl values
 */
function convertRgbToHsl(rgb) {
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
}

/**
 * Returns th luminance for the rgb color provided
 * @param  {Array}  input  a color in RGB format
 * @return {Number}        the un-rounded luminance value between 0 and 1
 */
function convertRgbToLuminance(rgb) {
  if (!isValidRgb(rgb)) throw new Error('Invalid color provided');
  return 0.2126 * (rgb[0] / 255) + 0.7152 * (rgb[1] / 255) + 0.0722 * (rgb[2] / 255);
}

/**
 * Multiplies RGB values
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Array, String}         input  RGB array or hex string to use
 * @return {Array}                        RGB Array
 */
var multiplyRgbChannels = curry(function (factor, input) {
  if (input instanceof Function) return wrap(multiplyRgbChannels(factor), input);

  var rgb = convertInputToRgb(input);
  return formatAll(applyMethod('multiply', factor, rgb));
});

/**
 * Divides RGB values
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Array, String}         input  RGB array or hex string to use
 * @return {Array}                        RGB Array
 */
var divideRgbChannels = curry(function (factor, input) {
  if (input instanceof Function) return wrap(divideRgbChannels(factor), input);

  var rgb = convertInputToRgb(input);
  return formatAll(applyMethod('divide', factor, rgb));
});

/**
 * Adds RGB values
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Array, String}         input  RGB array or hex string to use
 * @return {Array}                        RGB Array
 */
var addRgbChannels = curry(function (factor, input) {
  if (input instanceof Function) return wrap(addRgbChannels(factor), input);

  var rgb = convertInputToRgb(input);
  return formatAll(applyMethod('add', factor, rgb));
});

/**
 * Subtract RGB values
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Array, String}         input  RGB array or hex string to use
 * @return {Array}                        RGB Array
 */
var subtractRgbChannels = curry(function (factor, input) {
  if (input instanceof Function) return wrap(subtractRgbChannels(factor), input);

  var rgb = convertInputToRgb(input);
  return formatAll(applyMethod('subtract', factor, rgb));
});

/**
 * Performs a gradient operation, returning the specified number of steps in the mixin
 * @param  {Number}        steps  number of steps in between the two colors to return
 * @param  {Array, String} input1 a color
 * @param  {Array, String} input2 another color
 * @return {Array}                the colors between the original color and color passed in
 */
var blendRgb = curry(function (steps, input1, input2) {
  var rgb1 = convertInputToRgb(input1);
  var rgb2 = convertInputToRgb(input2);
  var step = [(rgb2[0] - rgb1[0]) / steps, (rgb2[1] - rgb1[1]) / steps, (rgb2[2] - rgb1[2]) / steps];
  var array = [rgb1];
  for (var i = 1; i < steps; i++) {
    array.push([array[i - 1][0] + step[0], array[i - 1][1] + step[1], array[i - 1][2] + step[2]]);
  }
  array.push(rgb2);
  return array.map(function (rgb) {
    return formatAll(rgb);
  });
});

var blendHex = curry(function (steps, input1, input2) {
  return blendRgb(steps, input1, input2).map(function (rgb) {
    return convertRgbToHex(rgb);
  });
});

/**
 * Performs the same calculation to the color for a number of steps
 * @param  {String}                method the name of an existing method (add, subtract, etc.)
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Number}                steps  number of times to repeat the action
 * @param  {Array,String}          input  RGB or hex color to use
 * @return {Array}                        the stepped calculations in RGB, starting with the original color
 */
var stepRgb = curry(function (method, factor, steps, input) {
  var rgb = convertInputToRgb(input);
  var array = [rgb];
  for (var i = 1; i < steps + 1; i++) {
    array.push(applyMethod(method, factor, array[i - 1]));
  }
  return array.map(function (rgb) {
    return formatAll(rgb);
  });
});

/**
 * Performs the same calculation to the color for a number of steps
 * @param  {String}                method the name of an existing method (add, subtract, etc.)
 * @param  {Number, Array, String} factor a number or another color
 * @param  {Number}                steps  number of times to repeat the action
 * @param  {Array,String}          input  RGB or hex color to use
 * @return {Array}                        the stepped calculations in hex, starting with the original color
 */
var stepHex = curry(function (method, factor, steps, input) {
  return stepRgb(method, factor, steps, input).map(function (rgb) {
    return convertRgbToHex(rgb);
  });
});

/**
 * Checks that the thing passed in is any kind of valid color
 * @param {Object}   input anything
 * @return {Boolean}       whether the input passes any of the validators
 */
function isValidColor(input) {
  return [isValidRgb, isValidHex, isValidHsl].some(function (fn) {
    return fn(input);
  });
}

/**
 * Set the hue on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var setHue = curry(function (value, input) {
  if (input instanceof Function) return wrap(setHue(value), input);

  var rgb = convertInputToRgb(input);
  return setHsl(0, rgb, value);
});

/**
 * Adjust the hue by a specified factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var adjustHue = curry(function (factor, input) {
  if (input instanceof Function) return wrap(adjustHue(factor), input);

  var rgb = convertInputToRgb(input);
  return adjustHsl(0, rgb, factor);
});

/**
 * Set the saturation on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var setSaturation = curry(function (value, input) {
  if (input instanceof Function) return wrap(setSaturation(value), input);

  var rgb = convertInputToRgb(input);
  return setHsl(1, rgb, value);
});

/**
 * Adjust the saturation by a specified factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var adjustSaturation = curry(function (factor, input) {
  if (input instanceof Function) return wrap(adjustSaturation(factor), input);

  var rgb = convertInputToRgb(input);
  return adjustHsl(1, rgb, factor);
});

/**
 * Set the lightness on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var setLightness = curry(function (value, input) {
  if (input instanceof Function) return wrap(setLightness(value), input);

  var rgb = convertInputToRgb(input);
  return setHsl(2, rgb, value);
});

/**
 * Adjust the lightness by a certain factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var adjustLightness = curry(function (factor, input) {
  if (input instanceof Function) return wrap(adjustLightness(factor), input);

  var rgb = convertInputToRgb(input);
  return adjustHsl(2, rgb, factor);
});

/**
 * Set the red channel on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var setRedChannel = curry(function (value, input) {
  if (input instanceof Function) return wrap(setRedChannel(value), input);

  var rgb = convertInputToRgb(input);
  return setRgbChannel(0, rgb, value);
});

/**
 * Adjust the red channel by a specified factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var adjustRedChannel = curry(function (factor, input) {
  if (input instanceof Function) return wrap(adjustRedChannel(factor), input);

  var rgb = convertInputToRgb(input);
  return adjustRgbChannel(0, rgb, factor);
});

/**
 * Set the green channel on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var setGreenChannel = curry(function (value, input) {
  if (input instanceof Function) return wrap(setGreenChannel(value), input);

  var rgb = convertInputToRgb(input);
  return setRgbChannel(1, rgb, value);
});

/**
 * Adjust the green channel by a specified factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var adjustGreenChannel = curry(function (factor, input) {
  if (input instanceof Function) return wrap(adjustGreenChannel(factor), input);

  var rgb = convertInputToRgb(input);
  return adjustRgbChannel(1, rgb, factor);
});

/**
 * Set the blue channel on the color
 * @param  {Number}        value  value to set
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var setBlueChannel = curry(function (value, input) {
  if (input instanceof Function) return wrap(setBlueChannel(value), input);

  var rgb = convertInputToRgb(input);
  return setRgbChannel(2, rgb, value);
});

/**
 * Adjust the blue channel by a certain factor
 * @param  {Number}        factor factor to adjust by
 * @param  {Array, String} input  RGB array or hex string to use
 * @return {Array}                new RGB values
 */
var adjustBlueChannel = curry(function (factor, input) {
  if (input instanceof Function) return wrap(adjustBlueChannel(factor), input);

  var rgb = convertInputToRgb(input);
  return adjustRgbChannel(2, rgb, factor);
});

/**
 * Convert rgb to hex but prepending a hash symbol for easy CSS insertion
 * @param  {Array}  input array of rgb values
 * @return {String}       hex string with hash at the start
 */
function convertRgbToHexWithHash(input) {
  return '#' + convertRgbToHex(input);
}

function convertRgbToCss(input) {
  return 'rgb(' + input[0] + ', ' + input[1] + ', ' + input[2] + ')';
}

/**
 * Returns th luminance for the hex color provided via RGB conversion
 * @param  {String} input  a color in hex format
 * @return {Number}        the un-rounded luminance value between 0 and 1
 */
function convertHexToLuminance(input) {
  return convertRgbToLuminance(convertHexToRgb(input));
}

/**
 * Shorthand method to convert a color from HSL to hex via RGB conversion
 * @param  {Array} input a color in HSL format
 * @return {String}      a color in hex format
 */
function convertHslToHex(input) {
  return convertRgbToHex(convertHslToRgb(input));
}

/**
 * Shorthand method to convert a color from hex to HSL via RGB conversion
 * @param  {Array} input a color in hex format
 * @return {String}      a color in HSL format
 */
function convertHexToHsl(input) {
  return convertRgbToHsl(convertHexToRgb(input));
}

export { multiplyRgbChannels, divideRgbChannels, addRgbChannels, subtractRgbChannels, blendRgb, blendHex, stepRgb, stepHex, isValidRgb, isValidHex, isValidHsl, isValidColor, convertRgbToHex, convertRgbToHexWithHash, convertRgbToCss, convertHexToRgb, convertHslToRgb, convertRgbToHsl, convertRgbToLuminance, convertHexToLuminance, convertHslToHex, convertHexToHsl, setHue, adjustHue, setSaturation, adjustSaturation, setLightness, adjustLightness, setRedChannel, adjustRedChannel, setGreenChannel, adjustGreenChannel, setBlueChannel, adjustBlueChannel };
