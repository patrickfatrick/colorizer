# Colorizer

_A tiny library for performing manipulations and conversions to colors._

[![Circle CI](https://circleci.com/gh/patrickfatrick/colorizer.svg?style=shield)](https://circleci.com/gh/patrickfatrick/colorizer)
[![codecov.io](https://codecov.io/github/patrickfatrick/colorizer/coverage.svg?branch=master)](https://codecov.io/github/patrickfatrick/colorizer?branch=master)
[![bitHound Score](https://www.bithound.io/github/patrickfatrick/colorizer/badges/score.svg)](https://www.bithound.io/github/patrickfatrick/colorizer)
[![bitHound Dependencies](https://www.bithound.io/github/patrickfatrick/colorizer/badges/dependencies.svg)](https://www.bithound.io/github/patrickfatrick/colorizer/master/dependencies/npm)
[![MIT License][license-image]][license-url]

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## What is it?

Colorizer is a very small (5kb minified) library for handling color manipulation and conversion. It was inspired by what you can do in Sass so a lot of the same functionality is here. Given a hex or RGB color you can:

- Add, subtract, divide, and multiply vales
- Add, subtract, divide and multiply other colors
- Performed stepped calculations for any of the operations listed above
- Chain any of the math operations together
- Blend two colors together and receive a specified number of gradient steps
- Adjust and set HSL values
- Convert it to RGB, hex, or hsl
- Get the luminance

## Changelog

#### v1.1.0

Testing, readme, API stabilised.

## Install

```bash
$ git clone git@github.com:patrickfatrick/colorizer.git
$ npm install colorizer
$ bower install colorizer
```

As always a `dist` folder is also included if you'd prefer to just include the minified source in your HTML.

## Usage

Once you've `import`ed or `require`d the library you can init a Colorizer object with

```javascript
const color = Colorizer('#DA70D6') // Hex, with hash
const color = Colorizer('DA70D6') // Hex, without hash
const color = Colorizer('da70d6') // It can be upper- or lower-cased to your heart's content
const color = Colorizer('fff') // You can also do this like in CSS
const color = Colorizer([218, 112, 214]) // RGB, in the form of an array
const color = Colorizer([302, 59, 65], true) // Set the hsl flag as your second parameter to use that
```

The first argument should be the color to start with, the second argument is a boolean to indicate your color is going to be HSL.

## Converting or returning a color

At any point you can receive a color by using the `to` method, and the format should be passed as a string

```javascript
color.to('rgb') // [218, 112, 214]
color.to('hex') // 'da70d6'
color.to('hsl') // [302, 59, 65]
color.to('luminance') // 0.556470588235294, no rounding is applied
```

## Manipulations

You can add, subtract, multiply, and divide values. These return the instance rather than the color, so you can chain methods together (see below). You will have to combine this with `to` to receive a color at the end.

```javascript
color.add(50).to('rgb') // [255, 162, 255]
color.subtract(50).to('rgb') // [168, 62, 164]
color.multiply(1.1).to('rgb') // [240, 123, 235]
color.divide(1.1).to('rgb') // [198, 102, 195]
```

You can add, subtract, multiply, and divde other colors

```javascript
color.add('00b0ff').to('rgb') // [218, 255, 255]
color.subtract('00b0ff').to('rgb') // [218, 0, 0]
color.multiply('00b0ff').to('rgb') // [0, 255, 255]
color.divide('00b0ff').to('rgb') // [255, 1, 1]
```

You can chain these methods together

```javascript
color.add(50).multiply(1.1).to('rgb') // [255, 178, 255]
```

## Stepped manipulations

You can perform any of the manipulations in a stepped, non-chainable fashion, like so

```javascript
color.step('multiply', 1.1, 10) // ['da70d6', 'f07beb', 'ff88ff', 'ff95ff', 'ffa4ff', 'ffb4ff', 'ffc6ff', 'ffdaff', 'fff0ff', 'ffffff', 'ffffff']
```

Notice that the first color in the array is the original color.

This method always returns hex, for now.

## Blending colors

You can create a gradient by performing a blend operation, returning a specified number of increments

```javascript
color.blend('fff', 10) // ['da70d6', 'de7eda', 'e18dde', 'e59be2', 'e9a9e6', 'ecb8ea', 'f0c6ef', 'f4d4f3', 'f8e2f7', 'fbf1fb', 'ffffff']
```

First color returned is the original here as well, and the last is the one passed in.

Also returns hex for the time being. Also not chainable.

## Setting and adjusting HSL values

In addition to all of that you can now manipulate the hue, saturation, and lightness of the color directly. The methods follow these patterns

```javascript
color.setHue(100).to('rgb') // [148, 218, 113]
color.adjustHue(-202).to('rgb') // [148, 218, 113]
color.setSaturation(50).to('rgb') // [210, 121, 207]
color.adjustSaturation(-9).to('rgb') // [210, 121, 207]
color.setLightness(50).to('rgb') // [203, 52, 198]
color.adjustLightness(-15).to('rgb') // [203, 52, 198]
```

These methods are chainable either with other HSL manipulation methods or with the add/subtract/multiply/divide methods.

## Running the tests

```bash
$ npm install
$ npm test
```

`$ npm run report` will display the code coverage report.

## What's the plan?

- Init with an HSL color
- Possibly convert to even more formats
- Return any format for the stepped and blended operations

## License

Colorizer is freely distributable under the terms of the [MIT license](./LICENSE).

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
