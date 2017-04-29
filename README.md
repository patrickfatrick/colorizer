# Colorizer

_A tiny library for performing manipulations and conversions to colors._

[![Circle CI](https://circleci.com/gh/patrickfatrick/colorizer.svg?style=shield)](https://circleci.com/gh/patrickfatrick/colorizer)
[![codecov.io](https://codecov.io/github/patrickfatrick/colorizer/coverage.svg?branch=master)](https://codecov.io/github/patrickfatrick/colorizer?branch=master)
[![bitHound Score](https://www.bithound.io/github/patrickfatrick/colorizer/badges/score.svg)](https://www.bithound.io/github/patrickfatrick/colorizer)
[![bitHound Dependencies](https://www.bithound.io/github/patrickfatrick/colorizer/badges/dependencies.svg)](https://www.bithound.io/github/patrickfatrick/colorizer/master/dependencies/npm)
[![MIT License][license-image]][license-url]

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## What is it?

Colorizer is a very small (6kb minified) library for handling color manipulation and conversion. It was inspired by what you can do in Sass so a lot of the same functionality is here. Given a color in hex, RGB, or HSL, you can:

- Add, subtract, divide, and multiply vales
- Add, subtract, divide and multiply other colors
- Performed stepped calculations for any of those operations
- Chain any of the arithmetic operations together
- Blend two colors together and receive a specified number of gradient steps
- Adjust and set HSL or RGB values
- Convert it to RGB, hex, or HSL
- Get the luminance

## Install

```bash
$ yarn add colorizer
$ git clone git@github.com:patrickfatrick/colorizer.git
$ npm install colorizer
$ bower install colorizer
```

From there you can either import individual functions if you're bundling your front-end code the right way, or include the whole package in a `<script>` tag if your'e doing it _that_ way.

## Usage

Each function in colorizer has a similar signature, essentially something like

```javascript
addRgbChannel(/* Arguments */)(/*Input color */)
```

You'll notice the function is curried, which is nice because that allows you create custom functions and apply those any inputs.

```javascript
const reduceChannels = multiplyRgbChannels(0.8)
reduceChannels('#da70d6)
```

But you can also run the function as usual with all arguments supplied, and it will just the same.

The other fun thing is that you don't have to pass a color as your last argument at all, you can actually pass another custom function, and then colorizer will apply both functions in a left-right manner on the input color. Like so:

```javascript
const reduceChannelsAndSaturation = multiplyRgbChannels(0.8)(adjustSaturation(-10))
adjustChannelsAndSaturation('#da70d6)
```

But note that while all functions are curried, not everything is chainable. That only applies to transforms (i.e. functions that output a manipulated color in RGB).

## Transforms

Transforms manipulate the input color and output a new color in RGB format as an array. The input can be RGB or hex, with or without the hash (#), and either three- or six-digit hex codes will work. As for the factor to use, you can use a number, an RGB array, or a hex color as well. Meaning you can add colors to each other, for instance. As explained in Usage above, you can also chain these methods together to apply multiple transforms easily. Neat!

### Arithmetic Transforms

There are four kinds of arithmetic transforms: add, subtract, multiply, and divide. These work identically to how Sass computes color math. They all work very similarly. Because Sass's methods are kind of magical, and it's not exactly clear what is actually happening when you apply arithmetic operators to a color, I've named these functions to be pretty explicit about what you're doing, which is applying that operation to each RGB channel.

```javascript
addRgbChannels(10)([0, 0, 0]) // [ 10, 10, 10 ]
subtractRgbChannels([ 218, 112, 214 ])('#fff') // [ 37, 143, 41 ]
divideRgbChannels('#00B0FF')('da70d6') // [ 255, 1, 1 ]
multiplyRgbChannels(1.1)('#DA70D6') // [ 240, 123, 235 ]
```

### RGB Transforms

These are pretty self-explanatory. Either adjust individual RGB channels or set them to a specific value.

```javascript
adjustRedChannel(10)([ 218, 112, 214 ]) // [ 228, 112, 214 ]
setRedChannel(100)([ 218, 112, 214 ]) // [ 100, 112, 214 ]
adjustGreenChannel(-50)([ 218, 112, 214 ]) // [ 218, 62, 214 ]
setGreenChannel(-1)([ 218, 112, 214 ]) // [ 218, 0, 214 ]
adjustBlueChannel(100)([ 218, 112, 214 ]) // [ 218, 112, 255 ]
setBlueChannel(500)([ 218, 112, 214 ]) // [ 218, 112, 255 ]
```

### HSL Transforms

These functions work identically as the RGB transforms but to the hue (0-359), saturation (0-100), and lightness (0-100) values, and they also return an RGB array, and are also chainable.

```javascript
adjustHue
setHue
adjustSaturation
setSaturation
adjustLightness
setLightness
```

## Stepped transforms

You can perform any of the *arithmetic* transforms in a stepped, non-chainable fashion. The signature is

```javascript
stepHex(nameOfOperation, factorForOperation, numberOfSteps, inputColor)
```

Examples:

```javascript
stepHex('multiply', 1.1, 10)('da70d6') // [ 'da70d6', 'f07beb', 'ff88ff', 'ff95ff', 'ffa4ff', 'ffb4ff', 'ffc6ff', 'ffdaff', 'fff0ff', 'ffffff', 'ffffff' ]
setRgb('divide')(1.1)(5)('da70d6') // you get the idea; outputs an array of RGB arrays
```

Notice that the first color in the output array is the original color.

## Blending colors

You can create a gradient by performing a blend operation, returning a specified number of increments. The signature is

```javascript
blendHex(numberOfStepsForGradient, leftColor, rightColor)
```

Examples:

```javascript
blendHex(10)('da70d6')('fff') // ['da70d6', 'de7eda', 'e18dde', 'e59be2', 'e9a9e6', 'ecb8ea', 'f0c6ef', 'f4d4f3', 'f8e2f7', 'fbf1fb', 'ffffff']
blendRgb(5, 'da70d6')('fff') // you get the idea; outputs an array of RGB arrays
```

The blend occurs in a left-right fashion here, where the first color in the output array is the second argument and the last color is the third argument.

## Converters

These behave as you'd expect, returning an array when converting to RGB or HSL, and a string with no hash when converting to hex. There are also methods for converting to luminance (between 0 and 1).

```javascript
convertRgbToHex
convertHexToRgb
convertRgbToHsl
convertHslToRgb
convertHexToHsl
convertHslToHex
convertRgbToLuminance
convertHexToLuminance
```

## Validators

Colorizer exposes a few methods to help you validate colors against specific formats.

```javascript
isValidHex('da70d6') // true
isValidHex('DA70D6') // true
isValidHex('fff') // true
isValidHex('#da70d6') // false, no hashes allowed for the validator
isValidHex('ff') // false

isValidRgb([ 218, 112, 214 ]) // true
isValidRgb([ -1, 0, 0 ]) // false
isValidRgb([ 0, 0, 260 ]) // false
isValidRgb([ 218, 112 ]) // false

isValidHsl([ 359, 100, 100 ]) // true
isValidHsl([ 360, 0, 0 ]) // false, 359 is the max hue
isValidHsl([ 0, -1, 0 ]) // false

// This function checks the input against all of the above validators until
// one returns true, and otherwise returns false
isValidColor('da70d6') // true
isValidColor([ 359, 255, 255 ]) // false
```

## Running the tests

```bash
$ yarn test
```

## Linting and building the dist files

```bash
$ yarn run build
```

There are other scripts in package.json to build individual files and such.

## License

Colorizer is freely distributable under the terms of the [MIT license](./LICENSE).

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
