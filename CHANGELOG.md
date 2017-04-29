# Changelog

#### v2.0

Large rewrite of this library to make it more functional and provide you the ability to use only the pieces you actually need. Please see the readme for the new API. Also new methods such as isValidRgb, isValidHex, isValidHsl which were being used internally before but are now exposed since we're not initing a Colorizer object with validation in place. You can also set and adjust individual rgb channels like you can with the hsl values.

#### v1.2.0

HSL is now a first-class citizen. You can start with a color in HSL colorspace and do all the usual manipulations. Additionally you can adjust any color (no matter what space you start with) via HSL attributes. Set and adjust hue, saturation, and lightness to your heart's content!

#### v1.1.0

Testing, readme, API stabilised.