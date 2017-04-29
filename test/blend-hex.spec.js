import test from 'ava'
import { blendHex } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * FFF => 255, 255, 255
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('can blend two colors (hex)', (t) => {
  t.deepEqual(blendHex(10)(t.context.color)('#ffffff'), ['da70d6', 'de7eda', 'e18dde', 'e59be2', 'e9a9e6', 'ecb8ea', 'f0c6ef', 'f4d4f3', 'f8e2f7', 'fbf1fb', 'ffffff'])
})

test('can blend two colors (rgb)', (t) => {
  t.deepEqual(blendHex(10)(t.context.color)([ 255, 255, 255 ]), ['da70d6', 'de7eda', 'e18dde', 'e59be2', 'e9a9e6', 'ecb8ea', 'f0c6ef', 'f4d4f3', 'f8e2f7', 'fbf1fb', 'ffffff'])
})

test('can blend two colors reversed', (t) => {
  t.deepEqual(blendHex(10)('#fff')('#DA70D6'), ['ffffff', 'fbf1fb', 'f8e2f7', 'f4d4f3', 'f0c6ef', 'edb7eb', 'e9a9e6', 'e59be2', 'e18dde', 'de7eda', 'da70d6'])
})
