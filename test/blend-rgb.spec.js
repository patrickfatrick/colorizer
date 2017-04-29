import test from 'ava'
import { blendRgb } from '../src'

/**
 * DA70D6 => 218, 112, 214
 * FFF => 255, 255, 255
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('can blend two colors (hex)', (t) => {
  t.deepEqual(blendRgb(10)(t.context.color)('#ffffff'), [
    [ 218, 112, 214 ],
    [ 222, 126, 218 ],
    [ 225, 141, 222 ],
    [ 229, 155, 226 ],
    [ 233, 169, 230 ],
    [ 236, 184, 234 ],
    [ 240, 198, 239 ],
    [ 244, 212, 243 ],
    [ 248, 226, 247 ],
    [ 251, 241, 251 ],
    [ 255, 255, 255 ]
  ])
})

test('can blend two colors (rgb)', (t) => {
  t.deepEqual(blendRgb(5)(t.context.color)([ 255, 255, 255 ]), [
    [ 218, 112, 214 ],
    [ 225, 141, 222 ],
    [ 233, 169, 230 ],
    [ 240, 198, 239 ],
    [ 248, 226, 247 ],
    [ 255, 255, 255 ]
  ])
})

test('can blend two colors reversed', (t) => {
  t.deepEqual(blendRgb(5)('#fff')('#DA70D6'), [
    [ 255, 255, 255 ],
    [ 248, 226, 247 ],
    [ 240, 198, 239 ],
    [ 233, 169, 230 ],
    [ 225, 141, 222 ],
    [ 218, 112, 214 ]
  ])
})
