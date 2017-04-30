import { multiplyRgbChannels, divideRgbChannels, addRgbChannels, subtractRgbChannels } from './modules/arithmetic-transforms'
import { blendRgb, blendHex } from './modules/blend'
import { stepRgb, stepHex } from './modules/step'
import { isValidRgb, isValidHex, isValidHsl, isValidColor } from './modules/is-valid'
import {
  setHue,
  adjustHue,
  setSaturation,
  adjustSaturation,
  setLightness,
  adjustLightness
} from './modules/hsl-transforms'
import {
  setRedChannel,
  adjustRedChannel,
  setGreenChannel,
  adjustGreenChannel,
  setBlueChannel,
  adjustBlueChannel
} from './modules/rgb-transforms'
import {
  convertRgbToHex,
  convertRgbToHexWithHash,
  convertRgbToCss,
  convertHexToRgb,
  convertHslToRgb,
  convertRgbToHsl,
  convertRgbToLuminance,
  convertHexToLuminance,
  convertHslToHex,
  convertHexToHsl
} from './modules/convert'

export {
  multiplyRgbChannels,
  divideRgbChannels,
  addRgbChannels,
  subtractRgbChannels,
  blendRgb,
  blendHex,
  stepRgb,
  stepHex,
  isValidRgb,
  isValidHex,
  isValidHsl,
  isValidColor,
  convertRgbToHex,
  convertRgbToHexWithHash,
  convertRgbToCss,
  convertHexToRgb,
  convertHslToRgb,
  convertRgbToHsl,
  convertRgbToLuminance,
  convertHexToLuminance,
  convertHslToHex,
  convertHexToHsl,
  setHue,
  adjustHue,
  setSaturation,
  adjustSaturation,
  setLightness,
  adjustLightness,
  setRedChannel,
  adjustRedChannel,
  setGreenChannel,
  adjustGreenChannel,
  setBlueChannel,
  adjustBlueChannel
}
